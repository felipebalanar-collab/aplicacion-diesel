import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROLES = [
  {
    name: 'admin',
    description: 'Administrador del sistema - acceso total',
  },
  {
    name: 'supervisor',
    description: 'Supervisor - puede gestionar usuarios y datos',
  },
  {
    name: 'editor',
    description: 'Editor - puede modificar datos de calibración',
  },
  {
    name: 'viewer',
    description: 'Visualizador - solo lectura',
  },
];

const PERMISSIONS = [
  // User Management
  { name: 'create_user', category: 'user_management', description: 'Crear nuevos usuarios' },
  { name: 'edit_user', category: 'user_management', description: 'Modificar usuarios' },
  { name: 'delete_user', category: 'user_management', description: 'Eliminar usuarios' },
  { name: 'assign_role', category: 'user_management', description: 'Asignar roles a usuarios' },
  { name: 'view_users', category: 'user_management', description: 'Ver lista de usuarios' },

  // Data Management (Injectors)
  { name: 'create_injector', category: 'data_management', description: 'Crear inyectores' },
  { name: 'edit_injector', category: 'data_management', description: 'Modificar inyectores' },
  { name: 'delete_injector', category: 'data_management', description: 'Eliminar inyectores' },
  { name: 'view_injector', category: 'data_management', description: 'Ver inyectores' },

  // Calibration Management
  { name: 'edit_calibration', category: 'calibration_management', description: 'Modificar tablas de calibración' },
  { name: 'upload_calibration', category: 'calibration_management', description: 'Subir nuevas calibraciones' },
  { name: 'delete_calibration', category: 'calibration_management', description: 'Eliminar calibraciones' },
  { name: 'view_calibration', category: 'calibration_management', description: 'Ver calibraciones' },

  // Reports
  { name: 'view_reports', category: 'reports', description: 'Ver reportes' },
  { name: 'export_data', category: 'reports', description: 'Exportar datos' },

  // System
  { name: 'view_logs', category: 'system', description: 'Ver logs del sistema' },
  { name: 'manage_system', category: 'system', description: 'Gestionar configuración del sistema' },
];

const ROLE_PERMISSIONS = {
  admin: [
    'create_user', 'edit_user', 'delete_user', 'assign_role', 'view_users',
    'create_injector', 'edit_injector', 'delete_injector', 'view_injector',
    'edit_calibration', 'upload_calibration', 'delete_calibration', 'view_calibration',
    'view_reports', 'export_data',
    'view_logs', 'manage_system',
  ],
  supervisor: [
    'create_user', 'edit_user', 'view_users',
    'create_injector', 'edit_injector', 'view_injector',
    'edit_calibration', 'upload_calibration', 'view_calibration',
    'view_reports', 'export_data',
  ],
  editor: [
    'view_injector',
    'edit_calibration', 'upload_calibration', 'view_calibration',
    'view_reports',
  ],
  viewer: [
    'view_injector',
    'view_calibration',
    'view_reports',
  ],
};

async function main() {
  console.log('Inicializando roles y permisos...\n');

  // Create permissions
  console.log('📋 Creando permisos...');
  const createdPermissions = {};
  for (const perm of PERMISSIONS) {
    const permission = await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: perm,
    });
    createdPermissions[perm.name] = permission.id;
    console.log(`  ✓ Permiso: ${perm.name}`);
  }

  // Create roles and assign permissions
  console.log('\n👤 Creando roles y asignando permisos...');
  for (const role of ROLES) {
    const createdRole = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });

    console.log(`\n  👤 Rol: ${role.name}`);

    // Delete existing permissions for this role
    await prisma.rolePermission.deleteMany({
      where: { roleId: createdRole.id },
    });

    // Assign permissions
    const permissions = ROLE_PERMISSIONS[role.name] || [];
    for (const permName of permissions) {
      await prisma.rolePermission.create({
        data: {
          roleId: createdRole.id,
          permissionId: createdPermissions[permName],
        },
      });
      console.log(`    ✓ ${permName}`);
    }
  }

  // Assign admin role to existing users
  console.log('\n🔗 Asignando roles existentes a usuarios...');
  const adminRole = await prisma.role.findUnique({
    where: { name: 'admin' },
  });

  const users = await prisma.user.findMany();
  for (const user of users) {
    const existingRole = await prisma.userRole.findFirst({
      where: { userId: user.id },
    });

    if (!existingRole && adminRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: adminRole.id,
        },
      });
      console.log(`  ✓ Usuario ${user.email} asignado al rol admin`);
    }
  }

  console.log('\n✅ Inicialización completada exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la inicialización:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
