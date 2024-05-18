import { Entity, Column, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';
import uuid from 'react-native-uuid';
import { Street } from '../../../Street/typeorm/entities/street';

@Entity('neighbors')
export class Neighbor {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'neighbor_number' })
  neighborNumber!: number;

  @OneToMany(() => Street, (street) => street.neighbor)
  streets!: Street[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid.v4() as string
    }
  }
}