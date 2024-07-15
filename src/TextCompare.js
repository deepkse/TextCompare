import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper 
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { diffWords } from 'diff';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#ff6e40',
    },
  },
});

const TextCompare = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState([]);

  const compareTexts = () => {
    const differences = diffWords(text1, text2);
    setDiff(differences);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #0077be, #00008b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center" marginBottom={5}>
              Text Compare
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Text 1"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Text 2"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CompareArrowsIcon />}
                onClick={compareTexts}
              >
                Compare
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Differences:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 1, bgcolor: '#f5f5f5' }}>
              {diff.map((part, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: part.added ? '#a5d6a7' : part.removed ? '#ef9a9a' : 'transparent',
                  }}
                >
                  {part.value}
                </span>
              ))}
            </Paper>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TextCompare;