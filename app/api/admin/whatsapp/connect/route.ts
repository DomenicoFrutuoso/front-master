import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function POST(req: NextRequest) {
  return proxyWhatsappRoute(req, '/admin/whatsapp/connect', { method: 'POST' }, 'Erro ao conectar WhatsApp.')
}
