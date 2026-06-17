import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function POST(req: NextRequest) {
  return proxyWhatsappRoute(req, '/admin/whatsapp/disconnect', { method: 'POST' }, 'Erro ao desconectar WhatsApp.')
}
