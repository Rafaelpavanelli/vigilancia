import { HouseRepository } from "@/modules/House/repositories/house-repository";
import { VisitationRepository } from "../repositories/visitation-repository";
import { CreateVisitationDTO } from "../typeorm/DTOs/create-visitation-DTO";
import { ALLOWED_STATUSES } from "@/utils/allowed-visitation-statuses";

export class CreateVisitationUseCase {
    constructor(
        private houseRepository: HouseRepository,
        private visitationRepository: VisitationRepository
    ){}

    async execute({ houseId, status }: CreateVisitationDTO) {
        const house = await this.houseRepository.findById(houseId)

        if(!house) {
            throw new Error('Casa não existe')
        }

        console.log(ALLOWED_STATUSES.includes(status))

        if(!ALLOWED_STATUSES.includes(status)) {
            throw new Error("Status não permitido")
        }

        const visitation = await this.visitationRepository.create({
            houseId: house.id,
            status
        })

        return {
            visitation
        }
    }
}