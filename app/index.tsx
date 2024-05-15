import { Center } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home(){
    const data = [
        {

        }
    ]
    return(
        <Center className="relative flex-1 pt-10">
            <Link href={'(Register)'}>Registrar</Link>
        </Center>
    )
}