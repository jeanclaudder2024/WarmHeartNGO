import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { blogs } from '../data/blogs';
import { formatDate } from '../utils/helpers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  
  const blog = blogs.find(b => b.id === Number(id));
  
  if (!blog) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog not found
        </Typography>
        <Button 
          component={RouterLink} 
          to="/blogs" 
          variant="contained" 
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          {t('blogs.backToList')}
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/blogs"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 4 }}
      >
        {t('blogs.backToList')}
      </Button>

      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Box 
          component="img"
          src={blog.image}
          alt={blog.title[isRtl ? 'ar' : 'en']}
          sx={{ 
            width: '100%',
            height: { xs: '200px', md: '400px' },
            objectFit: 'cover'
          }}
        />
        
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography 
            variant="body1" 
            color="primary.main"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            {formatDate(blog.date, i18n.language)}
          </Typography>
          
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 4,
              fontWeight: 700,
              lineHeight: 1.3
            }}
          >
            {blog.title[isRtl ? 'ar' : 'en']}
          </Typography>
          
          <Divider sx={{ mb: 4 }} />
          
          {blog.content[isRtl ? 'ar' : 'en'].split('\n\n').map((paragraph, idx) => (
            <Typography 
              key={idx} 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 3,
                lineHeight: 1.8,
                fontSize: '1.1rem'
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogDetail;