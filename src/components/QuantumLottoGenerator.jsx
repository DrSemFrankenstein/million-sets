import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateQuantumLottoNumbers = async (retries = 5, delayTime = 1000) => {
  while (retries > 0) {
    try {
      const response = await axios.get('https://qrng.anu.edu.au/API/jsonI.php?length=7&type=uint8');
      if (response.status === 200) {
        const numbers = response.data.data;
        
        const mainNumbers = [];
        while (mainNumbers.length < 6) {
          const num = (numbers.pop() % 37) + 1;
          if (!mainNumbers.includes(num)) {
            mainNumbers.push(num);
          }
        }
        mainNumbers.sort((a, b) => a - b);
        const additionalNumber = (numbers.pop() % 7) + 1;
        return { mainNumbers, additionalNumber };
      } else {
        console.error(`Error fetching quantum random numbers: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching quantum random numbers:', error);
    }
    retries--;
    await delay(delayTime);  // Wait for the specified delay time before retrying
  }
  return { mainNumbers: [], additionalNumber: null };
};

const QuantumLottoGenerator = ({ trigger }) => {
  const [lottoNumbers, setLottoNumbers] = useState({ mainNumbers: [], additionalNumber: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGenerate();
  }, [trigger]);

  const handleGenerate = async () => {
    setLoading(true);
    const numbers = await generateQuantumLottoNumbers();
    setLottoNumbers(numbers);
    setLoading(false);
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Quantum Lotto Number Generator
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Numbers'}
        </Button>
        <Box mt={3}>
          <Typography variant="h6">Main Numbers: {lottoNumbers.mainNumbers.join(', ')}</Typography>
          <Typography variant="h6">Additional Number: {lottoNumbers.additionalNumber}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default QuantumLottoGenerator;
