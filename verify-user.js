const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    console.log('=== Checking database for admin user ===')
    
    const user = await prisma.user.findUnique({
        where: { email: 'admin@test.com' },
        include: { userRoles: { include: { role: true } } }
    })
    
    if (!user) {
        console.log('❌ Admin user NOT found in database')
        console.log('Creating admin user now...')
        const hash = await bcrypt.hash('password123', 10)
        
        // Get or create admin role
        let adminRole = await prisma.role.findUnique({ where: { name: 'admin' } })
        if (!adminRole) {
            adminRole = await prisma.role.create({ data: { name: 'admin', description: 'Administrator' } })
        }
        
        const created = await prisma.user.create({
            data: {
                email: 'admin@test.com',
                passwordHash: hash,
                name: 'Admin User',
                userRoles: {
                    create: {
                        roleId: adminRole.id
                    }
                }
            },
            include: { userRoles: { include: { role: true } } }
        })
        console.log('✅ Admin user created:', created.email)
        console.log('  Roles:', created.userRoles.map(ur => ur.role.name).join(', '))
    } else {
        console.log('✅ Admin user found:', user.email)
        console.log('  Password hash:', user.passwordHash.substring(0, 30) + '...')
        console.log('  Roles:', user.userRoles.map(ur => ur.role.name).join(', '))
        
        // Test password
        const match = await bcrypt.compare('password123', user.passwordHash)
        console.log('  Password "password123" valid?', match ? '✅ YES' : '❌ NO')
    }
    
    console.log('\n=== All users in database ===')
    const allUsers = await prisma.user.findMany({
        include: { userRoles: { include: { role: true } } }
    })
    allUsers.forEach(u => {
        const roles = u.userRoles.map(ur => ur.role.name).join(', ') || 'no roles'
        console.log(`  ${u.email} (${roles})`)
    })
}

main()
    .catch(e => { console.error('Error:', e.message); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); })
