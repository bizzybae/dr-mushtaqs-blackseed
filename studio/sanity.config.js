import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes, SINGLETONS } from './schemas/index.js'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const siteUrl = process.env.SANITY_STUDIO_SITE_URL || 'https://dr-mushtaqs-blackseed.vercel.app'

const singletonIds = new Set(SINGLETONS.map((s) => s.id))

export default defineConfig({
  name: 'dr-mushtaqs',
  title: 'Dr. Mushtaq’s',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...SINGLETONS.filter((s) => s.id !== 'siteSettings').map((s) => S.listItem().title(s.title).id(s.id).child(S.document().schemaType(s.type).documentId(s.id))),
            S.divider(),
            S.documentTypeListItem('productContent').title('Product copy'),
            S.documentTypeListItem('botanical').title('Botanicals'),
            S.documentTypeListItem('journalPost').title('Journal'),
            S.documentTypeListItem('faqGroup').title('FAQ groups'),
            S.documentTypeListItem('policy').title('Policies'),
          ]),
    }),
    presentationTool({
      previewUrl: { origin: siteUrl, previewMode: false },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu.
    templates: (templates) => templates.filter((t) => !singletonIds.has(t.schemaType) && !SINGLETONS.some((s) => s.type === t.schemaType)),
  },
  document: {
    actions: (input, context) => (SINGLETONS.some((s) => s.type === context.schemaType) ? input.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)) : input),
  },
})
