import React from 'react';
import { Text, Container, Button } from "@chakra-ui/react";

const Trade = () => {
  return (
    <Container maxW={"1200px"}>
      <Text mb={4}>Aqui puedes cambiar WDL</Text>
      <Button as="a" href="https://dexscreener.com/polygon/0x29aA7463A60137277bBFf61DB425e8833dD09B8d" target="_blank" colorScheme="blue">
        Open
      </Button>
    </Container>
  );
};

export default Trade;
