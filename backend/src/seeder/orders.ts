import { createConnection, getManager } from "typeorm";
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
createConnection().then(async connection => {
        const orderRepository = getManager().getRepository(Order)
        const orderItemRepository = getManager().getRepository(OrderItem)
        for (let i = 0; i < 30; i++) {
          const order =   await orderRepository.save({
            first_name: faker.internet.userName(),
            last_name: faker.internet.userName(),
            email: faker.internet.email(),
            created_at:faker.date.between('2022-01-01T00:00:00.000Z', '2022-11-31') // '2026-05-16T02:22:53.002Z'
        })

            for (let j = 0; j < randomInt(1,5); j++) {
                await orderItemRepository.save({
                    order,
                    product_title: faker.commerce.productName(),
                    price: randomInt(10,100),
                    quantity: randomInt(1,5),


                })
        }}
        process.exit(0)

    })
