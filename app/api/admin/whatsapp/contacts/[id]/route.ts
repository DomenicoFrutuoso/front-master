import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return proxyWhatsappRoute(
    req,
    `/admin/whatsapp/contacts/${id}`,
    { method: 'DELETE' },
    'Erro ao remover contato.',
  )
}
