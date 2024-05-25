import { StreetRepository } from '@/modules/Street/repositories/street-repository'
import { HouseRepository } from '../repositories/house-repository'
import { CreateHouseDTO } from '../DTOs/create-house-DTO'

export class CreateHouseUseCase {
  constructor(
    private streetRepository: StreetRepository,
    private houseRepository: HouseRepository
  ) {}

  async execute({ houseNumber, streetId, addressComplement }: CreateHouseDTO) {
    const street = await this.streetRepository.findById(streetId)

    if (!street) {
      throw new Error('Rua não está cadastrada')
    }

    const house = await this.houseRepository.create({
      houseNumber,
      streetId: street.id,
      addressComplement,
    })

    return {
      house,
    }
  }
}
