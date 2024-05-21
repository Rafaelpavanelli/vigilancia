import type { Street } from "@/typeorm/entities";
import { CreateStreetDTO } from "../DTOs/street-DTO";

export interface StreetRepository {
    create(data: CreateStreetDTO): Promise<Street>
    findById(id: string): Promise<Street | null>
}