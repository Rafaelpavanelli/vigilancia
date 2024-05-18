import { HouseRepository } from "../repositories/house-repository";

export class GetHouseByStreetIdUseCase {
    constructor(
        private houseRepository: HouseRepository
    ) {}

    async execute(streetId: string) {
        const houses = await this.houseRepository.getHousesByStreetId(streetId)

        return {
            houses
        }
    }
}