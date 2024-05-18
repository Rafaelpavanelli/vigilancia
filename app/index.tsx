import { makeCreateHouseUseCase } from "@/modules/House/factories/make-create-house-use-case";
import { makeGetHousesByStreetIdUseCase } from "@/modules/House/factories/make-get-houses-by-street-id-use-case";
import { House } from "@/modules/House/typeorm/entities/house";
import { makeGetNeighborsUseCase } from "@/modules/Neighbor/factories/make-create-get-neighbor-use-case";
import { makeCreateNeighborUseCase } from "@/modules/Neighbor/factories/make-create-neighbor-use-case";
import { Neighbor } from "@/modules/Neighbor/typeorm/entities/neighbor";
import { makeCreateStreetUseCase } from "@/modules/Street/factories/make-create-street-use-case";
import { Street } from "@/modules/Street/typeorm/entities/street";
import { makeCreateVisitationUseCase } from "@/modules/Visitation/factories/make-create-visitation-use-case";
import { Visitation } from "@/modules/Visitation/typeorm/entities/visitation";
import { Button, Center } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import {  useState } from "react";
import { Text } from "react-native";

export default function Home(){

    const [allNeighbors, setAllNeighbors] = useState<Neighbor[] | null>(null)
    const [createdStreet, setCreatedStreet] = useState<Street | null>(null)
    const [createdHouse, setCreatedHouse] = useState<House | null>(null)
    const [createdHouses, setCreatedHouses] = useState<House[] | null>(null)
    const [createdVisitation, setCreatedVisitation] = useState<Visitation | null>(null)

    async function createNeighbor() {
        const createNeighborUseCase = makeCreateNeighborUseCase()

        try {
            await createNeighborUseCase.execute({neighborNumber: 27})
        } catch (e) {
            console.log(e)
        }
    }

    async function getAllNeighbors() {
        const getNeighborsUseCase = makeGetNeighborsUseCase()

        const { neighbors } = await getNeighborsUseCase.execute()

        console.log(neighbors)

        setAllNeighbors(neighbors)
    }

    async function createStreet() {
        const createStreetUseCase = makeCreateStreetUseCase()

        const { street } = await createStreetUseCase.execute({
            name: 'Teste 3',
            neighborId: allNeighbors![0].id
        })

        setCreatedStreet(street)
    }

    async function createHouse() {
        const createHouseUseCase = makeCreateHouseUseCase()

        const { house } = await createHouseUseCase.execute({
            houseNumber: 20,
            streetId: "4ff37a51-9411-4cf8-a827-558576afa7dc",
            addressComplement: ''
        })

        setCreatedHouse(house)
    }

    async function createVisitation() {
        const createVisitationUseCase = makeCreateVisitationUseCase()

        try {
            const { visitation } = await createVisitationUseCase.execute({
                houseId: '732dc9e2-0d42-4ecb-82e8-d4e1a6820e02',
                status: 'Balada'
            })
    
            setCreatedVisitation(visitation)
        } catch (e) {
            console.log(e)
        }
    }

    async function fetchHousesByStreetId() {
        const fetchHouses = makeGetHousesByStreetIdUseCase()

        const { houses } = await fetchHouses.execute("6a26d50b-c6fd-40a4-a66b-bb7937c10e7b")

        setCreatedHouses(houses)
    }


    return(
        <Center className="relative flex-1 pt-10 gap-10">
            <Link href={'(Register)'}>Registrar</Link>
            <Button onPress={async () => await createNeighbor()}>
                <Text>Criar</Text>
            </Button>

            <Button onPress={async () => await getAllNeighbors()}>
                <Text>Fetch</Text>
            </Button>

            <Button onPress={async () => await createStreet()}>
                <Text>Criar Rua</Text>
            </Button>

            <Button onPress={async () => await createHouse()}>
                <Text>Criar Casa</Text>
            </Button>

            <Button onPress={async () => await createVisitation()}>
                <Text>Visitar</Text>
            </Button>

            <Button onPress={async () => await fetchHousesByStreetId()}>
                <Text>VADFASd</Text>
            </Button>

            {
                createdHouses && createdHouses.map(item => {
                    return (
                        <Text key={item.id}>{item.houseNumber}</Text>
                    )
                })
            }

            {
                allNeighbors && allNeighbors.map(item => {
                    return (
                        <>
                        <Text key={item.id}>{item.id}</Text>
                        {item.streets && item.streets.map(item => {
                            return (
                                <>
                                    <Text>Rua: {item.streetName} - {item.id}</Text>

                                    {item.houses && item.houses.map(item => {
                                        return (
                                            <Text key={item.id}>{item.houseNumber}</Text>
                                        )
                                    })}
                                </>
                            )
                        })}
                        </>
                    )
                })
            }
          
        </Center>
    )
}