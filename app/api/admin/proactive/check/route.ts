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
    const res = await backendFetch(`/admin/agendamento/proactive/check?userId=${userId}`, {
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao verificar mensagens proativas.')
  } catch {
    return backendUnavailableResponse()
  }
}
