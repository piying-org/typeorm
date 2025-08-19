import "reflect-metadata"

import { Activity } from "./entity/Activity"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../utils/test-utils"
import { DataSource } from "../../../../../src"
import { expect } from "chai"
import { Activity2 } from "./entity/Activity2"

describe.only("entity-schema > columns > object id", () => {
    let connections: DataSource[]
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [<any>Activity, <any>Activity2],
                enabledDrivers: ["mongodb"],
                logging: true,
            })),
    )
    beforeEach(() => reloadTestingDatabases(connections))
    after(() => closeTestingConnections(connections))

    it("should update name", () => {
        return Promise.all(
            connections.map(async (connection) => {
                const repo = connection.getMongoRepository(Activity)
                await repo.save({ k1: 1 })
                const result = (await repo.find({
                    select: { id: true, k1: true },
                }))!
                console.log(result)
                expect(result.length).eq(1)
                expect(result[0].id).ok
            }),
        )
    })
    it("should update name2", () => {
        return Promise.all(
            connections.map(async (connection) => {
                const repo = connection.getMongoRepository(Activity2)
                await repo.save({ k1: 1 })
                const result = (await repo.find({
                    select: { id: true, k1: true },
                }))!
                console.log(result)
                expect(result.length).eq(1)
                expect(result[0].id).ok
            }),
        )
    })
})
