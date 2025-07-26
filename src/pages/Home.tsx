import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardMedia,
  Container, 
  Paper,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { galleryImages } from '../data/gallery';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Hero image
  const heroImage = "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '80vh' },
          width: '100%',
          overflow: 'hidden',
          mb: 6,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt="Warm Heart NGO"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            {t('home.welcome')}
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              color: 'white',
              maxWidth: '800px',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {t('home.intro')}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 4
              }
            }}
            href="/survey"
          >
            {t('home.survey')}
          </Button>
        </Box>
      </Box>

      {/* Mission Statement */}
      <Box sx={{ mb: 6 }}>
        <Paper
          elevation={1}
          sx={{
            p: { xs: 3, md: 5 },
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'background.paper',
            maxWidth: '900px',
            mx: 'auto',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '8px',
              bgcolor: 'primary.main'
            }
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            {t('app.name')}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.2rem', 
              lineHeight: 1.6,
              mb: 2
            }}
          >
            {t('home.mission')}
          </Typography>
        </Paper>
      </Box>

      {/* Gallery Section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '80px',
              height: '3px',
              bgcolor: 'secondary.main',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)'
            }
          }}
        >
          {t('home.gallery')}
        </Typography>
        
        <Grid container spacing={3}>
          {galleryImages.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card 
                sx={{ 
                  height: '470px', 
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: 2
                }}
              >
                <CardMedia
                  component="img"
                  image={image.src}
                  alt={image.alt[theme.direction === 'rtl' ? 'ar' : 'en']}
                  className="gallery-image"
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'center',
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Survey CTA */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          py: 5,
          px: 3,
          borderRadius: 2,
          boxShadow: 2,
          textAlign: 'center',
          color: 'white',
          mb: 4
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          {t('home.survey')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
          {t('home.surveyPrompt')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            bgcolor: 'white',
            color: 'secondary.main',
            '&:hover': {
              bgcolor: 'grey.100',
            },
            px: 4,
            py: 1.5,
            fontWeight: 600
          }}
        >
          {t('home.survey')}
        </Button>
      </Box>
    </>
  );
};

export default Home;