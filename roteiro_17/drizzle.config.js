
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não foi encontrada no .env.')
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.js',
  out: './drizzle',
  breakpoints: false,
  schemaFilter: ['public'],
  tablesFilter: [
    'projetos',
    'tarefas',
    'detalhes_projeto',
    'tags',
    'tarefas_tags',
  ],
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
