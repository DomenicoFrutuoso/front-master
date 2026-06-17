import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ?? '100'
    const res = await backendFetch(`/admin/chatbot-cadastros?limit=${encodeURIComponent(limit)}`, {
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao listar cadastros.')
  } catch {
    return backendUnavailableResponse()
  }
}
