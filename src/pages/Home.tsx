import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Container,
  useTheme,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { galleryImages } from '../data/gallery';

// ── Scroll Reveal Hook ────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Animated Counter Hook ─────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── Reveal wrapper ────────────────────────────────────────────
const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}) => {
  const { ref, visible } = useScrollReveal();
  const translate = direction === 'up' ? 'translateY(50px)'
    : direction === 'left' ? 'translateX(-60px)'
      : direction === 'right' ? 'translateX(60px)'
        : 'none';
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Box>
  );
};

// ── Stat item ─────────────────────────────────────────────────
const StatItem = ({ value, suffix, label, started }: any) => {
  const count = useCountUp(value, 2000, started);
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 4, md: 5 } }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 800, color: '#C62828', fontSize: { xs: '2.6rem', md: '3.5rem' }, lineHeight: 1, letterSpacing: '-1px' }}
      >
        {count.toLocaleString()}{suffix}
      </Typography>
      <Box sx={{ width: 28, height: 2, bgcolor: '#C62828', mx: 'auto', my: 1.5, opacity: 0.35 }} />
      <Typography
        variant="body2"
        sx={{ color: '#777', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.7rem' }}
      >
        {label}
      </Typography>
    </Box>
  );
};

// ─────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isAr = i18n.language === 'ar';

  // Stats visibility
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const heroImage = "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const stats = isAr
    ? [
      { value: 12500, suffix: '+', label: 'عائلة مستفيدة' },
      { value: 47, suffix: '', label: 'منطقة مخدّمة' },
      { value: 320, suffix: '+', label: 'متطوع نشط' },
      { value: 98, suffix: '%', label: 'رضا المستفيدين' },
    ]
    : [
      { value: 12500, suffix: '+', label: 'Families Served' },
      { value: 47, suffix: '', label: 'Regions Covered' },
      { value: 320, suffix: '+', label: 'Active Volunteers' },
      { value: 98, suffix: '%', label: 'Beneficiary Satisfaction' },
    ];

  const programs = isAr
    ? [
      { num: '01', title: 'إعادة الإعمار', desc: 'نساعد العائلات المتضررة في إعادة بناء منازلها وتأمين ملجأ آمن.' },
      { num: '02', title: 'الدعم الصحي', desc: 'توفير الرعاية الطبية والنفسية والأدوية للمجتمعات الهشة.' },
      { num: '03', title: 'التعليم', desc: 'برامج تعليمية وتدريبية تمنح الأفراد الأدوات اللازمة لبناء مستقبل.' },
      { num: '04', title: 'الأمن الغذائي', desc: 'توزيع المواد الغذائية وسلل الطوارئ في أوقات الأزمات.' },
      { num: '05', title: 'المياه والصرف الصحي', desc: 'مشاريع حفر الآبار وترميم شبكات المياه المستدامة.' },
      { num: '06', title: 'دعم النازحين', desc: 'مساعدة النازحين في الوصول إلى حقوقهم وتلبية احتياجاتهم.' },
    ]
    : [
      { num: '01', title: 'Reconstruction', desc: 'Helping affected families rebuild their homes and find safe shelter after disasters.' },
      { num: '02', title: 'Health Support', desc: 'Providing medical and psychological care to vulnerable communities in remote areas.' },
      { num: '03', title: 'Education', desc: 'Educational programs equipping individuals with tools to build a better future.' },
      { num: '04', title: 'Food Security', desc: 'Distributing food parcels and emergency baskets to families in crisis.' },
      { num: '05', title: 'Water & Sanitation', desc: 'Well-drilling, water network restoration, and sustainable sanitation solutions.' },
      { num: '06', title: 'Displaced Support', desc: 'Assisting displaced families in accessing rights and meeting basic needs.' },
    ];

  // Use first gallery image as the mission photo (guaranteed local)
  const missionImage = galleryImages[2]?.src || galleryImages[0]?.src;

  return (
    <Box sx={{ fontFamily: '"Inter","Helvetica Neue",sans-serif', overflowX: 'hidden' }}>

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', height: { xs: '85vh', md: '95vh' }, overflow: 'hidden' }}>
        <Box
          component="img"
          src={heroImage}
          alt="Warm Heart NGO"
          sx={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            // Subtle Ken Burns on hero
            animation: 'kenBurns 20s ease-in-out infinite alternate',
            '@keyframes kenBurns': {
              from: { transform: 'scale(1)' },
              to: { transform: 'scale(1.08)' },
            },
          }}
        />
        {/* Overlay */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.35) 60%, transparent 100%)',
        }} />

        {/* Hero text */}
        <Container maxWidth="lg" sx={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', px: { xs: 3, md: 8 },
          textAlign: isAr ? 'right' : 'left',
          alignItems: isAr ? 'flex-end' : 'flex-start',
        }}>
          {/* Label */}
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 3,
            animation: 'heroFadeDown 0.9s ease both',
            '@keyframes heroFadeDown': {
              from: { opacity: 0, transform: 'translateY(-16px)' },
              to: { opacity: 1, transform: 'none' },
            },
          }}>
            <Box sx={{ width: 28, height: 2, bgcolor: '#E53935' }} />
            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.8)', letterSpacing: 4, fontWeight: 700, fontSize: '0.68rem' }}>
              {isAr ? 'منظمة إنسانية معتمدة' : 'Registered Humanitarian Organization'}
            </Typography>
          </Box>

          <Typography variant="h1" sx={{
            color: 'white', fontWeight: 800,
            fontSize: { xs: '2.6rem', sm: '3.8rem', md: '5.5rem' },
            lineHeight: 1.05, letterSpacing: '-2px',
            mb: 3, maxWidth: { xs: '100%', md: '680px' },
            animation: 'heroFadeUp 0.9s ease 0.15s both',
            '@keyframes heroFadeUp': {
              from: { opacity: 0, transform: 'translateY(24px)' },
              to: { opacity: 1, transform: 'none' },
            },
          }}>
            {t('home.welcome')}
          </Typography>

          <Typography sx={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: { xs: '1rem', md: '1.15rem' },
            maxWidth: '460px', mb: 5, lineHeight: 1.9, fontWeight: 300,
            animation: 'heroFadeUp 0.9s ease 0.3s both',
          }}>
            {t('home.intro')}
          </Typography>

          <Box sx={{
            display: 'flex', gap: 2, flexWrap: 'wrap',
            justifyContent: isAr ? 'flex-end' : 'flex-start',
            animation: 'heroFadeUp 0.9s ease 0.45s both',
          }}>
            <Button
              href="/survey" variant="contained" size="large"
              sx={{
                bgcolor: '#C62828', color: 'white',
                px: 5, py: 1.8, borderRadius: 0,
                fontSize: '0.88rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                boxShadow: 'none',
                transition: 'background 0.25s, transform 0.25s',
                '&:hover': { bgcolor: '#B71C1C', transform: 'translateY(-2px)', boxShadow: 'none' },
              }}
            >
              {isAr ? 'سجّل طلبك' : 'Register for Aid'}
            </Button>
            <Button
              href="/about" variant="outlined" size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.55)', color: 'white',
                px: 5, py: 1.8, borderRadius: 0,
                fontSize: '0.88rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                borderWidth: '1.5px',
                transition: 'all 0.25s',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-2px)' },
              }}
            >
              {isAr ? 'من نحن' : 'About Us'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── MISSION STRIP ─────────────────────────────────────── */}
      <Box sx={{ bgcolor: '#C62828', py: 3.5 }}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography sx={{
              color: 'white', fontSize: { xs: '0.95rem', md: '1.15rem' },
              fontWeight: 400, textAlign: 'center', lineHeight: 1.7,
              maxWidth: '820px', mx: 'auto', opacity: 0.95,
            }}>
              {t('home.mission')}
            </Typography>
          </Reveal>
        </Container>
      </Box>

      {/* ─── IMPACT STATS ──────────────────────────────────────── */}
      <Box ref={statsRef} sx={{ bgcolor: 'white', borderBottom: '1px solid #EBEBEB' }}>
        <Container maxWidth="lg">
          <Grid container>
            {stats.map((stat, i) => (
              <Grid item xs={6} md={3} key={i} sx={{ borderRight: i < stats.length - 1 ? '1px solid #EBEBEB' : 'none' }}>
                <Reveal delay={i * 100}>
                  <StatItem {...stat} started={statsStarted} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── MISSION SPLIT ─────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" direction={isAr ? 'row-reverse' : 'row'}>
            {/* Image */}
            <Grid item xs={12} md={5}>
              <Reveal direction={isAr ? 'right' : 'left'}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={missionImage}
                    alt="Our humanitarian work"
                    sx={{
                      width: '100%', display: 'block',
                      aspectRatio: '3/4', objectFit: 'cover',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    }}
                  />
                  {/* Floating badge */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: { xs: 20, md: 32 },
                    [isAr ? 'left' : 'right']: { xs: -16, md: -28 },
                    bgcolor: 'white',
                    p: { xs: 2, md: 3 },
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    minWidth: 120,
                    textAlign: 'center',
                  }}>
                    <Typography variant="h3" fontWeight={800} color="#C62828" lineHeight={1} sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                      40+
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, fontSize: '0.62rem' }}>
                      {isAr ? 'سنة خبرة' : 'Years Active'}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Grid>

            {/* Text */}
            <Grid item xs={12} md={7}>
              <Reveal direction={isAr ? 'left' : 'right'} delay={100}>
                <Box sx={{ pl: isAr ? 0 : { xs: 0, md: 4 }, pr: isAr ? { xs: 0, md: 4 } : 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Box sx={{ width: 36, height: 2, bgcolor: '#C62828' }} />
                    <Typography variant="overline" sx={{ letterSpacing: 4, color: '#C62828', fontWeight: 700, fontSize: '0.68rem' }}>
                      {isAr ? 'مهمتنا' : 'Our Mission'}
                    </Typography>
                  </Box>

                  <Typography variant="h3" fontWeight={800} mb={3} sx={{
                    fontSize: { xs: '2rem', md: '2.7rem' },
                    letterSpacing: '-0.5px', lineHeight: 1.2, color: '#111',
                  }}>
                    {isAr ? 'نبني الأمل،\nنعيد الحياة' : 'Building Hope,\nRestoring Lives'}
                  </Typography>

                  <Typography variant="body1" sx={{ color: '#555', lineHeight: 2, mb: 3, fontSize: '1.05rem' }}>
                    {isAr
                      ? 'منذ أكثر من أربعة عقود، يعمل القلب الدافئ على تقديم المساعدة الإنسانية للأسر المتضررة من الكوارث والنزاعات، مع التركيز على الكرامة الإنسانية والتمكين المجتمعي.'
                      : 'For over four decades, Warm Heart has worked to provide humanitarian assistance to families affected by disasters and conflicts, focusing on human dignity and community empowerment.'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#555', lineHeight: 2, mb: 5, fontSize: '1.05rem' }}>
                    {t('home.mission')}
                  </Typography>

                  <Button
                    href="/about" variant="text"
                    sx={{
                      color: '#C62828', fontWeight: 700, fontSize: '0.85rem',
                      textTransform: 'uppercase', letterSpacing: 2, p: 0,
                      '&:hover': { bgcolor: 'transparent', opacity: 0.7 },
                    }}
                    endIcon={<span>{isAr ? '←' : '→'}</span>}
                  >
                    {isAr ? 'اقرأ قصتنا' : 'Read Our Story'}
                  </Button>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── PROGRAMS ──────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Grid container sx={{ mb: 8 }} alignItems="flex-end" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Reveal>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ width: 36, height: 2, bgcolor: '#C62828' }} />
                  <Typography variant="overline" sx={{ letterSpacing: 4, color: '#C62828', fontWeight: 700, fontSize: '0.68rem' }}>
                    {isAr ? 'برامجنا' : 'Programs'}
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, letterSpacing: '-0.5px', lineHeight: 1.2, color: '#111' }}>
                  {isAr ? 'مجالات تدخّلنا' : 'Areas of Intervention'}
                </Typography>
              </Reveal>
            </Grid>
            <Grid item xs={12} md={5}>
              <Reveal delay={100}>
                <Typography variant="body2" sx={{ color: '#888', lineHeight: 1.9, mt: { xs: 2, md: 0 }, fontSize: '0.95rem' }}>
                  {isAr
                    ? 'نعمل على أكثر من محور لنضمن استجابة شاملة ومستدامة لأزمات المجتمعات الهشة.'
                    : 'We work across multiple dimensions to ensure a comprehensive, sustainable response to vulnerable community crises.'}
                </Typography>
              </Reveal>
            </Grid>
          </Grid>

          {/* List */}
          {programs.map((prog, i) => (
            <React.Fragment key={i}>
              <Reveal delay={i * 60}>
                <Box
                  sx={{
                    display: 'flex', alignItems: 'flex-start',
                    gap: { xs: 2, md: 5 }, py: { xs: 3.5, md: 4 },
                    flexDirection: isAr ? 'row-reverse' : 'row',
                    cursor: 'default',
                    '&:hover .pNum': { color: '#C62828', opacity: 1 },
                    '&:hover .pTitle': { color: '#C62828' },
                  }}
                >
                  <Typography className="pNum" sx={{
                    color: '#DDD', fontWeight: 800, fontSize: '1.3rem',
                    minWidth: 44, opacity: 0.6, transition: '0.25s', pt: 0.3,
                  }}>
                    {prog.num}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography className="pTitle" variant="h6" fontWeight={700} mb={0.75} sx={{ color: '#111', transition: '0.25s', fontSize: { xs: '1rem', md: '1.2rem' } }}>
                      {prog.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#888', lineHeight: 1.9 }}>
                      {prog.desc}
                    </Typography>
                  </Box>
                  <Box sx={{ color: '#CCC', fontSize: '1rem', pt: 0.5, display: { xs: 'none', md: 'block' } }}>
                    {isAr ? '←' : '→'}
                  </Box>
                </Box>
              </Reveal>
              {i < programs.length - 1 && <Divider sx={{ borderColor: '#F2F2F2' }} />}
            </React.Fragment>
          ))}
        </Container>
      </Box>

      {/* ─── GALLERY ───────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#F7F7F7' }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ width: 36, height: 2, bgcolor: '#C62828' }} />
              <Typography variant="overline" sx={{ letterSpacing: 4, color: '#C62828', fontWeight: 700, fontSize: '0.68rem' }}>
                {isAr ? 'لحظات من الميدان' : 'From the Field'}
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight={800} mb={7} sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, letterSpacing: '-0.5px', color: '#111' }}>
              {t('home.gallery')}
            </Typography>
          </Reveal>

          <Grid container spacing={2}>
            {galleryImages.map((image, i) => (
              <Grid item xs={12} sm={6} md={i === 0 || i === 3 ? 8 : 4} key={image.id}>
                <Reveal delay={i * 80}>
                  <Card elevation={0} sx={{
                    overflow: 'hidden', borderRadius: 0, position: 'relative',
                    height: { xs: 220, md: i === 0 || i === 3 ? 360 : 270 },
                    '&:hover img': { transform: 'scale(1.06)' },
                    '&:hover .imgCaption': { opacity: 1, transform: 'translateY(0)' },
                  }}>
                    <CardMedia
                      component="img"
                      image={image.src}
                      alt={image.alt[theme.direction === 'rtl' ? 'ar' : 'en']}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    <Box className="imgCaption" sx={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                      p: 2.5, opacity: 0,
                      transform: 'translateY(8px)', transition: 'all 0.4s ease',
                    }}>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 500, fontSize: '0.85rem' }}>
                        {image.alt[theme.direction === 'rtl' ? 'ar' : 'en']}
                      </Typography>
                    </Box>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── DARK CTA ──────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', bgcolor: '#0D0D0D', py: { xs: 12, md: 18 }, overflow: 'hidden' }}>
        {/* Red hairline top */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, bgcolor: '#C62828' }} />
        {/* Subtle red glow */}
        <Box sx={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,40,40,0.08) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
              <Box sx={{ flex: 1, height: 1, bgcolor: 'rgba(255,255,255,0.12)', maxWidth: 80 }} />
              <Typography variant="overline" sx={{ letterSpacing: 4, color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.68rem' }}>
                {isAr ? 'تحتاج مساعدة؟' : 'Need Assistance?'}
              </Typography>
              <Box sx={{ flex: 1, height: 1, bgcolor: 'rgba(255,255,255,0.12)', maxWidth: 80 }} />
            </Box>

            <Typography variant="h2" fontWeight={800} sx={{
              color: 'white',
              fontSize: { xs: '2.2rem', md: '3.8rem' },
              lineHeight: 1.1, letterSpacing: '-1px', mb: 3,
            }}>
              {isAr ? 'سجّل طلبك اليوم' : <>Register Your<br />Request Today</>}
            </Typography>

            <Typography sx={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '1rem', maxWidth: 480, mx: 'auto', mb: 6, lineHeight: 1.9, fontWeight: 300,
            }}>
              {isAr
                ? 'إذا تضررت ممتلكاتك أو منزلك، سجّل طلبك الآن وسيتواصل معك فريقنا في أقرب وقت.'
                : 'If your property or home was damaged, register now and our team will reach you as soon as possible.'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                href="/survey" variant="contained" size="large"
                sx={{
                  bgcolor: '#C62828', color: 'white', px: 6, py: 2, borderRadius: 0,
                  fontSize: '0.88rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', boxShadow: 'none',
                  transition: 'all 0.25s',
                  '&:hover': { bgcolor: '#B71C1C', transform: 'translateY(-2px)', boxShadow: 'none' },
                }}
              >
                {isAr ? 'سجّل الآن' : 'Register Now'}
              </Button>
              <Button
                href="/contact" variant="outlined" size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
                  px: 6, py: 2, borderRadius: 0,
                  fontSize: '0.88rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                  transition: 'all 0.25s',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.5)', bgcolor: 'rgba(255,255,255,0.05)', color: 'white', transform: 'translateY(-2px)' },
                }}
              >
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </Button>
            </Box>
          </Reveal>
        </Container>
      </Box>

    </Box>
  );
};

export default Home;