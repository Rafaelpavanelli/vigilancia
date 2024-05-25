import { Repository } from 'typeorm'
import { VisitationRepository } from '../../repositories/visitation-repository'
import { CreateVisitationDTO } from '../../DTOs/create-visitation-DTO'
import { AppDataSource } from '@/ormconfig'
import { Visitation } from '@/typeorm/entities'

export class TypeormVisitationRepository implements VisitationRepository {
  private repository: Repository<Visitation>

  constructor() {
    this.repository = AppDataSource.getRepository(Visitation)
  }

  async create({ houseId, status }: CreateVisitationDTO): Promise<Visitation> {
    const visit = this.repository.create({
      houseId,
      status,
    })

    const createdVisit = await this.repository.save(visit)

    return createdVisit
  }

  async findById(id: string): Promise<Visitation | null> {
    const visit = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        controlMeasures: true,
        containers: true,
      },
    })

    if (!visit) {
      return null
    }

    return visit
  }
}
