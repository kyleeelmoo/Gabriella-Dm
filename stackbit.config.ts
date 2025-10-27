import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { SanityContentSource } from '@stackbit/cms-sanity';
import path from 'path';
import { ContentstackContentSource } from '@stackbit/cms-contentstack';

import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "astro",
    "contentSources": [
        new ContentstackContentSource({
            apiKey: process.env.CONTENTSTACK_API_KEY!,
            managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN!,
            authtoken: process.env.CONTENTSTACK_AUTHTOKEN,
            branch: process.env.CONTENTSTACK_BRANCH!,
            publishEnvironmentName: process.env.CONTENTSTACK_PUBLISH_ENV || 'production',
            skipFetchOnStartIfCache: true
        }),
    
        new SanityContentSource({
            projectId: process.env.SANITY_PROJECT_ID!,
            token: process.env.SANITY_ACCESS_TOKEN!,
            dataset: process.env.SANITY_DATASET || 'production',
            rootPath: __dirname,
            studioPath: path.resolve(__dirname, 'studio'),
            studioUrl: process.env.SANITY_STUDIO_URL || ''
        }),

        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
        }),
    ],
    "postInstallCommand": "npm i --no-save @stackbit/types @stackbit/cms-contentstack @stackbit/cms-sanity @stackbit/cms-contentful"
})