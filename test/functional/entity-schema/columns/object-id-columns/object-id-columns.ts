import "reflect-metadata"

import { Activity } from "./entity/Activity"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../utils/test-utils"
import { DataSource } from "../../../../../src"
import { expect } from "chai"

describe.only("entity-schema > columns > object id", () => {
    let connections: DataSource[]
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [<any>Activity],
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
                const result = (await repo.find())!
                console.log(result)
                expect(result.length).eq(1)
                expect(result[0].id).ok
            }),
        )
    })
})
