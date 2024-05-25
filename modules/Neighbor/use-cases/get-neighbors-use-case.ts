import { NeighborRepository } from '../repositories/neighbor-repository'

export class GetNeighborsUseCase {
  constructor(private neighborsRepository: NeighborRepository) {}

  async execute() {
    const neighbors = await this.neighborsRepository.getNeighbors()

    return {
      neighbors,
    }
  }
}
