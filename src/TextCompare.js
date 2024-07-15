import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Grid
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { diffLines } from 'diff';

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
  const [stats1, setStats1] = useState({ chars: 0, words: 0, lines: 0 });
  const [stats2, setStats2] = useState({ chars: 0, words: 0, lines: 0 });

  useEffect(() => {
    updateStats(text1, setStats1);
  }, [text1]);

  useEffect(() => {
    updateStats(text2, setStats2);
  }, [text2]);

  const updateStats = (text, setStats) => {
    const chars = text.length;
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const lines = text.split('\n').length;
    setStats({ chars, words, lines });
  };

  const compareTexts = () => {
    const differences = diffLines(text1, text2);
    setDiff(differences);
  };

  const renderDiff = () => {
    let lineNumber = 1;
    return diff.map((part, index) => (
      <Box key={index} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '30px', color: '#888', borderRight: '1px solid #ddd', marginRight: '10px', flexShrink: 0 }}>
          {part.value.split('\n').map((_, i) => (
            <div key={i}>{lineNumber++}</div>
          ))}
        </Box>
        <pre
          style={{
            backgroundColor: part.added ? '#e6ffed' : part.removed ? '#ffeef0' : 'transparent',
            margin: 0,
            padding: '0 5px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            width: '100%'
          }}
        >
          {part.value}
        </pre>
      </Box>
    ));
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
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center" marginBottom={5}>
              Text Compare
            </Typography>
            <Grid container spacing={2}>
              {[
                { text: text1, setText: setText1, stats: stats1 },
                { text: text2, setText: setText2, stats: stats2 }
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    variant="outlined"
                    label={`Text ${index + 1}`}
                    value={item.text}
                    onChange={(e) => item.setText(e.target.value)}
                    InputProps={{
                      style: { fontFamily: 'monospace' }
                    }}
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    Characters: {item.stats.chars}, Words: {item.stats.words}, Lines: {item.stats.lines}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
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
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                borderRadius: 1, 
                bgcolor: '#f5f5f5', 
                maxHeight: '400px', 
                overflow: 'auto' 
              }}
            >
              {renderDiff()}
            </Paper>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TextCompare;