import { NextResponse } from 'next/server'
import { extractApiMessage } from '@/app/lib/backend'

export function forwardProxyResponse(
  data: Record<string, unknown>,
  status: number,
  fallbackError = 'Erro na operação.',
) {
  if (status >= 400) {
    const message = extractApiMessage(data, fallbackError)
    return NextResponse.json(
      { ...data, message, mensagem: message, error: message },
      { status },
    )
  }
  return NextResponse.json(data, { status })
}

export async function readBackendJson(res: Response): Promise<Record<string, unknown>> {
  return (await res.json().catch(() => ({}))) as Record<string, unknown>
}

export function backendUnavailableResponse(
  fallback = 'Falha na comunicação com o servidor.',
) {
  return NextResponse.json(
    {
      message: fallback,
      mensagem: fallback,
      error: fallback,
      status: 'erro',
    },
    { status: 502 },
  )
}
