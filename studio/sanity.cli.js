import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Hosted on Sanity (<name>.sanity.studio) via `npm run deploy`.
  studioHost: process.env.SANITY_STUDIO_HOST || 'dr-mushtaqs',
  autoUpdates: true,
})
