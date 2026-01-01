# Quick Deployment Reference

## 🚀 Deploy to Vercel (3 Steps)

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### 2. Import to Vercel

- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your `inam-ui` repository
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `apps/docs`
- **Build Command**: Leave default (`npm run build`)

### 3. Set Environment Variable

Add in Vercel dashboard under "Environment Variables":

```
NEXT_PUBLIC_GIT_LINK=https://github.com/manimkk/inam-ui
```

That's it! Click "Deploy" 🎉

## 🌐 Your URLs

After deployment, Vercel gives you:

- **Production**: `https://inam-ui.vercel.app` (or similar)
- **Preview**: `https://inam-ui-git-branch.vercel.app` (for each PR)

All SEO, Open Graph images, and metadata will automatically use these URLs!

## 📝 When You Want a Custom Domain

1. Buy domain (e.g., from Namecheap, GoDaddy)
2. Add domain in Vercel dashboard
3. Add ONE environment variable:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
4. Redeploy

## ✅ What's Automatically Configured

- ✅ SEO metadata
- ✅ Open Graph images
- ✅ Twitter cards
- ✅ Sitemap URLs
- ✅ Canonical URLs
- ✅ JSON-LD structured data

All use the correct Vercel URL automatically!
