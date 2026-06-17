import { NextResponse } from 'next/server'
import { backendFetch, getCookieHeader } from '@/app/lib/backend-server'
import {
  backendUnavailableResponse,
  forwardProxyResponse,
  readBackendJson,
} from '@/app/lib/proxy-backend'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const res = await backendFetch('/admin/agendamento/criar', {
      method: 'POST',
      body,
      forwardCookies: await getCookieHeader(request),
    })
    const data = await readBackendJson(res)
    return forwardProxyResponse(data, res.status, 'Falha ao criar agendamento.')
  } catch {
    return backendUnavailableResponse()
  }
}
