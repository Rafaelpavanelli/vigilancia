import { Repository } from "typeorm";
import { StreetRepository } from "../../repositories/street-repository";
import { Street } from "../entities/street";
import { AppDataSource } from "@/ormconfig";
import { CreateStreetDTO } from "../../DTOs/street-DTO";
import { Neighbor } from "@/modules/Neighbor/typeorm/entities/neighbor";

export class TypeormStreetRepository implements StreetRepository {
    private repository: Repository<Street>
    private neighborRepository: Repository<Neighbor>
    
    constructor(){
        this.repository = AppDataSource.getRepository(Street)
        this.neighborRepository = AppDataSource.getRepository(Neighbor)
    }

    async create(data: CreateStreetDTO): Promise<Street> {
        const street = this.repository.create({
            streetName: data.name,
            neighborId: data.neighborId,
        })

        const createdStreet = await this.repository.save(street)

        return createdStreet
    }

    async findById(id: string): Promise<Street | null> {
        const street = await this.repository.findOneBy({
            id
        })

        if(!street) {
            return null
        }

        return street
    }
}