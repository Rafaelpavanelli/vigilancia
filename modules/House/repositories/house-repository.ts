import type { House } from "@/typeorm/entities";
import { CreateHouseDTO } from "../DTOs/create-house-DTO";


export interface HouseRepository {
    create(data: CreateHouseDTO): Promise<House>
    findById(id: string): Promise<House | null>
    getHousesByStreetId(streetId: string): Promise<House[] | null>
}