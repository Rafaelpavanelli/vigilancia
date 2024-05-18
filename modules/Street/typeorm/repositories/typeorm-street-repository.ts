import { Repository } from "typeorm";
import { StreetDTO } from "../../DTOs/street-DTO";
import { StreetRepository } from "../../repositories/street-repository";
import { Street } from "../entities/street";
import { AppDataSource } from "@/ormconfig";

export class TypeormStreetRepository implements StreetRepository {
    private repository: Repository<Street>
    
    constructor(){
        this.repository = AppDataSource.getRepository(Street)
    }

    async create(data: StreetDTO): Promise<Street> {
        const street = this.repository.create({
            streetName: data.name,
            neighborId: data.neighborId
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