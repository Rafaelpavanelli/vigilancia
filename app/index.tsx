import { Center } from "@gluestack-ui/themed";
import { Link } from "expo-router";

export default function Home(){
    return(
        <Center className="relative flex-1 pt-10 gap-10">
            <Link href={'(Register)'}>Registrar</Link>
        </Center>
    )
}