import { MediaRenderer, Web3Button, useAddress, useContract } from '@thirdweb-dev/react';
import { NFT } from '@thirdweb-dev/sdk';
import { STAKING_ADDRESS, TOOLS_ADDRESS } from '../const/addresses';
import Link from 'next/link';
import { Text, Box, Button, Card, SimpleGrid, Stack, useBreakpointValue } from '@chakra-ui/react';

type Props = {
    nft: NFT[] | undefined;
};

export function Inventory({ nft }: Props) {
    const address = useAddress();
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);

    async function stakeNFT(id: string) {
        if (!address) {
            return;
        }

        const isApproved = await toolContract?.erc1155.isApproved(
            address,
            STAKING_ADDRESS,
        );

        if (!isApproved) {
            await toolContract?.erc1155.setApprovalForAll(
                STAKING_ADDRESS,
                true,
            );
        }
        await stakingContract?.call("stake", [id, 1]);
    };

    // Responsive grid columns
    const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

    if(nft?.length === 0) {
        return (
            <Box>
                <Link href="/shop">
                    <Button>Ecosistema</Button>
                </Link>
            </Box>
        )
    }

    return (
        <SimpleGrid columns={gridColumns} spacing={4}>
            {nft?.map((nft) => (
                <Card key={nft.metadata.id} p={5}>
                    <Stack alignItems={"center"}>
                        <MediaRenderer 
                            src={nft.metadata.image} 
                            height="100px"
                            width="100px"
                        />
                        <Text>{nft.metadata.name}</Text>
                        <Web3Button
                            contractAddress={STAKING_ADDRESS}
                            action={() => stakeNFT(nft.metadata.id)}
                        >Usar</Web3Button>
                    </Stack>
                </Card>
            ))}
        </SimpleGrid>
    );
};
