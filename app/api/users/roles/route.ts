import type { NextRequest } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireSuperadmin } from '@/app/lib/require-superadmin'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function GET(req: NextRequest) {
  const gate = await requireSuperadmin(req)
  if (!gate.ok) return gate.response
  try {
    const cookies = await getCookieHeader(req)
    const res = await backendFetch('/users/roles', { forwardCookies: cookies })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao listar roles.')
  } catch {
    return backendUnavailableResponse()
  }
}
