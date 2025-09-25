// import knex from 'knex'
// import config from './knexfile.js'

// type Environment = 'development' | 'production' | 'test'
// const env = (process.env.NODE_ENV as Environment) || 'development'

// const connection = knex(config[env])

// export default connection
import knex from 'knex'
import config from './knexfile.js'

// Add this block BEFORE calling knex():
import { types } from 'pg'
// 20 is the OID for BIGINT (int8) in Postgres
types.setTypeParser(20, (val) => parseInt(val, 10))

type Environment = 'development' | 'production' | 'test'
const env = (process.env.NODE_ENV as Environment) || 'development'

const connection = knex(config[env])

export default connection
