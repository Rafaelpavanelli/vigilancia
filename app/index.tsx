import { makeGetNeighborsUseCase } from "@/modules/Neighbor/factories/make-create-get-neighbor-use-case";
import { makeCreateNeighborUseCase } from "@/modules/Neighbor/factories/make-create-neighbor-use-case";
import { Neighbor } from "@/modules/Neighbor/typeorm/entities/neighbor";
import { Button, Center } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import {  useState } from "react";
import { Text } from "react-native";

export default function Home(){

    const [allNeighbors, setAllNeighbors] = useState<Neighbor[] | null>(null)

    async function createNeighbor() {
        const createNeighborUseCase = makeCreateNeighborUseCase()

        try {
            await createNeighborUseCase.execute({neighborNumber: 92})
        } catch (e) {
            console.log(e)
        }
    }

    async function getAllNeighbors() {
        const getNeighborsUseCase = makeGetNeighborsUseCase()

        const {neighbors} = await getNeighborsUseCase.execute()

        setAllNeighbors(neighbors)
    }


    return(
        <Center className="relative flex-1 pt-10">
            <Link href={'(Register)'}>Registrar</Link>
            <Button onPress={async () => await createNeighbor()}>
                <Text>Criar</Text>
            </Button>

            <Button onPress={async () => await getAllNeighbors()}>
                <Text>Fetch</Text>
            </Button>

         
                {allNeighbors && allNeighbors.map(item => {
                    return (
                        <Text key={item.id}>
                            {item.neighborNumber} id: {item.id}
                        </Text>
                    )
                })}
          
        </Center>
    )
}