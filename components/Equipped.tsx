import { MediaRenderer, Web3Button, useContract, useNFT, useContractRead, useAddress } from "@thirdweb-dev/react";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { Text, Box, Card, Stack, Flex, useBreakpointValue } from "@chakra-ui/react";

interface EquippedProps {
    tokenId: number;
};

export const Equipped = (props: EquippedProps) => {
    const address = useAddress();
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { data: nft } = useNFT(toolContract, props.tokenId);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);
    const { data: claimableRewards } = useContractRead(stakingContract, "getStakeInfoForToken", [props.tokenId, address]);

    // Use string literals for flexDirection with type casting
    const flexDirection = useBreakpointValue({ base: "column", md: "row" }) as any;

    return (
        <Box>
            {nft && (
                <Card p={5}>
                    <Flex direction={flexDirection}>
                        <Box flexShrink={0}>
                            <MediaRenderer
                                src={nft.metadata.image}
                                height="80px"
                                width="80px"
                            />
                        </Box>
                        <Stack spacing={1} flex={1} mx={{ base: 2, md: 4 }}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
                            <Text>En Uso: {ethers.utils.formatUnits(claimableRewards[0], 0)}</Text>
                            <Web3Button
                                contractAddress={STAKING_ADDRESS}
                                action={(contract) => contract.call("withdraw", [props.tokenId, 1])}
                            >Finalizar</Web3Button>
                        </Stack>
                    </Flex>
                    <Box mt={5}>
                        <Text>WDL Reclamable:</Text>
                        <Text>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
                        <Web3Button
                            contractAddress={STAKING_ADDRESS}
                            action={(contract) => contract.call("claimRewards", [props.tokenId])}
                        >Reclamar WDL</Web3Button>
                    </Box>
                </Card>
            )}
        </Box>
    );
};
