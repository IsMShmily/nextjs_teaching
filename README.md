<div align="right">
  <a href="README.md">English</a> | <a href="README.cn.md">中文</a>
</div>

## Next.js Tutorial

`Next.js` is a full-stack framework based on `React`, specifically designed for building high-performance, `SEO`-friendly modern `Web` applications.

Core advantages:

- Server-Side Rendering (`SSR`) and Static Site Generation (`SSG`): Improves loading speed and `SEO`.

- Built-in routing system: File-based routing, no manual configuration required.

- `API` routes: Easily create backend interfaces.

- `TypeScript` support, `CSS Modules`, image optimization, and other out-of-the-box features.

<br />

## What Will You Learn?

Through this repository, you will learn:

Based on the latest `Next.js v15` official documentation, we will progressively explain `Next Cli`, `App Router`, route handlers, middleware, data fetching and caching mechanisms, `React Server Component`, server components, client components, `Server Actions`, `Streaming`, and more.

<br />

Practical Project:
`React Notes`

Tech Stack:

<p>

  <img alt="next" src="https://img.shields.io/badge/-Next-%23000?style=flat-square&logo=nextdotjs">
   <img alt="Static Badge" src="https://img.shields.io/badge/-Mysql-%23000000?style=flat-square&logo=mysql">
  <img alt="Static Badge" src="https://img.shields.io/badge/-redis-%2523000?style=flat-square&logo=redis&labelColor=%23000&color=%23000">
<img alt="Static Badge" src="https://img.shields.io/badge/-Auth-%2523000?style=flat-square&logo=auth0&labelColor=%23000&color=%23000">
<img alt="Static Badge" src="https://img.shields.io/badge/-prisma-%2523000?style=flat-square&logo=prisma&labelColor=%23000&color=%23000">
<img alt="Static Badge" src="https://img.shields.io/badge/-i18n-%2523000?style=flat-square&logo=i18next&labelColor=%23000&color=%23000">
<img alt="Static Badge" src="https://img.shields.io/badge/-strapi-%2523000?style=flat-square&logo=strapi&labelColor=%23000&color=%23000">
  <img alt="Static Badge" src="https://img.shields.io/badge/-Docker-%23000?style=flat-square&logo=docker">
<img alt="Static Badge" src="https://img.shields.io/badge/-vercel-%2523000?style=flat-square&logo=vercel&labelColor=%23000&color=%23000">

</p>

## 1. Running the Project

