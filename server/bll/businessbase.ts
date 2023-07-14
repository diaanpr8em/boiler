import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db/prismaConnection";

export class BusinessBase<T>{
    
    //protected modelName: Prisma.ModelName;
  
    // constructor(modelName: Prisma.ModelName) {
    //   this.modelName = modelName;
    // }

    // async getById(id: number): Promise<T> {
    //     return await prisma["billing"].findUnique({
    //         where: { 
    //             id 
    //         }
    //     });
    //   }
      
}

// class User extends Base<string> {
// }