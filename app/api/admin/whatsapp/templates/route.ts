import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function GET(req: NextRequest) {
  return proxyWhatsappRoute(req, '/admin/whatsapp/templates', {}, 'Erro ao listar templates.')
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  return proxyWhatsappRoute(
    req,
    '/admin/whatsapp/templates',
    { method: 'POST', body },
    'Erro ao criar template.',
  )
}
