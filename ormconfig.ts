import {  DataSource } from 'typeorm';
import * as SQLite from 'expo-sqlite/legacy';
import { Neighbor } from './modules/Neighbor/typeorm/entities/neighbor';
import { Street } from './modules/Street/typeorm/entities/street';
import { House } from './modules/House/typeorm/entities/house';
import { Visitation } from './modules/Visitation/typeorm/entities/visitation';
import { VisitControlMeasure } from './modules/Visitation/typeorm/entities/visit-control-measure';
import { VisitContainer } from './modules/Visitation/typeorm/entities/visits-container';


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