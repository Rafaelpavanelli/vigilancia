import type { Repository } from "typeorm";
import type { VisitControlMeasureDTO } from "../../DTOs/visit-control-measure-DTO";
import type { VisitControlMeasureRepository } from "../../repositories/visit-control-measure-repository";
import { AppDataSource } from "@/ormconfig";
import { VisitControlMeasure } from "@/typeorm/entities";

export class TypeormVisitControlMeasureRepository implements VisitControlMeasureRepository{

    private repository: Repository<VisitControlMeasure>

    constructor() {
        this.repository = AppDataSource.getRepository(VisitControlMeasure)
    }

    async create(data: VisitControlMeasureDTO): Promise<VisitControlMeasure> {
        const visitControlMeasure = this.repository.create({
            controlMeasure: data.controlMeasureType,
            visitationId: data.visitationId
        })

        const createdVisitControlMeasure = await this.repository.save(visitControlMeasure)

        return createdVisitControlMeasure
    }
}