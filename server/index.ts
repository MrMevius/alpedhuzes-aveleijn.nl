import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { healthRouter } from './routes/health.js'
import { progressRouter } from './routes/progress.js'

const app = express()
const port = Number(process.env.PORT ?? 8099)

app.use(express.json())

app.use('/api/health', healthRouter)
app.use('/api/progress', progressRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDistPath = path.resolve(__dirname, '../dist')

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath))

  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
})
