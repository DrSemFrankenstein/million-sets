import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateAlternateLottoNumbers = () => {
  const numbers = Array.from({ length: 37 }, (_, i) => i + 1);
  const shuffledNumbers = shuffleArray(numbers);
  const mainNumbers = shuffledNumbers.slice(0, 6).sort((a, b) => a - b);
  const additionalNumber = Math.floor(Math.random() * 7) + 1;
  return { mainNumbers, additionalNumber };
};

const AlternateLottoGenerator = ({ trigger }) => {
  const [lottoNumbers, setLottoNumbers] = useState({ mainNumbers: [], additionalNumber: null });

  const handleGenerate = () => {
    const numbers = generateAlternateLottoNumbers();
    setLottoNumbers(numbers);
  };

  useEffect(() => {
    handleGenerate();
  }, [trigger]);

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Alternate Lotto Number Generator
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generate Alternate Numbers
        </Button>
        <Box mt={3}>
          <Typography variant="h6">Main Numbers: {lottoNumbers.mainNumbers.join(', ')}</Typography>
          <Typography variant="h6">Additional Number: {lottoNumbers.additionalNumber}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AlternateLottoGenerator;
