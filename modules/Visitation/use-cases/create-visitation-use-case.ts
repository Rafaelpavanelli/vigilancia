import { HouseRepository } from '@/modules/House/repositories/house-repository'
import { VisitationRepository } from '../repositories/visitation-repository'
import { ALLOWED_STATUSES } from '@/utils/allowed-visitation-statuses'
import type { VisitControlMeasureRepository } from '../repositories/visit-control-measure-repository'
import { CONTROL_MEASURE_TYPE } from '@/utils/control-measure-type'
import type { VisitContainersRepository } from '../repositories/visit-containers-repository'

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

    const invalidTypes = visitControlMeasures.filter(
      (measureType) => !CONTROL_MEASURE_TYPE.includes(measureType)
    )
    if (invalidTypes.length > 0) {
      throw new Error('Tipo de controle inválido')
    }

    const visitation = await this.visitationRepository.create({
      houseId: house.id,
      status,
    })

    const controlMeasuresPromises = visitControlMeasures.map(
      (controlMeasure) => {
        this.visitControlMeasureRepository.create({
          controlMeasureType: controlMeasure,
          visitationId: visitation.id,
        })
      }
    )

    const containersPromises = containers.map((container) => {
      this.visitContainersRepository.create({
        containerType: container.type,
        quantity: container.quantity,
        withLarvae: container.withLarvae,
        withWater: container.withWater,
        visitationId: visitation.id,
      })
    })

    const createdVisitControlMeasures = await Promise.all(
      controlMeasuresPromises
    )

    const createdVisitContainers = await Promise.all(containersPromises)

    return {
      visitation: {
        ...visitation,
        controlMeasures: createdVisitControlMeasures,
        containers: createdVisitContainers,
      },
    }
  }
}
