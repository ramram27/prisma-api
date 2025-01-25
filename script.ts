const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/user');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);


app.use((err: { stack: any; }, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = app;

























// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()

// async function main() {
//    try {
     
//     // Delete all users
//      await prisma.user.deleteMany();
    
//      // Create multiple users
//      const createResult = await prisma.user.createMany({
//        data: [
//          {
//            name: 'Rohit',
//            email: 'roh123@gmail.com',
//            age: 26,
//            isAdmin: false,
//            prefrences: { theme: 'light', language: 'en' }, 
//          },
//          {
//            name: 'Rohit2',
//            email: 'roh123345@gmail.com',
//            age: 24,
//            isAdmin: true,
//            prefrences: { theme: 'dark', language: 'fr' },
//          },
//        ],
//      });

//      // Fetch a single user using a unique field
//      const userUnique = await prisma.user.findUnique({
//       where: {
//         email: 'roh123@gmail.com',
//       },
//     });
    
//     console.log(userUnique);
    
//      console.log(`Users created: ${createResult.count}`);


//    } catch (error) {
//      console.error('Error occurred:');
//      console.error(`Type: ${error.name}`);
//      console.error(`Message: ${error.message}`);
//      if (error.stack) {
//        console.error(`Stack trace: ${error.stack}`);
//      }
//    }
//  }



// main()
//      .catch(e =>{
//         console.error(e.message)
//      })
//      .finally(async () => {
//         await prisma.$disconnect()
//      })