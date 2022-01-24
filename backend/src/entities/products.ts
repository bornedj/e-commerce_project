import { Field, Float, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Product extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date; 

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @Column()
    description!: string;

    @Field(() => String)
    @Column({type: 'real'})
    price!: string;

    @Field(() => Int)
    @Column()
    quantity!: number;
}