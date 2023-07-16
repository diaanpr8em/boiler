import { prisma } from "../prismaConnection";

class Templates {
    async getById(id: number){
        return prisma.templates.findUnique({
            where: { id: id}
        })
    }

    async getByName(name: string){
        return prisma.templates.findFirst({
            where: { name: name}
        })
    }
}

export const TemplatesDAL = new Templates();