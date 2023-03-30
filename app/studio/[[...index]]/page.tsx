'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity.config'

// Re-export `NextStudioHead` as default if you're happy with the default behavior
export { NextStudioHead } from 'next-sanity/studio/head'

export default function StudioPage() {
    //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
    return <NextStudio config={config} />
}
