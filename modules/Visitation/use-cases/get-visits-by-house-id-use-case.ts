import type { VisitationRepository } from '../repositories/visitation-repository'

export class GetVisitsByHouseIdUseCase {
  constructor(private visitationRepository: VisitationRepository) {}

  async execute(id: string) {
    const visits = await this.visitationRepository.findByHouseId(id)

    if (!visits) {
      throw new Error('Visita não encontrada.')
    }

    return {
      visits,
    }
  }
}
