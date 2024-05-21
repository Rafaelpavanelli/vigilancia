import { Repository } from "typeorm";
import { StreetRepository } from "../../repositories/street-repository";
import { AppDataSource } from "@/ormconfig";
import { CreateStreetDTO } from "../../DTOs/street-DTO";
import {  Street } from "@/typeorm/entities";

export class TypeormStreetRepository implements StreetRepository {
    private repository: Repository<Street>
    
    constructor(){
        this.repository = AppDataSource.getRepository(Street)
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