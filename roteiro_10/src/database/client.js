// @file: src/database/client.js
import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

export default client