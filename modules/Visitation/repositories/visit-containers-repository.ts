import type { VisitContainer } from '@/typeorm/entities'
import type { VisitContainerDTO } from '../DTOs/visit-containers-DTO'

export interface VisitContainersRepository {
  create(data: VisitContainerDTO): Promise<VisitContainer>
}
