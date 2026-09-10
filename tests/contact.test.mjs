import test from 'node:test'
import assert from 'node:assert/strict'

import { contactMethods } from '../src/data/contact.ts'
import { POST } from '../src/app/api/inquiries/route.ts'

test('contact types direct inquiries to the approved YUAN inboxes', () => {
  assert.deepEqual(
    contactMethods.map(({ id, email }) => [id, email]),
    [
      ['brand-partnerships', 'heshiya@yuanshowroom.vip'],
      ['buying-samples', 'elson@yuanshowroom.vip'],
      ['press-projects', 'heshiya@yuanshowroom.vip'],
    ],
  )
})

test('reserved inquiry endpoint validates submissions without pretending to persist them', async () => {
  const form = new FormData()
  form.set('methodId', 'buying-samples')
  form.set('name', 'Lin Yuan')
  form.set('company', 'Studio A')
  form.set('email', 'lin@example.com')
  form.set('message', 'Requesting the SS27 line sheet.')

  const response = await POST(new Request('http://localhost/api/inquiries', { method: 'POST', body: form }))

  assert.equal(response.status, 501)
  assert.deepEqual(await response.json(), { ok: false, code: 'INQUIRY_STORAGE_NOT_CONFIGURED' })
})

test('reserved inquiry endpoint rejects incomplete submissions before storage integration', async () => {
  const form = new FormData()
  form.set('methodId', 'brand-partnerships')
  form.set('name', 'Mia')

  const response = await POST(new Request('http://localhost/api/inquiries', { method: 'POST', body: form }))

  assert.equal(response.status, 400)
  assert.deepEqual(await response.json(), { ok: false, code: 'INVALID_INQUIRY' })
})
