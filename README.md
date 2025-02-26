# Cyberscale home challenge, events app frontend

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Environment Variables

Make sure to set the following environment variables:

```bash
cp .env.example .env
```

```yml
NUXT_PUBLIC_API_URL=http://localhost:8000 # Your Laravel API URL
NODE_TLS_REJECT_UNAUTHORIZED=0  # For local development only, if you are using a self-signed certificate, like in Laravel Herd

NUXT_PUBLIC_REVERB_APP_KEY= #put your Laravel Reverb app key here
NUXT_PUBLIC_REVERB_HOST="localhost"
NUXT_PUBLIC_REVERB_PORT=8080
NUXT_PUBLIC_REVERB_SCHEME=http
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```
