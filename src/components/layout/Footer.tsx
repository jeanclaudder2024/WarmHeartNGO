import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: "grey.100", pt: 6, pb: 3, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Heart color="#E53935" size={24} />
              <Typography
                variant="h6"
                sx={{ ml: 1, fontWeight: 700, color: "primary.main" }}
              >
                {t("app.name")}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t("app.slogan")}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                aria-label="facebook"
                size="small"
                color="primary"
                href="https://www.facebook.com/WarmHeartLB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </IconButton>
              {/* <IconButton aria-label="twitter" size="small" color="primary">
                <Twitter />
              </IconButton> */}
              <IconButton aria-label="instagram" size="small" color="primary"   href="https://www.instagram.com/warmheartlb/"
                target="_blank"
                rel="noopener noreferrer">
                <Instagram />
              </IconButton>
              {/* <IconButton aria-label="linkedin" size="small" color="primary">
                <LinkedIn />
              </IconButton> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              {t("nav.home")}
            </Typography>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{
                display: "block",
                mb: 1,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("nav.home")}
            </Link>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              sx={{
                display: "block",
                mb: 1,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("nav.about")}
            </Link>
            {/* <Link
              component={RouterLink}
              to="/blogs"
              color="inherit"
              sx={{
                display: "block",
                mb: 1,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("nav.blogs")}
            </Link> */}
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              sx={{
                display: "block",
                mb: 1,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("nav.contact")}
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              {t("contact.info.title")}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('contact.info.address')}
            </Typography> */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t("contact.info.phone")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t("contact.info.email")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("contact.info.hours")}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} {t("app.name")}. {t("app.slogan")}.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
