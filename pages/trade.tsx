import React from 'react';
import { Container, Box } from "@chakra-ui/react"; // Import Box

const Trade = () => {
  return (
    <Container maxW={"1200px"}>
      {/* Use Box for the iframe to apply Chakra UI's styling if needed */}
      <Box
        as="iframe"
        src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x29aA7463A60137277bBFf61DB425e8833dD09B8d"
        height="660px"
        width="100%"
        sx={{
          border: 0,
          margin: "0 auto",
          marginBottom: ".5rem",
          display: "block",
          borderRadius: "10px",
          maxWidth: "960px",
          minWidth: "300px",
        }}
      />
    </Container>
  );
};

export default Trade;