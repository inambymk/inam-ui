# 🚀 Deployment Guide

This guide provides instructions for deploying the Inam UI CLI to npm and the documentation website to Vercel/Netlify.

---

## 📦 1. CLI Package (npm)

The CLI package is located in `packages/inam-ui-cli`.

### Prerequisites

- Create an account on [npm](https://www.npmjs.com/).
- Run `npm login` in your terminal.

### Steps to Publish

1.  **Update Version**: Increase the version in `packages/inam-ui-cli/package.json`.
    ```json
    "version": "1.0.1"
    ```
2.  **Build the Project**: Run the build command from the root.
    ```bash
    npm run build
    ```
3.  **Publish**: Navigate to the package directory and publish.
    ```bash
    cd packages/inam-ui-cli
    npm publish --access public
    ```

---

## 🌐 2. Documentation Website (Next.js)

The documentation app is located in `apps/docs`. We recommend using **Vercel** for the smoothest experience with Next.js.

### Prerequisites

- A GitHub repository with your code.
- A [Vercel](https://vercel.com/) account.

### Steps to Deploy (Vercel)

1.  **Import Project**: Connect your GitHub repository to Vercel.
2.  **Root Directory**: Set the root directory to `apps/docs`.
3.  **Build Command**: `npm run build:docs`
4.  **Install Command**: `npm install`
5.  **Environment Variables**:

    **Option A: Use Vercel's Auto-Generated URL (Recommended for Start)**
    - ✅ **No environment variables needed!**
    - Vercel automatically provides the deployment URL
    - Example: `https://inam-ui-abc123.vercel.app`
    - Perfect for testing before buying a domain

    **Option B: Use Custom Domain (When You're Ready)**
    - Add this variable in the Vercel dashboard:
      - `NEXT_PUBLIC_SITE_URL`: Your custom domain (e.g., `https://inam-ui.dev`)
    - This overrides the auto-generated URL

    **Always Set:**
    - `NEXT_PUBLIC_GIT_LINK`: `https://github.com/manimkk/inam-ui`

### Manual Build Check

You can test the production build locally:

```bash
npm run build:docs
npm run start -w apps/docs
```

---

## ✅ Post-Deployment Checklist

- [ ] Verify `npx inam-ui` installs the latest version.
- [ ] Check that the documentation site loads correctly.
- [ ] Ensure all component previews in the docs are functional.
- [ ] Verify SEO tags and social share images are working.
