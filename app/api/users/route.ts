import { NextRequest } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireAdmin } from '@/app/lib/require-admin'
import { requireSuperadmin } from '@/app/lib/require-superadmin'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function GET(req: NextRequest) {
  const gate = await requireAdmin(req)
  if (!gate.ok) return gate.response
  try {
    const cookies = await getCookieHeader(req)
    const res = await backendFetch('/users', { forwardCookies: cookies })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao listar usuários.')
  } catch {
    return backendUnavailableResponse()
  }
}

export async function POST(req: NextRequest) {
  const gate = await requireSuperadmin(req)
  if (!gate.ok) return gate.response
  const cookies = await getCookieHeader(req)
  const body = await req.text()
  try {
    const res = await backendFetch('/users', {
      method: 'POST',
      body,
      forwardCookies: cookies,
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Falha ao criar usuário.')
  } catch {
    return backendUnavailableResponse()
  }
}
