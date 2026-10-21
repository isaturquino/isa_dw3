// @file: src/database/pool.js
import { Pool } from 'pg'

// Configuração do Pool (Exercício 2)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // máximo de conexões simultâneas
  idleTimeoutMillis: 30000 // tempo (ms) que uma conexão pode ficar ociosa
})

export default pool