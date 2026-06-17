import { NextResponse } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireAdmin } from '@/app/lib/require-admin'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const { id } = await context.params
  const kind = new URL(request.url).searchParams.get('kind')
  const body = await request.text()

  const res = await backendFetch(`/admin/room-rentals/${encodeURIComponent(id)}?kind=${kind ?? ''}`, {
    method: 'PUT',
    body,
    forwardCookies: await getCookieHeader(request),
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const { id } = await context.params
  const kind = new URL(request.url).searchParams.get('kind')

  const res = await backendFetch(`/admin/room-rentals/${encodeURIComponent(id)}?kind=${kind ?? ''}`, {
    method: 'DELETE',
    forwardCookies: await getCookieHeader(request),
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
