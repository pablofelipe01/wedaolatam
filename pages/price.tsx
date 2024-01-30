import React from 'react';
import { Container, Box } from "@chakra-ui/react"; // Import Box for Chakra UI

const Trade = () => {
  // Inline styles for the iframe container
  const iframeStyles = `
    #dexscreener-embed {
      position: relative;
      width: 100%;
      padding-bottom: 125%;
    }
    @media (min-width: 1400px) {
      #dexscreener-embed {
        padding-bottom: 65%;
      }
    }
    #dexscreener-embed iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border: 0;
    }
  `;

  return (
    <Container maxW={"1200px"}>
      {/* Style tag for custom CSS */}
      <style>{iframeStyles}</style>
      {/* Box component as a wrapper for iframe according to Chakra UI */}
      <Box id="dexscreener-embed">
        <iframe 
          src="https://dexscreener.com/polygon/0xf1E5912A784D99cDDdcDe3c76B28B05B1bb47a0e?embed=1&theme=dark" 
          title="DexScreener"
        ></iframe>
      </Box>
    </Container>
  );
};

export default Trade;
