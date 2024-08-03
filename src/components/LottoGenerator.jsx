import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const generateLottoNumbers = () => {
  const mainNumbers = [];
  while (mainNumbers.length < 6) {
    const num = Math.floor(Math.random() * 37) + 1;
    if (!mainNumbers.includes(num)) {
      mainNumbers.push(num);
    }
  }
  mainNumbers.sort((a, b) => a - b);
  const additionalNumber = Math.floor(Math.random() * 7) + 1;
  return { mainNumbers, additionalNumber };
};

const LottoGenerator = ({ trigger }) => {
  const [lottoNumbers, setLottoNumbers] = useState({ mainNumbers: [], additionalNumber: null });

  const handleGenerate = () => {
    const numbers = generateLottoNumbers();
    setLottoNumbers(numbers);
  };

  useEffect(() => {
    handleGenerate();
  }, [trigger]);

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Lotto Number Generator
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generate Lotto Numbers
        </Button>
        <Box mt={3}>
          <Typography variant="h6">Main Numbers: {lottoNumbers.mainNumbers.join(', ')}</Typography>
          <Typography variant="h6">Additional Number: {lottoNumbers.additionalNumber}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LottoGenerator;
