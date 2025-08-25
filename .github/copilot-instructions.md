# GitHub Copilot Instructions for SAPro

## About the Project

This is a multilingual website built with Nuxt 3, featuring Decap CMS integration and GitHub OAuth authentication. The project uses i18n to support three languages: German (default), English, and Russian.

## Technology Stack

- **Framework**: Nuxt 3 with TypeScript
- **Styling**: Tailwind CSS + Stylus
- **Content**: @nuxt/content (Markdown files)
- **Internationalization**: @nuxtjs/i18n (de/en/ru)
- **CMS**: Decap CMS with GitHub OAuth
- **Deployment**: Vercel (preset configured)
- **State Management**: Pinia (optional)
- **Icons**: @nuxt/icon
- **Theme**: @nuxtjs/color-mode (light/dark)

## Project Structure

```
app/                    # Main Nuxt 3 application
├── app.vue            # Main application component
├── components/        # Application components
├── composables/       # Vue composables
├── layouts/           # Page layouts
└── pages/             # Pages ([...slug].vue, index.vue)

content/               # Markdown content with i18n
├── de/               # German content (default)
├── en/               # English content
└── ru/               # Russian content

components/           # Shared components
public/
├── admin/           # Decap CMS admin interface
└── uploads/         # Uploaded files

server/
└── api/oauth/       # GitHub OAuth endpoints
```

## Code Conventions

### EditorConfig
- Always respect the repository's `.editorconfig` settings (indent style/size, charset, EOL, final newline, trimming trailing whitespace).
- When creating or editing files, ensure formatting matches `.editorconfig`; do not override it with per-file settings.
- Avoid reformatting unrelated lines; preserve existing style unless required by `.editorconfig`.

### TypeScript

- Use strict typing
- Prefer `interface` over `type` for objects
- Use composables from `#imports` for Nuxt functions

### Vue Composition

- Use `<script setup lang="ts">`
- Composables should start with `use` (e.g., `useSiteTexts`, `useMenu`)
- Use `computed()` for reactive computations
- Use `ref()` and `reactive()` for reactive data

### Styling

- Use Tailwind CSS classes for styling
- For custom styles use Stylus in `app/assets/styles/`
- Support dark theme through `dark:` prefixes
- Use `transition-colors` for smooth theme transitions

### Typography

- Use en dash (–, U+2013) for ranges and parenthetical dashes; avoid em dash (—, U+2014).
- In all content and UI texts, replace em dashes with en dashes unless a specific style requires otherwise.
- Examples:
  - "Munich – Augsburg" for ranges
  - "fast – reliable – fair"
  - Avoid "—"; prefer "–"

### Internationalization

- Content is stored in `content/{locale}/` folders
- Use `useLocalePath()` for localized links
- Interface texts are loaded via `useSiteTexts()` composable
- Menu is formed through `useMenu()` composable
- Supported locales: `de` (default), `en`, `ru`

### Routing

- Use `[...slug].vue` for dynamic pages
- Localization via prefix strategy (except default locale)
- `NuxtLink` components for navigation

### Content Management

- Markdown files in `content/` folders by language
- Decap CMS config in `public/admin/config.yml`
- GitHub OAuth for CMS authentication

## Code Examples

### Composable with i18n

```typescript
export const useSiteTexts = () => {
  const { locale } = useI18n()
  return queryContent(`/${locale.value}/_texts`).findOne()
}
```

### Component with dark theme

```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    <!-- content -->
  </div>
</template>
```

### Localized navigation

```vue
<template>
  <NuxtLink :to="localePath('/about')">
    {{ $t('navigation.about') }}
  </NuxtLink>
</template>
```

## Development Commands

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run generate` - static generation
- `npm run lint` - code linting

## Environment Variables

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
OAUTH_REDIRECT_URL=your_redirect_url
```

## Deployment

The project is configured for Vercel deployment with automatic GitHub OAuth for Decap CMS.

---

**Important**: When creating new code, consider the project's multilingual nature and dark theme support. Use existing composables and follow established patterns.
