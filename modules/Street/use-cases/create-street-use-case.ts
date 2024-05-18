import { NeighborRepository } from "@/modules/Neighbor/repositories/neighbor-repository";
import { StreetRepository } from "../repositories/street-repository";
import { CreateStreetDTO } from "../DTOs/street-DTO";

export class CreateStreetUseCase {
    constructor(private neighborRepository: NeighborRepository, private streetRepository: StreetRepository){}

    async execute({ name,neighborId }: CreateStreetDTO ){
        const hasNeighborWithId = await this.neighborRepository.findById(neighborId)

        if(!hasNeighborWithId) {
            throw new Error('Bairro não existe')
        }

        const street = await this.streetRepository.create({
            name,
            neighborId
        })

        return {
            street
        }
    }
}