const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@payrollpro.com';
  const password = process.argv[3] || 'admin123';
  const name = process.argv[4] || 'Admin User';

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        role: 'ADMIN',
        isActive: true,
      },
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`ID: ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log('\n⚠️  Please change the default password after first login.');
  } catch (error) {
    if (error.code === 'P2002') {
      console.error('\n❌ Error: User with this email already exists');
    } else {
      console.error('\n❌ Error creating user:', error.message);
    }
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

