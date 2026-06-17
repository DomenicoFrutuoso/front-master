import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') ?? ''
    const res = await backendFetch(`/admin/agendamento/proactive/rules?userId=${userId}`, {
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao buscar regras proativas.')
  } catch {
    return backendUnavailableResponse()
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cookies = await getCookieHeader(request)

    if (body._action === 'toggle' && body.ruleId) {
      const res = await backendFetch(`/admin/agendamento/proactive/rules/${body.ruleId}/toggle`, {
        method: 'PATCH',
        forwardCookies: cookies,
      })
      const data = await readBackendJson(res)
      return forwardProxyResponse(data, res.status, 'Erro ao alternar regra proativa.')
    }

    if (body._action === 'delete' && body.ruleId) {
      const res = await backendFetch(`/admin/agendamento/proactive/rules/${body.ruleId}`, {
        method: 'DELETE',
        forwardCookies: cookies,
      })
      const data = await readBackendJson(res)
      return forwardProxyResponse(data, res.status, 'Erro ao remover regra proativa.')
    }

    const res = await backendFetch('/admin/agendamento/proactive/rules', {
      method: 'POST',
      body: JSON.stringify(body),
      forwardCookies: cookies,
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao criar regra proativa.')
  } catch {
    return backendUnavailableResponse()
  }
}
