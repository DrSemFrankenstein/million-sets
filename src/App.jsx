import React, { useState } from 'react';
import "./App.css";
import AlternateLottoGenerator from "./components/AlternateLottoGenerator";
import LottoGenerator from "./components/LottoGenerator";
import { Box, Container, CssBaseline, Button } from "@mui/material";
import QuantumLottoGenerator from "./components/QuantumLottoGenerator";

function App() {
  const [trigger, setTrigger] = useState(0);

  const generateAllNumbers = () => {
    setTrigger(trigger + 1);
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box mt={5} textAlign="center">
          <Button variant="contained" color="primary" onClick={generateAllNumbers}>
            Generate All Numbers
          </Button>
        </Box>
        <Box mt={5}>
          <QuantumLottoGenerator trigger={trigger} />
        </Box>
        <Box mt={5}>
          <AlternateLottoGenerator trigger={trigger} />
        </Box>
        <Box mt={5}>
          <LottoGenerator trigger={trigger} />
        </Box>
      </Container>
    </>
  );
}

export default App;
