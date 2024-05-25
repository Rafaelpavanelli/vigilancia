import type { VisitControlMeasure } from '@/typeorm/entities'
import type { VisitControlMeasureDTO } from '../DTOs/visit-control-measure-DTO'

export interface VisitControlMeasureRepository {
  create(data: VisitControlMeasureDTO): Promise<VisitControlMeasure>
}
