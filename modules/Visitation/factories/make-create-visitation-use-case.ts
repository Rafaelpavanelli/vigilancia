import { TypeormHouseRepository } from "@/modules/House/typeorm/repository/typeorm-house-repository";
import { TypeormVisitationRepository } from "../typeorm/repositories/typeorm-visitation-repository";
import { CreateVisitationUseCase } from "../use-cases/create-visitation-use-case";

export function makeCreateVisitationUseCase() {
    const houseRepository = new TypeormHouseRepository()
    const visitationRepository = new TypeormVisitationRepository()
    const createVisitationUseCase = new CreateVisitationUseCase(houseRepository, visitationRepository)

    return createVisitationUseCase
}