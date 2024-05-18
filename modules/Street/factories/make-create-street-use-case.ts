import { TypeormNeighborRepository } from "@/modules/Neighbor/typeorm/repositories/typeorm-neighbor-repository";
import { CreateStreetUseCase } from "../use-cases/create-street-use-case";
import { TypeormStreetRepository } from "../typeorm/repositories/typeorm-street-repository";

export function makeCreateStreetUseCase() {
    const neighborRepository = new TypeormNeighborRepository()
    const streetRepository = new TypeormStreetRepository()
    const createStreetUseCase = new CreateStreetUseCase(neighborRepository, streetRepository)

    return createStreetUseCase
}