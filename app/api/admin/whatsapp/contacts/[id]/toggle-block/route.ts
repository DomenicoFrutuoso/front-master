import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return proxyWhatsappRoute(
    req,
    `/admin/whatsapp/contacts/${id}/toggle-block`,
    { method: 'PATCH' },
    'Erro ao bloquear/desbloquear contato.',
  )
}
