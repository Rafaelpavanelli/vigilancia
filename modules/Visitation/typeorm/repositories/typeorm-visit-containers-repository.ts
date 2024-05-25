import type { Repository } from 'typeorm'
import type { VisitContainerDTO } from '../../DTOs/visit-containers-DTO'
import type { VisitContainersRepository } from '../../repositories/visit-containers-repository'
import { AppDataSource } from '@/ormconfig'
import { VisitContainer } from '@/typeorm/entities'

export class TypeormVisitContainersRepository
  implements VisitContainersRepository
{
  private repository: Repository<VisitContainer>

  constructor() {
    this.repository = AppDataSource.getRepository(VisitContainer)
  }

  async create(data: VisitContainerDTO): Promise<VisitContainer> {
    const visitContainer = this.repository.create({
      containerType: data.containerType,
      quantity: data.quantity,
      withLarvae: data.withLarvae,
      withWater: data.withWater,
      visitationId: data.visitationId,
    })

    const createdContainer = await this.repository.save(visitContainer)

    return createdContainer
  }
}
