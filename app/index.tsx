import { makeGetHousesByStreetIdUseCase } from "@/modules/House/factories/make-get-houses-by-street-id-use-case";
import { House } from "@/modules/House/typeorm/entities/house";
import { makeCreateVisitationUseCase } from "@/modules/Visitation/factories/make-create-visitation-use-case";
import { Button, Center } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function Home(){

    const [houses, setHouses] = useState<House[] | null>(null)

    async function getHousesByStreetId() {
        const getHousesByStreeId = makeGetHousesByStreetIdUseCase()

        const { houses } = await getHousesByStreeId.execute("4ff37a51-9411-4cf8-a827-558576afa7dc")

        setHouses(houses)
        console.log(houses)
    }

    async function visitation() {
        const useCase = makeCreateVisitationUseCase()

        const { visitation } = await useCase.execute({
            houseId: "8a321f58-06d1-45ae-9257-d5d350dc7115",
            status: 'fechado'
        })

        console.log(visitation)
    }

    return(
        <Center className="relative flex-1 pt-10 gap-10">
            <Link href={'(Register)'}>Registrar</Link>

            {houses && houses.map(house => {
                return (
                    <>
                        <Text>{house.houseNumber}</Text>
                        {house.visits && house.visits.map(visit => {
                            return (
                                <Text>Rua: {visit.status}</Text>
                            )
                        })}
                    </>
                )
            })}

            <Button onPress={async () => await getHousesByStreetId()}><Text>Ver Casas</Text></Button>
            <Button onPress={async () => await visitation()}><Text>Visitar</Text></Button>
        </Center>
    )
}