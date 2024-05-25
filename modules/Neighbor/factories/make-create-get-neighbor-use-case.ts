import { TypeormNeighborRepository } from '../typeorm/repositories/typeorm-neighbor-repository'
import { GetNeighborsUseCase } from '../use-cases/get-neighbors-use-case'

export function makeGetNeighborsUseCase() {
  const neighborRepository = new TypeormNeighborRepository()
  const getNeighborsUseCase = new GetNeighborsUseCase(neighborRepository)

  return getNeighborsUseCase
}
