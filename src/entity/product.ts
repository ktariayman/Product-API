import { Entity , PrimaryGeneratedColumn , Column} from "typeorm";

@Entity()
export class Product  {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: string;

}