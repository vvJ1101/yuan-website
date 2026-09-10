import type { Metadata } from 'next'
import { EditorialDocumentPage } from '@/components/editorial-document'
import { pietonHugDocument } from '@/data/editorial-documents'

export const metadata: Metadata = {
  title: 'PIETON × HUG | SHAPED BY TIME | YUAN SHOWROOM',
  description: 'PIETON × HUG 以石、砂砾、皮革与重复结构展开的限时空间提案。',
}

export default function PietonHugPopUpPage() {
  return <EditorialDocumentPage document={pietonHugDocument} />
}
