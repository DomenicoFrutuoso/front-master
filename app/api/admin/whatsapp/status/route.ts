import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function GET(req: NextRequest) {
  return proxyWhatsappRoute(req, '/admin/whatsapp/status', {}, 'Erro ao consultar status do WhatsApp.')
}
