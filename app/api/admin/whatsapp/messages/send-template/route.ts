import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function POST(req: NextRequest) {
  const body = await req.text()
  return proxyWhatsappRoute(
    req,
    '/admin/whatsapp/messages/send-template',
    { method: 'POST', body },
    'Erro ao enviar template.',
  )
}
