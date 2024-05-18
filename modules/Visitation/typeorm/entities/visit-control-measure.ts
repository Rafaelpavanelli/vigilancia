import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Visitation } from './visitation';

@Entity('visit_control_measures')
export class VisitControlMeasure {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  controlMeasure!: string;

  @ManyToOne(() => Visitation, visitation => visitation.controlMeasures)
  @JoinColumn({name: 'visitation_id', referencedColumnName: 'id'})
  visitation!: Visitation;

  @Column({ name: 'visitation_id' })
  visitationId!: string;
}