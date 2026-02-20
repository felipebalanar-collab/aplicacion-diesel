#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function initAdmin() {
  try {
    console.log('🔐 Inicializando usuario admin...');

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Get or create admin role
    let adminRole = await prisma.role.findUnique({ 
      where: { name: 'admin' } 
    });
    
    if (!adminRole) {
      console.log('  📋 Creando rol admin...');
      adminRole = await prisma.role.create({
        data: { 
          name: 'admin', 
          description: 'Administrator role' 
        }
      });
    }

    // Upsert admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: { passwordHash: hashedPassword },
      create: {
        email: 'admin@test.com',
        passwordHash: hashedPassword,
        name: 'Admin User',
        userRoles: {
          create: {
            roleId: adminRole.id
          }
        }
      },
      include: { userRoles: true }
    });

    console.log('✅ Usuario admin inicializado:');
    console.log('   📧 Email: admin@test.com');
    console.log('   🔑 Password: password123');
    console.log('   👤 Nombre: Admin User');
    console.log('   ⚙️  Rol: admin');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initAdmin();
