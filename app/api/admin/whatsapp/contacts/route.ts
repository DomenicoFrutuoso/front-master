import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString()
  return proxyWhatsappRoute(req, `/admin/whatsapp/contacts?${qs}`, {}, 'Erro ao listar contatos.')
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  return proxyWhatsappRoute(
    req,
    '/admin/whatsapp/contacts',
    { method: 'POST', body },
    'Erro ao salvar contato.',
  )
}
