import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function generateUsers() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: 'Alice'
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: 'Bob'
    },
  })
}

async function generatePosts() {
  // Fetch user to associate with the post.
  const user = await prisma.user.findUnique({
    where: {
      email: 'bob@prisma.io'
    }
  });

  // Create post
  await prisma.projects.create({
    data: {
      title: 'Hello world',
      content: 'A very interesitng blog',
      authorId: user.id
    }
  })

}
async function main() {
  await generateUsers();
  await generatePosts();
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })