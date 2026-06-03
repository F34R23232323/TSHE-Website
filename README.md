# TSHE — The SnowHaven Empire Website

Community rules, punishment guide, AI moderation, AutoMod docs, and server information for **The SnowHaven Empire (TSHE)** Discord server.

Live at: **https://tshe.noxxbot.com**

---

## Stack

| Layer    | Tech                                      |
|----------|-------------------------------------------|
| Framework | React 18 + TypeScript                   |
| Build     | Vite 5                                   |
| Routing   | React Router DOM v6                      |
| Icons     | Lucide React                             |
| Fonts     | Cinzel / Cinzel Decorative / Raleway (Google Fonts) |
| Web server | NGINX                                   |
| SSL       | Let's Encrypt (certbot)                  |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (hot reload)
npm run dev
# → http://localhost:5173
```

---

## Production Build & Deploy

### 1. Build

```bash
npm run build
# Output: dist/
```

### 2. Upload to server

```bash
# rsync to your server (adjust user/host/path)
rsync -avz --delete dist/ user@your-server:/var/www/tshe/
```

Or copy manually:

```bash
sudo cp -r dist/* /var/www/tshe/
```

### 3. Create the web root (first time only)

```bash
sudo mkdir -p /var/www/tshe
sudo chown -R www-data:www-data /var/www/tshe
```

---

## NGINX Setup

### 1. Copy the config

```bash
sudo cp tshe.noxxbot.com.nginx.conf /etc/nginx/sites-available/tshe.noxxbot.com
```

### 2. Enable it

```bash
sudo ln -s /etc/nginx/sites-available/tshe.noxxbot.com \
           /etc/nginx/sites-enabled/tshe.noxxbot.com
```

### 3. Get SSL certificate

Make sure your DNS A record for `tshe.noxxbot.com` points to your server's IP **before** running certbot.

```bash
# Install certbot if not already installed
sudo apt install certbot python3-certbot-nginx

# Get certificate (certbot will automatically edit the nginx config)
sudo certbot --nginx -d tshe.noxxbot.com
```

### 4. Test and reload

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Auto-renew SSL

Certbot installs a systemd timer automatically. Verify it:

```bash
sudo systemctl status certbot.timer
# Should show: active (waiting)
```

---

## DNS Configuration

Add an A record in your DNS provider (e.g. Cloudflare):

| Type | Name | Value          | Proxy |
|------|------|----------------|-------|
| A    | tshe | your.server.ip | DNS only (grey cloud) for cert, then enable proxy after |

> **Note:** If using Cloudflare proxy, set SSL/TLS mode to **Full (strict)** in the Cloudflare dashboard.

---

## Pages

| Route      | Description                                          |
|------------|------------------------------------------------------|
| `/`        | Home — hero, quick-access cards                     |
| `/rules`   | Full SnowHaven Codex (Sections A–I, collapsible)    |
| `/punish`  | Punishment tiers + warning escalation ladder        |
| `/automod` | AutoMod limits, AI moderation, content filters      |
| `/faq`     | Filterable FAQ accordion (14+ questions, 7 categories)|
| `/docs`    | Key definitions, report guide, mod notes, basic info |
| `/roles`   | Level roles, staff ranks, ping roles, interactive roles |
| `/services`| Developer network and platform links                |
| `/staff`   | Staff role guides, responsibilities, and authority  |
| `/partnership` | Partnership information and contact details     |
| `/tos`     | Terms of Service                                    |
| `/privacy` | Privacy Policy                                      |

---

## Updating Content

All content lives in **`src/data/content.ts`**. To update:

- **Rules** → Edit the `ruleSections` array
- **Punishment tiers** → Edit `punishmentTiers`
- **Warning steps** → Edit `warnSteps`
- **AutoMod rules** → Edit `automodRules`
- **Definitions** → Edit `definitions`
- **FAQ** → Edit `faqItems`
- **Report guide** → Edit `reportGuide`

After editing, rebuild and redeploy:

```bash
npm run build
rsync -avz --delete dist/ user@your-server:/var/www/tshe/
```

---

## Project Structure

```
tshe/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky nav with mobile drawer
│   │   └── Footer.tsx        # Footer with links
│   ├── data/
│   │   └── content.ts        # ALL editable content (rules, FAQ, etc.)
│   ├── hooks/
│   │   └── useSnow.ts        # Canvas snowfall animation
│   ├── pages/
│   │   ├── Home.tsx          # Landing hero + card grid
│   │   ├── Rules.tsx         # Collapsible rule sections
│   │   ├── Punishments.tsx   # Tier table + warning ladder
│   │   ├── AutoMod.tsx       # AutoMod limits + filters
│   │   ├── FAQ.tsx           # Filterable FAQ accordion
│   │   └── Docs.tsx          # Tabbed docs (definitions/report/modnotes/info)
│   ├── App.tsx               # Router + layout wrapper
│   ├── main.tsx              # React entry point
│   └── index.css             # Global CSS + CSS variables
├── public/
│   └── favicon.svg           # Snowflake favicon
├── index.html                # HTML shell
├── vite.config.ts
├── tsconfig.json
├── package.json
└── tshe.noxxbot.com.nginx.conf   # Production NGINX config
```
