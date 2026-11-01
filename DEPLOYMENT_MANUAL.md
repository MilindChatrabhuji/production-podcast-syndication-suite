# DEPLOYMENT & OPERATION MANUAL: WAY #70 PODCAST SUITE

## 1. Local Testing & Verification
```bash
# Test Pack 1
cd engine/podcast_production_engine
npx ts-node src/demo_runner.ts

# Test Pack 2
cd ../edge_podcast_gateway
npx ts-node src/demo_runner.ts

# Test Pack 3
cd ../../monetization_podcast_kit
npx ts-node src/demo_runner.ts
```

## 2. Deploying Edge Podcast Gateway to Cloudflare Workers
```bash
cd engine/edge_podcast_gateway
npx wrangler deploy
```

## 3. Interactive Showcase Simulator
Simply open `showcase/index.html` in any modern web browser. Zero server setup required.
