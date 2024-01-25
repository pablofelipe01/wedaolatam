import { ConnectWallet, MediaRenderer, useAddress, useContract, useContractRead, useOwnedNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { FARMER_ADDRESS, REWARDS_ADDRESS, STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import { ClaimFarmer } from "../components/ClaimFarmer";
import { Inventory } from "../components/Inventory";
import { Equipped } from "../components/Equipped";
import { BigNumber, ethers } from "ethers";
import { Text, Box, Card, Container, Flex, Heading, SimpleGrid, Spinner, Skeleton } from "@chakra-ui/react";

// Function to format number with commas and limit decimal places
const formatNumber = (num: number | string) => {
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // Adjust the number of decimal places here
  });
};

// Function to abbreviate large numbers
const abbreviateNumber = (value: number): string => {
  if (value < 1000) return value.toString(); // Return the number as is if less than 1000

  const suffixes = ["K", "M", "B", "T"];
  const suffixNum = Math.floor(Math.log10(value) / 3); // Calculate the index for suffixes
  const shortValue = (value / Math.pow(1000, suffixNum)).toFixed(1); // Calculate the short value

  return shortValue + suffixes[suffixNum - 1]; // Attach the correct suffix
};



const Home: NextPage = () => {
  const address = useAddress();

  const { contract: farmercontract } = useContract(FARMER_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(farmercontract, address);
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(toolsContract, address);

  const { data: equippedTools } = useContractRead(stakingContract, "getStakeInfo", [address]);
  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);

  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex direction={"column"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Heading my={"40px"}>WeDao Latam</Heading>
          <ConnectWallet />
        </Flex>
      </Container>
    );
  }

  if (loadingOwnedFarmers) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    );
  }

  if (ownedFarmers?.length === 0) {
    return (
      <Container maxW={"1500px"}>
        <ClaimFarmer />
      </Container>
    );
  }

  return (
    <Container maxW={"1200px"}>
      <SimpleGrid columns={2} spacing={10}>
        <Card p={8}>
          <Heading>WeDao Pase</Heading>
          <Text fontSize='15px' as='b' color='#2C5282'>Token Contract #</Text>
          <Text fontSize='10px' as='i' color='#2B6CB0'>0x29aA7463A60137277bBFf61DB425e8833dD09B8d</Text>
          <SimpleGrid columns={2} spacing={10}>
          <Box>
              <Text fontSize={"small"} fontWeight={"bold"} >WeDao Token Balance:</Text>
              {rewardBalance && (
                // <p>WDL {abbreviateNumber(formatNumber(ethers.utils.formatUnits(rewardBalance, 18)))}</p>
                // <p>WDL {abbreviateNumber(formatNumber(ethers.utils.formatUnits(rewardBalance, 18)))}</p>
                <p>WDL {abbreviateNumber(Number(ethers.utils.formatUnits(rewardBalance, 18)))}</p>




              )}
            </Box>
            <Box>
              {ownedFarmers?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer 
                    src={nft.metadata.image} 
                    height="70%"
                    width="70%"
                  />
                </div>
              ))}
            </Box>
            
          </SimpleGrid>
        </Card>
        <Card p={5}>
          <Heading>Mis Aportes</Heading>
          <Skeleton isLoaded={!loadingOwnedTools}>
            <Inventory
              nft={ownedTools}
            />     
          </Skeleton>
        </Card>
      </SimpleGrid>
      <Card p={5} my={10}>
        <Heading mb={"30px"}>Contribuciones En Accion:</Heading>
        <SimpleGrid columns={3} spacing={10}>
            {equippedTools &&
              equippedTools[0].map((nft: BigNumber) => (
                <Equipped
                  key={nft.toNumber()}
                  tokenId={nft.toNumber()}
                />
              ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default Home;
