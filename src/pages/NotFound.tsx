import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '8rem', fontWeight: 700, color: 'primary.main' }}>
        404
      </Typography>
      
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        {t('nav.home')}
      </Button>
    </Box>
  );
};

export default NotFound;