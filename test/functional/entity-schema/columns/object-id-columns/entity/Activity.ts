import { EntitySchema } from "../../../../../../src"

export const Activity = new EntitySchema({
    name: "activities",
    columns: {
        id: {
            primary: true,
            name: "id",
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
