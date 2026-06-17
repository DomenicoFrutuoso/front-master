import { NextRequest, NextResponse } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireAdmin } from '@/app/lib/require-admin'
import { requireSuperadmin } from '@/app/lib/require-superadmin'

function normalizeUserPatchBody(raw: string): string {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    if (parsed.isActive === undefined && parsed.is_active !== undefined) {
      parsed.isActive = parsed.is_active
    }
    delete parsed.is_active
    return JSON.stringify(parsed)
  } catch {
    return raw
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const gate = await requireAdmin(req)
  if (!gate.ok) return gate.response
  const { id } = await params
  const cookies = await getCookieHeader(req)
  const res = await backendFetch(`/users/${id}`, { forwardCookies: cookies })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const gate = await requireSuperadmin(req)
  if (!gate.ok) return gate.response
  const { id } = await params
  const cookies = await getCookieHeader(req)
  const body = normalizeUserPatchBody(await req.text())
  const res = await backendFetch(`/users/${id}`, {
    method: 'PATCH',
    body,
    forwardCookies: cookies,
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const gate = await requireSuperadmin(req)
  if (!gate.ok) return gate.response
  const { id } = await params
  const cookies = await getCookieHeader(req)
  const res = await backendFetch(`/users/${id}`, {
    method: 'DELETE',
    forwardCookies: cookies,
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
