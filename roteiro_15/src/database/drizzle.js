import { drizzle } from 'drizzle-orm/node-postgres'

import pool from './pool.js'

// O adaptador node-postgres usa o Pool já criado pelo pacote pg.
const db = drizzle({ client: pool })

export default db