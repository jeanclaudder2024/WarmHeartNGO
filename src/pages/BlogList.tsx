import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { formatDate } from '../utils/helpers';

const BlogList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  return (
    <Box>
      <Typography 
        variant="h3" 
        component="h1" 
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
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)'
          }
        }}
      >
        {t('blogs.title')}
      </Typography>

      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={4} key={blog.id}>
            <Card 
              className="blog-card"
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title[isRtl ? 'ar' : 'en']}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography 
                  gutterBottom 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {formatDate(blog.date, i18n.language)}
                </Typography>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h2"
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}
                >
                  {blog.title[isRtl ? 'ar' : 'en']}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {blog.excerpt[isRtl ? 'ar' : 'en']}
                </Typography>
                <Button 
                  component={RouterLink} 
                  to={`/blogs/${blog.id}`}
                  variant="outlined" 
                  color="primary"
                  sx={{ 
                    alignSelf: 'flex-start',
                    mt: 'auto',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  {t('blogs.readMore')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;