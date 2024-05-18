import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

import { VisitControlMeasure } from './visit-control-measure';
import { VisitContainer } from './visits-container';
import { House } from '@/modules/House/typeorm/entities/house';


@Entity('visitations')
export class Visitation {
  @PrimaryGeneratedColumn()
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => House, house => house.visits)
  house!: House;

  @Column({ name: 'house_id' })
  houseId!: string;

  @Column()
  status!: string;

  @OneToMany(() => VisitControlMeasure, visitControlMeasure => visitControlMeasure.visitation)
  controlMeasures!: VisitControlMeasure[];

  @OneToMany(() => VisitContainer, visitContainer => visitContainer.visitation)
  containers!: VisitContainer[];
}