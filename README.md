# yaba-ui

UI for the [yaba](https://github.com/wenbenz/yaba) personal finance server.

## Prerequisites

- Node.js
- yaba backend running on `http://localhost:9222`

## Setup

```bash
npm install
npm start   # dev server on http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Budget vs spending charts, category breakdown, date range selector |
| `/budget` | Create and edit budgets with income sources and expense categories |
| `/expenditure` | Browse, filter, upload, and export transactions |
| `/browse` | Search reward cards and add them as payment methods |
| `/payment-methods` | Manage payment methods and their linked reward cards |
| `/profile` | Update account email and password |

## Commands

```bash
npm start          # Dev server (port 3000, proxies /graphql and /api to localhost:9222)
npm run build      # Production build
npm run package    # Build + create dist.tar.gz
npm run lint       # ESLint
npm run lint:fix   # ESLint auto-fix
npm run prettier   # Format with Prettier
```
