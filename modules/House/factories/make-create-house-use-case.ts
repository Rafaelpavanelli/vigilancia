import { TypeormStreetRepository } from "@/modules/Street/typeorm/repositories/typeorm-street-repository";
import { TypeormHouseRepository } from "../typeorm/repository/typeorm-house-repository";
import { CreateHouseUseCase } from "../use-cases/create-house-use-case";

export function makeCreateHouseUseCase() {
    const streetRepository = new TypeormStreetRepository()
    const houseRepository = new TypeormHouseRepository()
    const createHouseUseCase = new CreateHouseUseCase(streetRepository, houseRepository)

    return createHouseUseCase
}