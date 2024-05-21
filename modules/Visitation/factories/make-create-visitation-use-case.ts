import { TypeormHouseRepository } from "@/modules/House/typeorm/repository/typeorm-house-repository";
import { TypeormVisitationRepository } from "../typeorm/repositories/typeorm-visitation-repository";
import { CreateVisitationUseCase } from "../use-cases/create-visitation-use-case";
import { TypeormVisitControlMeasureRepository } from "../typeorm/repositories/typeorm-visit-control-measure-repository";
import { TypeormVisitContainersRepository } from "../typeorm/repositories/typeorm-visit-containers-repository";

export function makeCreateVisitationUseCase() {
    const houseRepository = new TypeormHouseRepository()
    const visitationRepository = new TypeormVisitationRepository()
    const visitControlMeasureRepository = new TypeormVisitControlMeasureRepository()
    const visitContainersRepository = new TypeormVisitContainersRepository()
    const createVisitationUseCase = new CreateVisitationUseCase(houseRepository, visitationRepository, visitControlMeasureRepository, visitContainersRepository)

    return createVisitationUseCase
}