import { Repository } from "typeorm";
import { CreateNeighborDTO } from "../../DTOs/create-neighbor-DTO";
import { NeighborRepository } from "../../repositories/neighbor-repository";
import { Neighbor } from "../entities/neighbor";
import { AppDataSource } from "@/ormconfig";


export class TypeormNeighborRepository implements NeighborRepository {
    private repository: Repository<Neighbor>

    constructor() {
        this.repository = AppDataSource.getRepository(Neighbor)
    }
    
    async create(data: CreateNeighborDTO): Promise<void> {
         const neighbor = this.repository.create(data)

        await this.repository.save(neighbor)
    }

    async findByNeighborNumber(neighborNumber: number): Promise<Neighbor | null> {
        const neighbor = await this.repository.findOneBy({
            neighborNumber,
        })   

        if(!neighbor) {
            return null
        }

        return neighbor
    }

    async getNeighbors(): Promise<Neighbor[] | null> {
        const neighbors = await this.repository.find()

        if (!neighbors) {
            return null
        }

        return neighbors
    }

    async findById(id: string): Promise<Neighbor | null> {
        const neighbor = await this.repository.findOneBy({
            id,
        })   

        if(!neighbor) {
            return null
        }

        return neighbor
    }
}