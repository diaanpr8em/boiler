import { VDataTable } from "vuetify/lib/labs/components.mjs";

// datatable header type
type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>> ? UnwrapReadonlyArrayType<I> : A
type DT = InstanceType<typeof VDataTable>;
export type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT['headers']>;

// datatable sort by fix!
export const sortByFix = (sortBy: {
        key: string;
        order: string;
    }[] | undefined) => {
    if (sortBy) {
        return sortBy.map(({ key, order }) => {
            const obj = {} as { [key: string]: string };
            obj[key] = order;
            return obj;
        });
    }
}