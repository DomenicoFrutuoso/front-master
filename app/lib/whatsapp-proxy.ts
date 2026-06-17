import type { NextRequest } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requirePermission } from '@/app/lib/require-permission'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

type ProxyInit = Omit<RequestInit, 'headers'> & {
  forwardCookies?: string | null
}

export async function proxyWhatsappRoute(
  req: NextRequest,
  endpoint: string,
  init: ProxyInit = {},
  fallbackError = 'Erro na operação WhatsApp.',
) {
  const allowed = await requirePermission(req, ['whatsapp:manage'])
  if (!allowed.ok) return allowed.response

  try {
    const cookies = await getCookieHeader(req)
    const res = await backendFetch(endpoint, { ...init, forwardCookies: cookies })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, fallbackError)
  } catch {
    return backendUnavailableResponse()
  }
}
