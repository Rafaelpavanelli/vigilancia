import { CreateHouseDTO } from "../DTOs/create-house-DTO";
import { House } from "../typeorm/entities/house";

export interface HouseRepository {
    create(data: CreateHouseDTO): Promise<House>
    findById(id: string): Promise<House | null>
    getHousesByStreetId(streetId: string): Promise<House[] | null>
}