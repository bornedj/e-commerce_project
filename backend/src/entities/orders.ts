import { Field, Float, ObjectType, InputType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Number)
    @Column({ default: 0})
    quantity!: number;

    @Field(() => Float)
    @Column({default: 0, type: "real"})
    price!: number;

    @Field(() => String)
    @Column()
    status: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user: User;
}