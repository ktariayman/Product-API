import { Entity , PrimaryGeneratedColumn , Column, ManyToMany, JoinTable} from "typeorm";
import { Permission } from "./Permission";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;;

    @ManyToMany ( () => Permission)
    @JoinTable({
        name: "role_permission",
        joinColumn: {name : "role_id" , referencedColumnName: "id"},
        inverseJoinColumn: {name : "permission_id" , referencedColumnName: "id"},
    })
    permissions : Permission[]
}