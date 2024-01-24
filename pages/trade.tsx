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
        <iframe 
          src="https://dexscreener.com/polygon/0xEb320fE45327fed31cf42d2c98B44B9B9Ca8fa69?embed=1&theme=dark"
          title="Dexscreener Embedded Content"
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>
    </Container>
  );
};

export default trade;
