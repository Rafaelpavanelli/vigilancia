import { Repository } from "typeorm";
import { CreateHouseDTO } from "../../DTOs/create-house-DTO";
import { HouseRepository } from "../../repositories/house-repository";
import { House } from "../entities/house";
import { AppDataSource } from "@/ormconfig";

export class TypeormHouseRepository implements HouseRepository {

    private repository: Repository<House>

    constructor() {
        this.repository = AppDataSource.getRepository(House)
    }

    async create(data: CreateHouseDTO): Promise<House> {
        const house = this.repository.create({
            houseNumber: data.houseNumber,
            streetId: data.streetId,
            addressComplement: data.addressComplement
        })


        const createdHouse = await this.repository.save(house)

        return createdHouse
    }

    async findById(id: string): Promise<House | null> {
        const house = await this.repository.findOne({
            where: {
                id,
            },
            relations: {
                visits: true
            },
        },)
        
        if(!house) {
            return null
        }

        return house
    }

    async getHousesByStreetId(streetId: string): Promise<House[] | null> {
        const houses = await this.repository.find({
            where: {
                streetId,
            },
            relations: {
                visits: true
            }
        })

        if(!houses) {
            return null
        }

        return houses
    }
}