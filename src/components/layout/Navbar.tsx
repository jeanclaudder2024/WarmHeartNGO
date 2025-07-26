import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Heart } from 'lucide-react';
import logo from "../../assets/LOGO.jpg"

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  const pages = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    // { name: t('nav.blogs'), path: '/blogs' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        {/* <Heart color="#E53935" size={24} /> */}
        <img src={logo} alt="Warm Heart Logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
          {t('app.name')}
        </Typography>
      </Box>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.path} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={page.path}
              sx={{ 
                textAlign: 'center',
                bgcolor: location.pathname === page.path ? 'rgba(229, 57, 53, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(229, 57, 53, 0.05)',
                }
              }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLanguageMenuOpen} sx={{ textAlign: 'center' }}>
            <ListItemText primary={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
              {i18n.language === 'ar' ? t('language.ar') : t('language.en')}
            </Box>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo for desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              {/* <Heart color="#E53935" size={24} /> */}
              <img src={logo} alt="Warm Heart Logo" style={{ width: 70, height: 70, borderRadius: '50%' }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  ml: 1,
                  mr: 2,
                  fontWeight: 700,
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
              >
                {t('app.name')}
              </Typography>
            </Box>

            {/* Mobile menu icon */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ color: 'primary.main' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo for mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center' }}>
              {/* <Heart color="#E53935" size={24} /> */}
              <img src={logo} alt="Warm Heart Logo" style={{ width: 50, height: 50, borderRadius: '50%' }} /> 
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
              >
                {t('app.name')}
              </Typography>
            </Box>

            {/* Desktop navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={RouterLink}
                  to={page.path}
                  sx={{ 
                    mx: 1, 
                    color: 'text.primary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: location.pathname === page.path ? '100%' : '0%',
                      height: '2px',
                      bgcolor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Language selector */}
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLanguageMenuOpen}
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                }}
                startIcon={<LanguageIcon />}
              >
                {i18n.language === 'ar' ? t('language.ar') : t('language.en')}
              </Button>
              <Menu
                anchorEl={languageMenu}
                open={Boolean(languageMenu)}
                onClose={handleLanguageMenuClose}
                sx={{ mt: 1 }}
              >
                <MenuItem onClick={() => changeLanguage('en')} selected={i18n.language === 'en'}>
                  English
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('ar')} selected={i18n.language === 'ar'}>
                  العربية
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Language menu for mobile */}
      <Menu
        anchorEl={languageMenu}
        open={Boolean(languageMenu)}
        onClose={handleLanguageMenuClose}
      >
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('ar')}>العربية</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;