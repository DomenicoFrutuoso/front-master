import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  try {
    const body = await request.text()
    const res = await backendFetch(`/admin/agendamento/${id}/atualizar`, {
      method: 'PUT',
      body,
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao atualizar agendamento.')
  } catch {
    return backendUnavailableResponse()
  }
}
