# Vibeelo Landing Page

A beautiful, modern landing page for Vibeelo with parallax effects and a fancy header.

## Features

- 🎨 Modern, responsive design
- ✨ Parallax scrolling effects
- 🎯 Fancy glassmorphism header
- 📱 Mobile-friendly
- ⚡ Smooth animations

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Push your code to a GitHub repository
2. Go to your repository settings
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy when you push to `main` or `master` branch

### Option 2: Manual GitHub Pages Setup

1. Push your code to a GitHub repository
2. Go to your repository settings
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose `main` or `master` branch and `/ (root)` folder
6. Click **Save**

Your site will be available at: `https://[your-username].github.io/[repository-name]`

## Local Development

To run locally:

```bash
python3 -m http.server 3030
```

Then open `http://localhost:3030` in your browser.

## Project Structure

```
vibeeloweb/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript for interactions
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions workflow
```

