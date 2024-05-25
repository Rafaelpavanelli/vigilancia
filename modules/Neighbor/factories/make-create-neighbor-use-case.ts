import { TypeormNeighborRepository } from '../typeorm/repositories/typeorm-neighbor-repository'
import { CreateNeighborUseCase } from '../use-cases/create-neighbor-use-case'

export function makeCreateNeighborUseCase() {
  const neighborRepository = new TypeormNeighborRepository()
  const createNeighborUseCase = new CreateNeighborUseCase(neighborRepository)

  return createNeighborUseCase
}
