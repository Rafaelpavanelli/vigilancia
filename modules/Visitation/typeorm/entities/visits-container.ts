import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Visitation } from './visitation';

@Entity('visit_containers')
export class VisitContainer {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  containerType!: string;

  @Column()
  withWater!: number;

  @Column()
  withLarvae!: number;

  @ManyToOne(() => Visitation, visitation => visitation.containers)
  @JoinColumn({name: 'visitation_id', referencedColumnName: 'id'})
  visitation!: Visitation;

  @Column({ name: 'visitation_id' })
  visitationId!: string;
}