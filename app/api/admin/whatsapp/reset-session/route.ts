import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function POST(req: NextRequest) {
  return proxyWhatsappRoute(req, '/admin/whatsapp/reset-session', { method: 'POST' }, 'Erro ao resetar sessão WhatsApp.')
}
