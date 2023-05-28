import { Box, CircularProgress } from '@mui/material';

const ProgressBar = () => {
  return (
    <Box
      sx={{
        fontSize: 60,
        color: 'rgb(207, 108, 108)',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '10px 0',
        gap: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ color: '#c87084' }} />
    </Box>
  );
};

export default ProgressBar;
