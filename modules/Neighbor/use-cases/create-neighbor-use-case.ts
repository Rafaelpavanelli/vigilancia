import { CreateNeighborDTO } from '../DTOs/create-neighbor-DTO'
import { AlreadyExistsNeighbor } from '../errors/neighbor-already-exists'
import { NeighborRepository } from '../repositories/neighbor-repository'

export class CreateNeighborUseCase {
  constructor(private neighborRepository: NeighborRepository) {}

  async execute({ neighborNumber }: CreateNeighborDTO) {
    const alreadyExistsNeighbor =
      await this.neighborRepository.findByNeighborNumber(neighborNumber)

    if (alreadyExistsNeighbor) {
      throw new AlreadyExistsNeighbor()
    }

    const neighbor = await this.neighborRepository.create({ neighborNumber })

    return {
      neighbor,
    }
  }
}
