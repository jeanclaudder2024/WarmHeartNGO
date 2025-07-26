import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Container,
  Card,
  CardContent,
  Avatar,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShieldIcon from '@mui/icons-material/Shield';
import PeopleIcon from '@mui/icons-material/People';
import HandshakeIcon from '@mui/icons-material/Handshake';

const About: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // About header image
  const aboutHeaderImage = "https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // Values with icons
  const values = [
    {
      key: 'compassion',
      icon: <FavoriteIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      key: 'integrity',
      icon: <ShieldIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      key: 'inclusion',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      key: 'commitment',
      icon: <HandshakeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    }
  ];

  return (
    <Box>
      {/* Header */}
      <Box 
        sx={{
          position: 'relative',
          height: { xs: '200px', md: '300px' },
          width: '100%',
          overflow: 'hidden',
          mb: 6,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Box
          component="img"
          src={aboutHeaderImage}
          alt={t('about.title')}
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
            bgcolor: 'rgba(0, 0, 0, 0.6)',
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
            {t('about.title')}
          </Typography>
          <Typography 
            variant="h6"
            sx={{ 
              color: 'white',
              maxWidth: '800px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {t('about.subtitle')}
          </Typography>
        </Box>
      </Box>

      {/* Mission and Vision */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 4,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '8px',
                height: '100%',
                bgcolor: 'primary.main'
              }
            }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              {t('about.mission')}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
              {t('about.missionText')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 4,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '8px',
                height: '100%',
                bgcolor: 'secondary.main'
              }
            }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 3, color: 'secondary.main', fontWeight: 600 }}>
              {t('about.vision')}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
              {t('about.visionText')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Values */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 5, 
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '80px',
              height: '3px',
              bgcolor: 'primary.main',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)'
            }
          }}
        >
          {t('about.values')}
        </Typography>

        <Grid container spacing={3}>
          {values.map((value) => (
            <Grid item xs={12} sm={6} md={3} key={value.key}>
              <Card 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  boxShadow: 2,
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 70, 
                      height: 70, 
                      bgcolor: 'primary.light',
                      boxShadow: 1
                    }}
                  >
                    {value.icon}
                  </Avatar>
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    {t(`about.valuesList.${value.key}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`about.valuesList.${value.key}Text`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* History */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          mb: 4,
          bgcolor: 'grey.50'
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
          {t('about.history')}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
          {t('about.historyText')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;