import React from 'react';
import { Text, Container } from "@chakra-ui/react";

const trade = () => {
  return (
    <Container maxW={"1200px"}>
      {/* Inline CSS */}
      <style>
        {`
          #dexscreener-embed {
            position: relative;
            width: 1000px; /* Set width in pixels */
            height: 1000px; /* Set height in pixels */
          }
          @media (max-width: 800px) {
            #dexscreener-embed {
              width: 100%; /* Full width on smaller screens */
              height: 450px; /* Adjust height accordingly */
            }
          }
        `}
      </style>

      <div id="dexscreener-embed">

      {/* <iframe
  src="https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
  height="660px"
  width="100%"
  style="
    border: 0;
    margin: 0 auto;
    display: block;
    border-radius: 10px;
    max-width: 600px;
    min-width: 300px;
  "
></iframe> */}
        <iframe 
          src="https://app.uniswap.org/#/swap?outputCurrency=0x29aA7463A60137277bBFf61DB425e8833dD09B8d"
          title="Dexscreener Embedded Content"
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>
    </Container>
  );
};

export default trade;
// https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359
// https://dexscreener.com/polygon/0xEb320fE45327fed31cf42d2c98B44B9B9Ca8fa69?embed=1&theme=dark