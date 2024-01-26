import { Container, Flex, Link, Image } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Box } from "@chakra-ui/react"; // Added Box import

export default function NavBar() {
    return (
        <Container maxW={"1200px"} py={4}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"}>
                    {/* Logo Image */}
                    <Image 
                        src="/images/001.png"
                        alt="Wedao Latam Logo"
                        boxSize="130px"
                    />
                </Flex>
                <Flex alignItems={"center"}>
                    {/* Navigation Links */}
                    <Link href={"/"} mx={2}>Home</Link>
                    <Link href={"/shop"} mx={2}>Ecosistema</Link>
                    <Link href={"/trade"} mx={2}>WDL/USD</Link>
                </Flex>

                {/* ConnectWallet wrapped in a Box for responsive display */}
                <Box display={{ base: "none", md: "block" }}>
                    <ConnectWallet />
                </Box>
            </Flex>
        </Container>
    );
};
