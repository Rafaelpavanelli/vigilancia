import { HouseRepository } from "../repositories/house-repository";

export class GetHouseByIdUseCase {
    constructor(
        private houseRepository: HouseRepository
    ){}

    async execute(id: string) {
        const house = await this.houseRepository.findById(id)
    
        return {
            house
        }
    }
}