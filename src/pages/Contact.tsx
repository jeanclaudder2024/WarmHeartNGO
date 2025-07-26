import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Card,
  CardContent,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  });
  
  const [submitStatus, setSubmitStatus] = useState<{
    open: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    open: false,
    type: 'success',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/\S+@\S+\.\S+/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setSubmitStatus({
          open: true,
          type: 'success',
          message: t('contact.form.success')
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus(prev => ({
      ...prev,
      open: false
    }));
  };

  // Contact information with icons
  const contactInfo = [
    // {
    //   icon: <LocationOnIcon fontSize="large" color="primary" />,
    //   text: t('contact.info.address')
    // },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      text: t('contact.info.phone')
    },
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      text: t('contact.info.email')
    },
    {
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      text: t('contact.info.hours')
    }
  ];

  return (
    <Box>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          mb: 1, 
          textAlign: 'center'
        }}
      >
        {t('contact.title')}
      </Typography>
      
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 5, 
          textAlign: 'center',
          color: 'text.secondary',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '80px',
            height: '3px',
            bgcolor: 'primary.main',
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)'
          }
        }}
      >
        {t('contact.subtitle')}
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={2}
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
              p: { xs: 3, md: 4 },
              borderRadius: 2
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('contact.form.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  helperText={errors.name ? `${t('contact.form.name')} is required` : ''}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('contact.form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  helperText={errors.email ? 'Please enter a valid email address' : ''}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('contact.form.message')}
                  name="message"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  helperText={errors.message ? `${t('contact.form.message')} is required` : ''}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  {t('contact.form.submit')}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Contact Information */}
        <Grid item xs={12} md={5}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'white',
              boxShadow: 2
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                {t('contact.info.title')}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {contactInfo.map((info, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box 
                      sx={{ 
                        bgcolor: 'white',
                        borderRadius: '50%',
                        width: 45,
                        height: 45,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography variant="body1">
                      {info.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Map Placeholder */}
              <Box 
                sx={{ 
                  mt: 4,
                  height: '200px',
                  width: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body1">
                  Map Placeholder
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Snackbar 
        open={submitStatus.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={submitStatus.type} 
          sx={{ width: '100%' }}
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;