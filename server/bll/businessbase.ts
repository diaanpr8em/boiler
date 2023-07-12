import { Prisma, PrismaClient } from "@prisma/client";

export class BusinessBase<T>{
    
    /*protected prisma: PrismaClient;
    //protected modelName: Prisma.ModelName;
  
    constructor(modelName: Prisma.ModelName) {
      this.prisma = new PrismaClient();
      //this.modelName = modelName;
    }

    async getById(id: number): Promise<T> {
        return await this.prisma["billing"].findUnique({
            where: { 
                id 
            }
        });
      }
      */
}

// class User extends Base<string> {
// }