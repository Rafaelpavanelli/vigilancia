import { Repository } from "typeorm";
import { VisitationRepository } from "../../repositories/visitation-repository";
import { CreateVisitationDTO } from "../DTOs/create-visitation-DTO";
import { Visitation } from "../entities/visitation";
import { AppDataSource } from "@/ormconfig";

export class TypeormVisitationRepository implements VisitationRepository {
    private repository: Repository<Visitation>

    constructor() {
        this.repository = AppDataSource.getRepository(Visitation)
    }

    async create({ houseId,status }: CreateVisitationDTO): Promise<Visitation> {
        const house = this.repository.create({
            houseId,
            status
        })

        const createdHouse = await this.repository.save(house)

        return createdHouse
    }
}