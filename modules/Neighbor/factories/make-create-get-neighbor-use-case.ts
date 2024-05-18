import { TypeormNeighborRepository } from "../typeorm/repositories/typeorm-neighbor-repository";
import { CreateNeighborUseCase } from "../use-cases/create-neighbor-use-case";
import { GetNeighborsUseCase } from "../use-cases/get-neighbors-use-case";

export function makeGetNeighborsUseCase() {
    const neighborRepository = new TypeormNeighborRepository()
    const getNeighborsUseCase = new GetNeighborsUseCase(neighborRepository)

    return getNeighborsUseCase
}