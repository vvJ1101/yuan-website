const methodIds = new Set(['brand-partnerships', 'buying-samples', 'press-projects'])

function hasText(form: FormData, key: string): boolean {
  const value = form.get(key)
  return typeof value === 'string' && value.trim().length > 0
}

export async function POST(request: Request): Promise<Response> {
  const form = await request.formData()
  const methodId = form.get('methodId')
  const email = form.get('email')

  const valid = typeof methodId === 'string'
    && methodIds.has(methodId)
    && hasText(form, 'name')
    && hasText(form, 'company')
    && typeof email === 'string'
    && email.includes('@')
    && hasText(form, 'message')

  if (!valid) {
    return Response.json({ ok: false, code: 'INVALID_INQUIRY' }, { status: 400 })
  }

  return Response.json({ ok: false, code: 'INQUIRY_STORAGE_NOT_CONFIGURED' }, { status: 501 })
}
