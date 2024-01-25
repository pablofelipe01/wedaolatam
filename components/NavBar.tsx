import { Container, Flex, Link, Image } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function NavBar() {
    return (
        <Container maxW={"1200px"} py={4}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"}>
                    {/* Adjust the Image source path */}
                    <Image 
                        src="/images/001.png" // Updated path
                        alt="Wedao Latam Logo"
                        boxSize="130px" // Adjust the size as needed
                    />
                </Flex>
                <Flex alignItems={"center"}>
                    <Link href={"/"} mx={2}>Home</Link>
                    <Link href={"/shop"} mx={2}>Ecosistema</Link>
                    <Link href={"/trade"} mx={2}>WDL/USD</Link>
                </Flex>
                <ConnectWallet />
            </Flex>
        </Container>
    )
};
