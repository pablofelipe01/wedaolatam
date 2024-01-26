import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "../const/addresses";
import { useRouter } from "next/router";
import { Text, Button, Container, Flex, Heading, SimpleGrid, Spinner, useBreakpointValue } from "@chakra-ui/react";
import NFT from "../components/NFT";

export default function Shop() {
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data: nfts } = useNFTs(contract);
    const router = useRouter();

    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

    return (
        <Container maxW={"1200px"}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Button onClick={() => router.back()}>Back</Button>
            </Flex>
            <Heading mt={"40px"}>Ecosistema We</Heading>
            {!nfts ? (
                <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
                    <Spinner />
                </Flex>
            ) : (
                <SimpleGrid columns={gridColumns} spacing={10}>
                    {nfts?.map((nftItem) => (
                        <NFT 
                            key={nftItem.metadata.id}
                            nft={nftItem}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
};
