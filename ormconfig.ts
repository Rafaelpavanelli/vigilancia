import { DataSource } from 'typeorm'
import * as SQLite from 'expo-sqlite/legacy'
import {
  Neighbor,
  Street,
  House,
  Visitation,
  VisitControlMeasure,
  VisitContainer,
} from './typeorm/entities'

export const AppDataSource = new DataSource({
  database: 'dev',
  driver: SQLite,
  entities: [
    Neighbor,
    Street,
    House,
    Visitation,
    VisitControlMeasure,
    VisitContainer,
  ],
  synchronize: true,
  logging: true,
  type: 'expo',
})
