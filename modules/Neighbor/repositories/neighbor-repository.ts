import { CreateNeighborDTO } from "../DTOs/create-neighbor-DTO";
import { Neighbor } from "../typeorm/entities/neighbor";

export interface NeighborRepository {
    create(data: CreateNeighborDTO): Promise<void>
    findByNeighborNumber(neighborNumber: number): Promise<Neighbor | null>
    findById(id: string): Promise<Neighbor | null>
    getNeighbors(): Promise<Neighbor[] | null>
}