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
