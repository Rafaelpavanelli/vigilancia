import { TypeormHouseRepository } from "../typeorm/repository/typeorm-house-repository";
import { GetHouseByStreetIdUseCase } from "../use-cases/get-houses-by-street-id-use-case";

export function makeGetHousesByStreetIdUseCase() {
    const houseRepository = new TypeormHouseRepository()
    const getHousesByStreetIdUseCase = new GetHouseByStreetIdUseCase(houseRepository)

    return getHousesByStreetIdUseCase
}