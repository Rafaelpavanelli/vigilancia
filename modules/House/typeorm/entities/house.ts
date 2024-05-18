import { Street } from '@/modules/Street/typeorm/entities/street';
import { Visitation } from '@/modules/Visitation/typeorm/entities/visitation';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('houses')
export class House {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'house_number' })
  houseNumber!: number;

  @Column({ name: 'address_complement' })
  addressComplement!: string;

  @ManyToOne(() => Street, street => street.houses)
  street!: Street;

  @Column({ name: 'street_id' })
  streetId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Visitation, visitation => visitation.house)
  visits!: Visitation[];
}