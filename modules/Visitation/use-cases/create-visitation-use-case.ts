import { HouseRepository } from '@/modules/House/repositories/house-repository'
import { VisitationRepository } from '../repositories/visitation-repository'
import { ALLOWED_STATUSES } from '@/utils/allowed-visitation-statuses'
import type { VisitControlMeasureRepository } from '../repositories/visit-control-measure-repository'
import { CONTROL_MEASURE_TYPE } from '@/utils/control-measure-type'
import type { VisitContainersRepository } from '../repositories/visit-containers-repository'
import type { VisitContainer, VisitControlMeasure } from '@/typeorm/entities'

interface Container {
  type: string
  quantity: number
  withWater?: number
  withLarvae?: number
}

interface CreateVisitationUseCaseRequest {
  houseId: string
  status: string
  visitControlMeasures: string[]
  containers: Container[]
}

export class CreateVisitationUseCase {
  constructor(
    private houseRepository: HouseRepository,
    private visitationRepository: VisitationRepository,
    private visitControlMeasureRepository: VisitControlMeasureRepository,
    private visitContainersRepository: VisitContainersRepository
  ) {}

  async execute({
    houseId,
    status,
    visitControlMeasures,
    containers,
  }: CreateVisitationUseCaseRequest) {
    const house = await this.houseRepository.findById(houseId)

    if (!house) {
      throw new Error('Casa não existe')
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error('Status não permitido')
    }

    const visitation = await this.visitationRepository.create({
      houseId: house.id,
      status,
    })

    const invalidTypes = visitControlMeasures.filter(
      (measureType) => !CONTROL_MEASURE_TYPE.includes(measureType)
    )
    if (invalidTypes) {
      throw new Error('Tipo de controle inválido')
    }

    const createdVisitControlMeasures: VisitControlMeasure[] = []

    for (const visitControlMeasure of visitControlMeasures) {
      const createdVisitControlMeasure =
        await this.visitControlMeasureRepository.create({
          controlMeasureType: visitControlMeasure,
          visitationId: visitation.id,
        })

      createdVisitControlMeasures.push(createdVisitControlMeasure)
    }

    const createdVisitContainers: VisitContainer[] = []

    for (const container of containers) {
      const createdVisitContainer = await this.visitContainersRepository.create(
        {
          containerType: container.type,
          quantity: container.quantity,
          withLarvae: container.withLarvae,
          withWater: container.withWater,
          visitationId: visitation.id,
        }
      )

      createdVisitContainers.push(createdVisitContainer)
    }

    return {
      visitation: {
        ...visitation,
        controlMeasures: [...createdVisitControlMeasures],
        containers: [...createdVisitContainers],
      },
    }
  }
}
