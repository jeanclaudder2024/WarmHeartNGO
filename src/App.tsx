import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import "leaflet/dist/leaflet.css";

// Components
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoginForm from "./pages/Login";
import DamageAssessmentForm from "./pages/DamageAssessmentForm";
import Dashboard from "./pages/Dashboard";
// Theme
import { getTheme } from "./theme";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create ltr cache
const cacheLtr = createCache({
  key: "mui",
});

function App() {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<"ltr" | "rtl">(
    i18n.language === "ar" ? "rtl" : "ltr"
  );
  const theme = getTheme(direction);

  useEffect(() => {
    setDirection(i18n.language === "ar" ? "rtl" : "ltr");
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/survey" element={<DamageAssessmentForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>

      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
