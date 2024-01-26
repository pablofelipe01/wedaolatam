import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../const/addresses";
import { Box, Container, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";

export function ClaimFarmer() {
    const { contract } = useContract(FARMER_ADDRESS);
    const { data: metadata } = useContractMetadata(contract);

    // Responsive image sizes
    const imageHeight = useBreakpointValue({ base: "150px", md: "200px" });
    const imageWidth = useBreakpointValue({ base: "225px", md: "300px" });

    return (
        <Container maxW={{ base: "90%", md: "1200px" }}>
            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} h={"50vh"}>
                <Heading textAlign={"center"} size={"lg"} my={5}>Reclama tu Pase para obtener WeDao Tokens</Heading>
                <Box borderRadius={"8px"} overflow={"hidden"} my={10}>
                    <MediaRenderer
                        src={metadata?.image}
                        height={imageHeight}
                        width={imageWidth}
                    />
                </Box>
                
                <Web3Button
                    contractAddress={FARMER_ADDRESS}
                    action={(contract) => contract.erc1155.claim(0, 1)}
                >Pase Aquí</Web3Button>
            </Flex>
        </Container>
    );
}
