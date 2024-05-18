import { Entity, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { Neighbor } from '../../../Neighbor/typeorm/entities/neighbor';
import { House } from '@/modules/House/typeorm/entities/house';
import uuid from 'react-native-uuid'

@Entity('streets')
export class Street {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'street_name' })
  streetName!: string;

  @OneToMany(() => House, house => house.street)
  houses!: House[];

  @ManyToOne(() => Neighbor, neighbor => neighbor.streets)
  neighbor!: Neighbor;

  @Column({ name: 'neighbor_id' })
  neighborId!: string;

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