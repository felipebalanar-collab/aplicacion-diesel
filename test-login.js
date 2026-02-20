const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function test() {
    console.log('=== Testing login manually ===')
    
    const email = 'admin@test.com'
    const password = 'password123'
    
    console.log(`\n1. Looking for user: ${email}`)
    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
        console.log('❌ User not found')
        process.exit(1)
    }
    
    console.log('✅ User found')
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   PasswordHash: ${user.passwordHash.substring(0, 40)}...`)
    
    console.log(`\n2. Testing password: "${password}"`)
    const match = await bcrypt.compare(password, user.passwordHash)
    console.log(`   Result: ${match ? '✅ MATCH' : '❌ NO MATCH'}`)
    
    if (!match) {
        console.log(`\n❌ Password does not match!`)
        console.log(`   This means the hashed password in the database`)
        console.log(`   does not correspond to "password123"`)
    }
}

test()
    .catch(e => { console.error('Error:', e.message); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); })
