import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import uuid from 'react-native-uuid'

@Entity('houses')
export class House {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'house_number' })
  houseNumber!: number

  @Column({ name: 'address_complement' })
  addressComplement!: string

  @ManyToOne(() => Street, (street) => street.houses)
  @JoinColumn({ name: 'street_id', referencedColumnName: 'id' })
  street!: Street

  @Column({ name: 'street_id' })
  streetId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Visitation, (visitation) => visitation.house)
  visits!: Visitation[]

  constructor() {
    if (!this.id) {
      this.id = uuid.v4() as string
    }
  }
}

@Entity('neighbors')
export class Neighbor {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'neighbor_number' })
  neighborNumber!: number

  @OneToMany(() => Street, (street) => street.neighbor)
  streets!: Street[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  constructor() {
    if (!this.id) {
      this.id = uuid.v4() as string
    }
  }
}

@Entity('streets')
export class Street {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'street_name' })
  streetName!: string

  @OneToMany(() => House, (house) => house.street)
  houses!: House[]

  @ManyToOne(() => Neighbor, (neighbor) => neighbor.streets)
  @JoinColumn({ name: 'neighbor_id', referencedColumnName: 'id' })
  neighbor!: Neighbor

  @Column({ name: 'neighbor_id' })
  neighborId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  constructor() {
    if (!this.id) {
      this.id = uuid.v4() as string
    }
  }
}

@Entity('visitations')
export class Visitation {
  @PrimaryColumn()
  id!: string

  @CreateDateColumn()
  createdAt!: Date

  @ManyToOne(() => House, (house) => house.visits)
  @JoinColumn({ name: 'house_id', referencedColumnName: 'id' })
  house!: House

  @Column({ name: 'house_id' })
  houseId!: string

  @Column()
  status!: string

  @OneToMany(
    () => VisitControlMeasure,
    (visitControlMeasure) => visitControlMeasure.visitation
  )
  controlMeasures!: VisitControlMeasure[]

  @OneToMany(
    () => VisitContainer,
    (visitContainer) => visitContainer.visitation
  )
  containers!: VisitContainer[]

  constructor() {
    if (!this.id) {
      this.id = uuid.v4() as string
    }
  }
}

@Entity('visit_containers')
export class VisitContainer {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  containerType!: string

  @Column()
  quantity!: number

  @Column()
  withWater?: number

  @Column()
  withLarvae?: number

  @ManyToOne(() => Visitation, (visitation) => visitation.containers)
  @JoinColumn({ name: 'visitation_id', referencedColumnName: 'id' })
  visitation!: Visitation

  @Column({ name: 'visitation_id' })
  visitationId!: string

  constructor() {
    if (!this.id) {
      this.id = uuid.v4() as string
    }
  }
}

@Entity('visit_control_measures')
export class VisitControlMeasure {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  controlMeasure!: string

  @ManyToOne(() => Visitation, (visitation) => visitation.controlMeasures)
  @JoinColumn({ name: 'visitation_id', referencedColumnName: 'id' })
  visitation!: Visitation

  @Column({ name: 'visitation_id' })
  visitationId!: string

  constructor() {
    if (!this.id) {
      this.id = uuid.v4() as string
    }
  }
}
