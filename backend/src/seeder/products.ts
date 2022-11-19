import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/Permission";
import { Product } from "../entity/product";
import { Role } from "../entity/role";
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";
createConnection().then(async connection => {
        const repository = getManager().getRepository(Product)
        for (let i = 0; i < 30; i++) {
            await repository.save({
                title: faker.lorem.word(),
                description : faker.hacker.phrase(),
                image:  faker.image.fashion(),
                price: `${10 + i++}`,
            })
        }
        process.exit(0)

    })
