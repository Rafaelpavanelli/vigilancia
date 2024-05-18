import { CreateVisitationDTO } from "../typeorm/DTOs/create-visitation-DTO";
import { Visitation } from "../typeorm/entities/visitation";

export interface VisitationRepository {
    create(data: CreateVisitationDTO): Promise<Visitation>
}