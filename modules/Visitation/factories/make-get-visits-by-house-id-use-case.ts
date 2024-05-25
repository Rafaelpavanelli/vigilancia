import { TypeormVisitationRepository } from '../typeorm/repositories/typeorm-visitation-repository'
import { GetVisitsByHouseIdUseCase } from '../use-cases/get-visits-by-house-id-use-case'

export function makeGetVisitsByHouseIdUseCase() {
  const visitationRepository = new TypeormVisitationRepository()
  const getVisitsByHouseIdUseCase = new GetVisitsByHouseIdUseCase(
    visitationRepository
  )

  return getVisitsByHouseIdUseCase
}
