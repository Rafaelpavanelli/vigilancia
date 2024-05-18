import { StreetDTO } from "../DTOs/street-DTO";
import { Street } from "../typeorm/entities/street";

export interface StreetRepository {
    create(data: StreetDTO): Promise<Street>
    findById(id: string): Promise<Street | null>
}