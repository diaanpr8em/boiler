import { BusinessBase } from "~/server/bll/businessbase";
import { prisma } from "../../prismaConnection";
import { Prisma } from "@prisma/client";

class Subscriptions {
    async insert(model: Prisma.SubscriptionsUncheckedCreateInput){
        return prisma.subscriptions.create({ data: model });
    }

    async update(model: Prisma.SubscriptionsUncheckedUpdateInput){
        return prisma.subscriptions.update({
            where: { id: model.id as unknown as number },
            data: model,
        });
    };

    async getById(id: number){
        return prisma.subscriptions.findUnique({
            where: { id: id}
        });
    };

    async deleteById(id: number){
        return prisma.subscriptions.delete({
            where: { id: id}
        });
    };

    async search(data: Prisma.SubscriptionsFindManyArgs){
        return prisma.subscriptions.findMany(data);
    }
    
    // async count(data: Prisma.SubscriptionsFindManyArgs){
    //     return prisma.subscriptions.count(data);
    // }

}

export const SubscriptionsDAL = new Subscriptions();