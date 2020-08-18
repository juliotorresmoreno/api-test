

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const { DATABASE_DSN, SEED_SALT, SECRET } = process.env;

if (!DATABASE_DSN) {
  console.log('DATABASE_DSN es requrido.');
  process.exit(1);
}

module.exports = {
  databaseDSN: DATABASE_DSN,
  seedSalt: parseInt(SEED_SALT || '12'),
  secret: SECRET
}