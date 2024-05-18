import { Entity, Column, ManyToOne, OneToMany, CreateDateColumn, PrimaryColumn, BeforeInsert, JoinColumn } from 'typeorm';
import uuid from 'react-native-uuid'

import { VisitControlMeasure } from './visit-control-measure';
import { VisitContainer } from './visits-container';
import { House } from '@/modules/House/typeorm/entities/house';

@Entity('visitations')
export class Visitation {
  @PrimaryColumn()
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => House, house => house.visits)
  @JoinColumn({name: 'house_id',  referencedColumnName: 'id'})
  house!: House;

  @Column({ name: 'house_id' })
  houseId!: string;

  @Column()
  status!: string;

  @OneToMany(() => VisitControlMeasure, visitControlMeasure => visitControlMeasure.visitation)
  controlMeasures!: VisitControlMeasure[];

  @OneToMany(() => VisitContainer, visitContainer => visitContainer.visitation)
  containers!: VisitContainer[];

  constructor() {
    if(!this.id) {
      this.id = uuid.v4() as string
    }
  }
}