```bash
# Install dependencies
npm i

# Run the project
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the results.

## 2. Learning Directory

### 1. `Next.js` Basics

- **[test_01/page_layout_template_loading](https://github.com/IsMShmily/nextjs_teaching/tree/test_01/page_layout_template_loading)**
  - Introduction to file system, page, layout, template, and loading components
- **[test_01/layout_template_status_demo](https://github.com/IsMShmily/nextjs_teaching/tree/test_01/layout_template_status_demo)**
  - Demo of differences between layout and template components

---

### 2. Introduction to `<Link>` and `useRouter`

- **[test_02/link_useRouter](https://github.com/IsMShmily/nextjs_teaching/tree/test_02/link_useRouter?tab=readme-ov-file)**
  - Usage of link, useRouter, and redirect

---

### 3. Introduction to `Next Routes`

- **[test_03/routes_detail](https://github.com/IsMShmily/nextjs_teaching/tree/test_03/routes_detail?tab=readme-ov-file)**
  - Dynamic routes, route groups, parallel routes, and intercepting routes
- **[test_03/InterceptingRoutes_demo](https://github.com/IsMShmily/nextjs_teaching/tree/test_03/InterceptingRoutes_demo?tab=readme-ov-file)**
  - Intercepting routes demo

---

### 4. Using `Route Handlers`

- **[test_04/route_handlers](https://github.com/IsMShmily/nextjs_teaching/tree/test_04/route_handlers?tab=readme-ov-file)**
  - Conventions
  - Request Method usage
  - Getting request parameters
  - Common issues

---

### 5. Introduction and Usage of `Middleware`

- **[test_05/Middleware](https://github.com/IsMShmily/nextjs_teaching/tree/test_05/Middleware?tab=readme-ov-file)**
  - Middleware usage
  - Middleware Cookies usage
  - Middleware Headers usage
  - Middleware CORS usage
  - How Middleware responds

---

### 6. Introduction and Usage of `CSR, SSR, SSG, ISR` in `Nextjs`

- **[test_06/CSR_SSR_SSG_ISR](https://github.com/IsMShmily/nextjs_teaching/tree/test_06/CSR_SSR_SSG_ISR?tab=readme-ov-file)**
  - CSR usage
  - SSR usage
  - SSG usage
  - ISR usage

---

### 7. `Server Component` and SSR in `Nextjs`

- **[test_07/serverComponent_SSR](https://github.com/IsMShmily/nextjs_teaching/tree/test_07/serverComponent_SSR?tab=readme-ov-file)**
  - React Server Components (RSC)
  - use client directive
  - React server component rendering lifecycle

---

### 8. `Streaming` Transmission

- **[test_08/suspense_streaming](https://github.com/IsMShmily/nextjs_teaching/tree/test_08/suspense_streaming?tab=readme-ov-file)**
  - Traditional SSR
  - How to implement Streaming transmission
    - Using Suspense tags
    - Using loading page components

---

### 9. Server Components and Client Components in `Nextjs`

- **[test_09/clientCompoent](https://github.com/IsMShmily/nextjs_teaching/tree/test_09/clientComponent)**
  - Client Components
    - Using Client Components
    - How Client Components are rendered
  - How to use Client Components
    - Basic usage
    - Best practices
  - Server Components vs Client Components

---

### 10. Server Rendering Strategies in `Nextjs`

- **[text_10/server_renderer_tactics](https://github.com/IsMShmily/nextjs_teaching/tree/text_10/server_renderer_tactics)**
  - Static rendering
  - Dynamic rendering
  - Partial rendering

---

### 11. Using `Nextjs` Server Actions

- **[test_11/server_actions](https://github.com/IsMShmily/nextjs_teaching/tree/test_11/server_actions)**
  - Basic usage
  - Implementing TODOList using Server Actions

---

### 12. Caching in `Nextjs`

- **[test_12/caching](https://github.com/IsMShmily/nextjs_teaching/tree/test_12/caching)**
  - Overview
  - Request memoization
  - Data caching

---

### 13. Environment Variables and Path Aliases in `Nextjs`

- **[test_13/env_src_alias](https://github.com/IsMShmily/nextjs_teaching/tree/test_13/env_src_alias)**
  - Using environment variables
    - In server components
    - In route handlers
    - In the browser
  - Using path aliases

---

### 14. Practical: `React Notes` Project Initialization

- **[notes_01](https://github.com/IsMShmily/nextjs_teaching/tree/notes_01)**
  - React Notes project structure setup
  - Basic Redis usage

---

### 15. Practical: `SidebarNoteList` Optimization and `Suspense` Usage

- **[notes_02](https://github.com/IsMShmily/nextjs_teaching/tree/notes_02)**
  - SidebarNoteList sidebar optimization
  - Implementing skeleton loading effect using Suspense

---

### 16. Practical: `React Notes` Preview Interface Implementation

- **[notes_03](https://github.com/IsMShmily/nextjs_teaching/tree/notes_03)**
  - Preview interface implementation
  - Principle analysis
  - Page caching

---

### 17. Practical: `React Notes CRUD` Implementation

- **[notes_04](https://github.com/IsMShmily/nextjs_teaching/tree/notes_04)**
  - Note preview
  - Note creation, update, and deletion

---

### 18. Practical: `React Notes` Search Function Implementation

- **[notes_05](https://github.com/IsMShmily/nextjs_teaching/tree/notes_05)**
  - Note search functionality

---
