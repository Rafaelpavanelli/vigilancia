import { CreateStreetDTO } from "../DTOs/street-DTO";
import { Street } from "../typeorm/entities/street";

export interface StreetRepository {
    create(data: CreateStreetDTO): Promise<Street>
    findById(id: string): Promise<Street | null>
}