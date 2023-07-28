import {
  TenantInsertRequest,
  TenantSearchRequest,
  TenantUpdateRequest
} from "~/server/models/validation/tenants";
import { prisma } from "../prismaConnection";
import { Prisma, PrismaClient } from "@prisma/client";
import { UsersTenants } from './../../../.nuxt/components.d';

class Tenants {
  async deleteById(id: number) {
    return prisma.tenants.delete({
      where: { id: id }
    });
  }

  async insert(data: TenantInsertRequest) {
    return prisma.tenants.create({
      data
    });
  }

  async getAll() {
    return prisma.tenants.findMany();
  }

  async getById(id: number) {
    return await prisma.tenants.findFirst({
      where: {
        id
      }
    });
  }

  async getByDomain(domain: string) {
    return await prisma.tenants.findFirst({
      where: {
        domain
      }
    });
  }

  async getByUserId(userId: number) {
    return await prisma.tenants.findFirst({
      include: {
        UserTenantLinks: {
          where: {
            userId: userId
          }
        }
      }
    });
  }

  async search(data: TenantSearchRequest) {
    const { searchTerm, page, rows: take, sortBy } = data;

    const skip = (page - 1) * take;

    const orderBy = sortBy ? sortByFix(sortBy) : {};

    const where = searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm } },
            { domain: { contains: searchTerm } }
          ]
        }
      : {};

    const total = await prisma.tenants.count({ where });
    const records = await prisma.tenants.findMany({
      where,
      skip,
      take,
      orderBy
    });

    return {
      total,
      records
    };
  }

  async update(data: TenantUpdateRequest) {
    const { id } = data;
    return prisma.tenants.update({
      where: { id },
      data
    });
  }
}

export const TenantsDAL = new Tenants();