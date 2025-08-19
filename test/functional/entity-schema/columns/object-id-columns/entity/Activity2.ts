import { EntitySchema } from "../../../../../../src"

export const Activity2 = new EntitySchema({
    name: "activities2",
    columns: {
        id: {
            primary: true,
            objectId: true,
            // mongodb primary key do not need type?
            type: undefined as any,
            select: true,
        },
        k1: {
            type: "int",
        },
    },
})
