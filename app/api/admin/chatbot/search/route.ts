import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

/** Proxy para POST /admin/agendamento/chatbot/search (backend-edge-main). */
export async function POST(request: Request) {
  try {
    const body = await request.text()
    const res = await backendFetch('/admin/agendamento/chatbot/search', {
      method: 'POST',
      body,
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro na busca do chatbot.')
  } catch {
    return backendUnavailableResponse()
  }
}
