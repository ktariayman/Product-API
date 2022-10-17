import { Entity , PrimaryGeneratedColumn , Column, ManyToMany, JoinTable, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Order } from "./order";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;
    @ManyToOne( ()=> Order)
    @JoinColumn({name: 'order_id'})
    order:Order;

}