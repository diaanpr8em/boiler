export class BusinessBase<T extends Partial<T> & { id: number }> {
    protected model: any;

    constructor(model: any) {
        this.model = model;
    }
    
    async delete(id: number) {
        return this.model.delete({ where: { id } }) as T;
    }

    async getById(id: number) {
        return this.model.findUnique({ where: { id } }) as T;
    }

    async insert(data: T) {
        return this.model.create({ data }) as T;
    }

    async update(data: T) {
        return this.model.update({ where: { id: data.id }, data }) as T;
    }
}