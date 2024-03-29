import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { myTheme } from './theme';
import Navbar from './components/studio/Navbar';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
    basePath: '/studio',
    name: 'Portsmouth_Point',
    title: 'Portsmouth Point',
    projectId,
    dataset,
    plugins: [deskTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
    studio: {
        components: {
            navbar: Navbar,
        },
    },
    theme: myTheme
})
