import { NextRequest } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import { requireAdmin } from '@/app/lib/require-admin'
import { requireSuperadmin } from '@/app/lib/require-superadmin'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

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
  try {
    const cookies = await getCookieHeader(req)
    const res = await backendFetch(`/users/${id}`, { forwardCookies: cookies })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao buscar usuário.')
  } catch {
    return backendUnavailableResponse()
  }
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
  try {
    const res = await backendFetch(`/users/${id}`, {
      method: 'PATCH',
      body,
      forwardCookies: cookies,
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao atualizar usuário.')
  } catch {
    return backendUnavailableResponse()
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const gate = await requireSuperadmin(req)
  if (!gate.ok) return gate.response
  const { id } = await params
  try {
    const cookies = await getCookieHeader(req)
    const res = await backendFetch(`/users/${id}`, {
      method: 'DELETE',
      forwardCookies: cookies,
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Erro ao excluir usuário.')
  } catch {
    return backendUnavailableResponse()
  }
}
