import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
   try {
     
     await prisma.user.deleteMany();
    
     const createResult = await prisma.user.createMany({
       data: [
         {
           name: 'Rohit',
           email: 'roh123@gmail.com',
           age: 26,
           isAdmin: false,
           prefrences: { theme: 'light', language: 'en' }, 
         },
         {
           name: 'Rohit2',
           email: 'roh123345@gmail.com',
           age: 24,
           isAdmin: true,
           prefrences: { theme: 'dark', language: 'fr' },
         },
       ],
     });

     const userUnique = await prisma.user.findUnique({
      where: {
        email: 'roh123@gmail.com',
      },
    });
    
    console.log(userUnique);
    
     console.log(`Users created: ${createResult.count}`);
 
     const users = await prisma.user.findMany();
     console.log('All users:', users);
   } catch (error) {
     console.error('Error occurred:');
     console.error(`Type: ${error.name}`);
     console.error(`Message: ${error.message}`);
     if (error.stack) {
       console.error(`Stack trace: ${error.stack}`);
     }
   }
 }

main()
     .catch(e =>{
        console.error(e.message)
     })
     .finally(async () => {
        await prisma.$disconnect()
     })