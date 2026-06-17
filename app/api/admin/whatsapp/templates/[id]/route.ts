import type { NextRequest } from 'next/server'
import { proxyWhatsappRoute } from '@/app/lib/whatsapp-proxy'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.text()
  return proxyWhatsappRoute(
    req,
    `/admin/whatsapp/templates/${id}`,
    { method: 'PUT', body },
    'Erro ao atualizar template.',
  )
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return proxyWhatsappRoute(
    req,
    `/admin/whatsapp/templates/${id}`,
    { method: 'DELETE' },
    'Erro ao remover template.',
  )
}
