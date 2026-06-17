import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireAdmin } from '@/app/lib/require-admin'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const { id } = await context.params
  const kind = new URL(request.url).searchParams.get('kind')
  const body = await request.text()

  try {
    const res = await backendFetch(`/admin/room-rentals/${encodeURIComponent(id)}?kind=${kind ?? ''}`, {
      method: 'PUT',
      body,
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao atualizar aluguel de salas.')
  } catch {
    return backendUnavailableResponse()
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const { id } = await context.params
  const kind = new URL(request.url).searchParams.get('kind')

  try {
    const res = await backendFetch(`/admin/room-rentals/${encodeURIComponent(id)}?kind=${kind ?? ''}`, {
      method: 'DELETE',
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao excluir aluguel de salas.')
  } catch {
    return backendUnavailableResponse()
  }
}
