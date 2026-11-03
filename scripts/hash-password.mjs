// Usage: npm run hash-password -- "YourStrongPassword"
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password || password.length < 12) {
  console.error('Provide a password of at least 12 characters: npm run hash-password -- "YourStrongPassword"')
  process.exit(1)
}

const hash = bcrypt.hashSync(password, 12)
const b64 = 'base64:' + Buffer.from(hash).toString('base64')
console.log('\nUse ONE of these as ADMIN_PASSWORD_HASH:\n')
console.log('Recommended (safe in .env files and Vercel):')
console.log('  ' + b64)
console.log('\nRaw bcrypt hash (Vercel dashboard only; "$" breaks in .env files):')
console.log('  ' + hash + '\n')
