import { TypeormHouseRepository } from '../typeorm/repository/typeorm-house-repository'
import { GetHouseByIdUseCase } from '../use-cases/get-house-by-id'

export function makeGetHouseByIdUseCase() {
  const houseRepository = new TypeormHouseRepository()
  const makeGetHouseByIdUseCase = new GetHouseByIdUseCase(houseRepository)

  return makeGetHouseByIdUseCase
}
