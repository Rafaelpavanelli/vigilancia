import { Street } from '@/modules/Street/typeorm/entities/street';
import { Visitation } from '@/modules/Visitation/typeorm/entities/visitation';
import { Entity, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import uuid from 'react-native-uuid'

@Entity('houses')
export class House {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'house_number' })
  houseNumber!: number;

  @Column({ name: 'address_complement' })
  addressComplement!: string;

  @ManyToOne(() => Street, street => street.houses)
  @JoinColumn({name: 'street_id', referencedColumnName: 'id'})
  street!: Street;

  @Column({ name: 'street_id' })
  streetId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Visitation, visitation => visitation.house)
  visits!: Visitation[];

  constructor() {
    if(!this.id) {
      this.id = uuid.v4() as string
    }
  }
}