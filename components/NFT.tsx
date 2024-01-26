import { Text, Card } from "@chakra-ui/react";
import { MediaRenderer, Web3Button, useActiveClaimCondition, useContract } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { TOOLS_ADDRESS } from "../const/addresses";
import { ethers, BigNumber } from "ethers";

type Props = {
    nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data, isLoading } = useActiveClaimCondition(contract, nft.metadata.id);

    const convertToUSDC = (priceInWei: BigNumber) => {
        return ethers.utils.formatUnits(priceInWei.toString(), 6); // 6 decimal places for USDC
    };

    return (
        <Card key={nft.metadata.id} overflow={"hidden"}>
            <MediaRenderer
                src={nft.metadata.image}
                height="100%"
                width="100%"
            />
            <Text fontSize={"2xl"} fontWeight={"bold"} my={5} textAlign={"center"}>
                {nft.metadata.name}
            </Text>
            {!isLoading && data ? (
                <Text textAlign={"center"} my={5}>
                    Cost: {convertToUSDC(data.price)} {data.currencyMetadata.symbol}
                </Text>
            ) : (
                <Text textAlign={"center"} my={5}>Loading...</Text>
            )}
            <Web3Button
                contractAddress={TOOLS_ADDRESS}
                action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
            >
                Buy
            </Web3Button>
        </Card>
    );
};
