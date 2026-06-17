import { NextResponse } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireAdmin } from '@/app/lib/require-admin'

export async function GET(request: Request) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const res = await backendFetch('/admin/room-rentals', {
    forwardCookies: await getCookieHeader(request),
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  const body = await request.text()
  const res = await backendFetch('/admin/room-rentals', {
    method: 'POST',
    body,
    forwardCookies: await getCookieHeader(request),
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
