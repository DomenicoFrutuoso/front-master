import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString()
  return proxyWhatsappRoute(req, `/admin/whatsapp/messages?${qs}`, {}, 'Erro ao listar mensagens.')
}
