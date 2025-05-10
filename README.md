# 📦 CSV to JSON Converter API

A Node.js + Express API that reads a CSV file from a configurable path, parses it manually, stores data in PostgreSQL, and prints age group distribution.

---

## ⚙️ Setup

**Install dependencies**
   ```bash
   npm install

## API: Upload CSV

Uploads the CSV file from the configured file path and stores parsed records in PostgreSQL.

### Endpoint

POST /upload

### Example cURL

```bash
curl -X POST http://localhost:3000/upload