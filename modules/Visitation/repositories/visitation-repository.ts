import type { Visitation } from '@/typeorm/entities'
import { CreateVisitationDTO } from '../DTOs/create-visitation-DTO'

export interface VisitationRepository {
  create(data: CreateVisitationDTO): Promise<Visitation>
  findById(id: string): Promise<Visitation | null>
}
