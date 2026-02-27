import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  FormGroup,
  Alert,
  LinearProgress,
  Container,
  Fade,
  Slide,
  Zoom,
  Collapse,
  StepConnector,
  stepConnectorClasses,
  StepIcon,
  styled,
  Chip,
  MenuItem
} from '@mui/material';
import {
  Person,
  Home,
  LocationOn,
  AttachFile,
  Assignment,
  Send,
  Check,
  CheckCircle,
  Poll
} from '@mui/icons-material';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import { submitFormData } from '../data/api';
import { useNavigate } from 'react-router-dom';

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// Custom Animated Stepper Components
const AnimatedStepConnector = styled(StepConnector)(({ theme }) => ({
  // Force the connector to always be visible
  display: 'block !important',
  visibility: 'visible !important',
  opacity: '1 !important',

  // Alternative label positioning
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: 'calc(-50% + 22px)',
    right: 'calc(50% + 22px)',
    position: 'absolute',
    zIndex: 0,
  },

  // Default line styling - always visible
  [`& .${stepConnectorClasses.line}`]: {
    height: '3px !important',
    border: '0 !important',
    backgroundColor: '#bdbdbd !important',
    borderRadius: '2px !important',
    transition: 'all 0.5s ease-in-out',
    display: 'block !important',
    visibility: 'visible !important',
    opacity: '1 !important',
    width: '100% !important',
    position: 'relative',
  },

  // Active step connector
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(90deg, #E53935 0%, #FF8A65 100%) !important',
      animation: 'progressLine 0.8s ease-in-out',
      height: '6px !important',
      boxShadow: '0 2px 10px rgba(229, 57, 53, 0.4)',
    },
  },

  // Completed step connector
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(90deg, #4CAF50 0%, #81C784 100%) !important',
      boxShadow: '0 2px 10px rgba(76, 175, 80, 0.4)',
      height: '6px !important',
    },
  },

  '@keyframes progressLine': {
    '0%': { transform: 'scaleX(0)', transformOrigin: 'right' },
    '100%': { transform: 'scaleX(1)', transformOrigin: 'right' },
  },
}));

const AnimatedStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed ? '#4CAF50' : ownerState.active ? '#E53935' : 'rgba(255,255,255,0.7)',
  zIndex: 1,
  color: ownerState.active || ownerState.completed ? '#fff' : '#757575',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: ownerState.active ? 'scale(1.2)' : 'scale(1)',
  backdropFilter: 'blur(4px)',
  boxShadow: ownerState.active
    ? '0 8px 25px rgba(229, 57, 53, 0.5)'
    : ownerState.completed
      ? '0 8px 25px rgba(76, 175, 80, 0.5)'
      : '0 4px 10px rgba(0,0,0,0.08)',
  animation: ownerState.completed ? 'bounce 0.6s ease-in-out' : 'none',
  border: ownerState.active ? '4px solid #fff' : '2px solid rgba(229, 57, 53, 0.2)',
  fontSize: '1.2rem',
  '& .MuiSvgIcon-root': {
    fontSize: '1.4rem',
  },
  '@keyframes bounce': {
    '0%, 20%, 53%, 80%, 100%': {
      transform: ownerState.active ? 'scale(1.1)' : 'scale(1)',
    },
    '40%, 43%': {
      transform: 'scale(1.2)',
    },
    '70%': {
      transform: 'scale(1.1)',
    },
    '90%': {
      transform: 'scale(1.05)',
    },
  },
}));

function AnimatedStepIcon(props: any) {
  const { active, completed, className, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Person />,
    2: <Home />,
    3: <LocationOn />,
    4: <Assignment />,
  };

  return (
    <AnimatedStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckCircle /> : icons[String(icon)]}
    </AnimatedStepIconRoot>
  );
}

const theme = createTheme({
  palette: {
    primary: { main: '#E53935', light: '#ff6f60', dark: '#ab000d' },
    secondary: { main: '#4CAF50', light: '#80e27e', dark: '#087f23' },
    background: { default: 'transparent', paper: 'rgba(255, 255, 255, 0.85)' }
  },
  direction: 'rtl',
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Arial", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 600, letterSpacing: '0px' }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          borderRadius: 20,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 16,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease-in-out',
            fieldset: {
              borderColor: 'rgba(0, 0, 0, 0.1)',
              transition: 'border-color 0.3s ease-in-out',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(229, 57, 53, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E53935',
              borderWidth: '2px',
            },
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 14px 0 rgba(229, 57, 53, 0.39)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(229, 57, 53, 0.23)',
          }
        },
      }
    }
  }
});

const steps = [
  'المعلومات الشخصية',
  'تفاصيل الأضرار',
  'الموقع والملفات',
  'المراجعة والإرسال'
];

const DamageAssessmentForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<any>({
    fullName: '',
    phoneNumber: '',
    nationalId: '',
    birthPlace: '',
    birthDate: '',
    registryNumber: '',
    motherName: '',
    email: '',
    currentAddress: '',
    idAddress: '',
    currentCountry: '',
    currentJob: '',
    housingType: '',
    preferredContact: '',
    chronicDisease: false,
    warInjury: false,
    refugee: false,
    refugeeRegistrationNo: '',
    refugeeFileNo: '',
    refugeeRegDate: '',
    familyMembers: 0,
    disabledMembers: false,
    consentDataSharing: false,
    consentCall: false,
    declarationSigned: false,
    declarationName: '',
    declarationDate: '',
    declarationSignature: '',
    damage: {
      damageValue: '',
      otherPropertyDamaged: false,
      otherPropertyDetails: ''
    },
    documentedByOfficial: false,
    officialDocumentationEntity: '',
    notes: '',
    files: []
  });

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const navigate = useNavigate();

  // Removed authentication check - survey should be publicly accessible
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login"); // redirect to login if no token
  //   }
  // }, []);

  useEffect(() => {
    if (activeStep === 2 && mapContainerRef.current && !mapRef.current) {
      console.log('Initializing map...');

      // Add a small delay to ensure the container is fully rendered
      setTimeout(() => {
        try {
          const map = L.map(mapContainerRef.current, {
            center: [35.5, 38.5],
            zoom: 7,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19
          }).addTo(map);

          map.on('click', (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;
            if (markerRef.current) {
              markerRef.current.setLatLng(e.latlng);
            } else {
              markerRef.current = L.marker(e.latlng).addTo(map);
            }
            setFormData((prev: any) => ({
              ...prev,
              damage: {
                ...prev.damage,
                coordinates: `${lat.toFixed(6)},${lng.toFixed(6)}`
              }
            }));
          });

          mapRef.current = map;
          console.log('Map initialized successfully');

          // Force map to resize after initialization
          setTimeout(() => {
            map.invalidateSize();
          }, 100);

        } catch (error) {
          console.error('Error initializing map:', error);
        }
      }, 100);
    }

    // Cleanup function
    return () => {
      if (mapRef.current && activeStep !== 2) {
        console.log('Cleaning up map...');
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [activeStep]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, activeStep]));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(formData.fullName && formData.phoneNumber && formData.nationalId);
      case 1:
        return !!(formData.damage.propertyType && formData.damage.governorate &&
          formData.damage.city && formData.damage.description);
      case 2:
        return !!formData.damage?.coordinates;
      case 3:
        return isConfirmed;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!isConfirmed) {
      alert("يجب الموافقة على الإقرار أولاً.");
      return;
    }

    // Validate all required fields before submission
    const missingFields = [];

    // Check personal info
    if (!formData.fullName) missingFields.push("الاسم الكامل");
    if (!formData.phoneNumber) missingFields.push("رقم الهاتف");
    if (!formData.nationalId) missingFields.push("الرقم الوطني");

    // Check damage details
    if (!formData.damage?.propertyType) missingFields.push("نوع الممتلكات");
    if (!formData.damage?.governorate) missingFields.push("المحافظة");
    if (!formData.damage?.city) missingFields.push("المدينة");
    if (!formData.damage?.description) missingFields.push("وصف الأضرار");

    // Check coordinates
    if (!formData.damage?.coordinates) missingFields.push("الموقع على الخريطة (يجب النقر على الخريطة لتحديد الموقع)");

    if (missingFields.length > 0) {
      alert(`❌ يرجى ملء الحقول المطلوبة التالية:\n\n${missingFields.join('\n• ')}`);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        damages: [formData.damage]
      };

      // Remove the top-level coordinates since it should only be in the damage object
      delete payload.coordinates;
      delete payload.damage; // Remove the single damage object since we're using damages array

      console.log('البيانات المرسلة:', payload);
      const result = await submitFormData(payload);

      // Generate a mock reference number if the backend doesn't provide one
      const refNum = result?.data?.referenceNumber || `WH-${Math.floor(Math.random() * 1000000)}`;
      setSubmissionRef(refNum);
      setSubmissionSuccess(true);
      console.log('نتيجة الإرسال:', result);
    } catch (error: any) {
      console.error('خطأ في الإرسال:', error);

      // More specific error messages
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.error || error.response.data?.message || 'خطأ من الخادم';
        alert(`❌ خطأ من الخادم (${status}): ${message}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('❌ لا يمكن الاتصال بالخادم. يرجى التأكد من تشغيل الخادم والمحاولة مرة أخرى.');
      } else {
        // Something else happened
        alert(`❌ حدث خطأ أثناء الإرسال: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submissionSuccess) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          minHeight: '100vh',
          py: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `
            radial-gradient(circle at 15% 50%, rgba(76, 175, 80, 0.08), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(129, 199, 132, 0.12), transparent 25%),
            linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)
          `,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#4CAF50\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            zIndex: 0,
            opacity: 0.6
          }
        }} dir="rtl">
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Card elevation={0} sx={{
              borderRadius: 4,
              textAlign: 'center',
              p: 6,
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 10px 40px rgba(76, 175, 80, 0.15)'
            }}>
              <Box sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(76, 175, 80, 0.1)',
                mb: 3,
                animation: 'bounce 2s infinite ease-in-out'
              }}>
                <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
              </Box>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: 'success.dark', textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                تم إرسال النموذج بنجاح!
              </Typography>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 4, lineHeight: 1.8, maxWidth: '80%', mx: 'auto' }}>
                شكراً لكم على تعبئة الاستمارة. تم تسجيل بياناتكم بنجاح، وقد تم تخصيص رقم تعريفي لكم:
                <Box sx={{
                  mt: 3, mb: 3, p: 2,
                  bgcolor: 'rgba(76, 175, 80, 0.05)',
                  border: '2px dashed rgba(76, 175, 80, 0.4)',
                  borderRadius: 3,
                  display: 'inline-block',
                  width: '100%'
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main', letterSpacing: '2px' }}>
                    {submissionRef}
                  </Typography>
                </Box>
                يرجى الاحتفاظ بهذا الرقم لمراجعة استجاباتكم في المستقبل.
              </Typography>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => window.location.reload()}
                sx={{
                  px: 6, py: 1.5,
                  fontSize: '1.2rem',
                  borderRadius: 12,
                  boxShadow: '0 4px 14px 0 rgba(76, 175, 80, 0.39)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.23)'
                  }
                }}
              >
                إرسال نموذج جديد
              </Button>
            </Card>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  const renderPersonalInfo = () => (
    <Slide direction="right" in={activeStep === 0} mountOnEnter unmountOnExit timeout={500}>
      <Card
        elevation={0}
        sx={{
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }
        }}
      >
        <CardHeader
          avatar={
            <Box sx={{
              bgcolor: 'primary.main',
              borderRadius: '50%',
              p: 1,
              animation: 'pulse 2s infinite'
            }}>
              <Person sx={{ color: 'white' }} />
            </Box>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              المعلومات الشخصية
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              يرجى ملء جميع البيانات المطلوبة بدقة
            </Typography>
          }
          action={
            completedSteps.has(0) && (
              <Zoom in={true}>
                <Chip
                  icon={<Check />}
                  label="مكتمل"
                  color="success"
                  size="small"
                  sx={{ animation: 'fadeIn 0.5s ease-in-out' }}
                />
              </Zoom>
            )
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={600}>
                <TextField
                  label="الاسم الكامل"
                  fullWidth
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  variant="outlined"
                />
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={700}>
                <TextField
                  label="رقم الهاتف"
                  fullWidth
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  variant="outlined"
                />
              </Fade>
            </Grid>
            {/* Continue with other fields with similar animations... */}
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800}>
                <TextField
                  label="الرقم الوطني"
                  fullWidth
                  required
                  value={formData.nationalId}
                  onChange={(e) => handleChange("nationalId", e.target.value)}
                  variant="outlined"
                />
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="مكان الولادة"
                fullWidth
                value={formData.birthPlace}
                onChange={(e) => handleChange("birthPlace", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="تاريخ الميلاد"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="رقم السجل"
                fullWidth
                value={formData.registryNumber}
                onChange={(e) => handleChange("registryNumber", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="اسم الأم"
                fullWidth
                value={formData.motherName}
                onChange={(e) => handleChange("motherName", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="البريد الإلكتروني"
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="العنوان الحالي"
                fullWidth
                multiline
                rows={2}
                value={formData.currentAddress}
                onChange={(e) => handleChange("currentAddress", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="الدولة الحالية"
                fullWidth
                value={formData.currentCountry}
                onChange={(e) => handleChange("currentCountry", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="الوظيفة"
                fullWidth
                value={formData.currentJob}
                onChange={(e) => handleChange("currentJob", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="العنوان المذكور على البطاقة الشخصية"
                fullWidth
                multiline
                rows={2}
                value={formData.idAddress}
                onChange={(e) => handleChange("idAddress", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="نوع السكن الحالي"
                fullWidth
                value={formData.housingType}
                onChange={(e) => handleChange("housingType", e.target.value)}
                variant="outlined"
              >
                <MenuItem value="ملك">ملك</MenuItem>
                <MenuItem value="إيجار">إيجار</MenuItem>
                <MenuItem value="مأوى مؤقت">مأوى مؤقت</MenuItem>
                <MenuItem value="مع أقارب">مع أقارب</MenuItem>
                <MenuItem value="مخيم">مخيم</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="وسيلة التواصل المفضلة"
                fullWidth
                value={formData.preferredContact}
                onChange={(e) => handleChange("preferredContact", e.target.value)}
                variant="outlined"
              >
                <MenuItem value="هاتف">هاتف</MenuItem>
                <MenuItem value="واتساب">واتساب</MenuItem>
                <MenuItem value="بريد إلكتروني">بريد إلكتروني</MenuItem>
                <MenuItem value="أخرى">أخرى</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="عدد أفراد العائلة المقيمين معك"
                type="number"
                fullWidth
                value={formData.familyMembers}
                onChange={(e) => handleChange("familyMembers", parseInt(e.target.value) || 0)}
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>الحالة الصحية والاجتماعية</Typography>
          <FormGroup>
            <Grid container spacing={2}>
              {[
                { label: "أمراض مزمنة", key: "chronicDisease" },
                { label: "إصابة حرب", key: "warInjury" },
                { label: "لاجئ", key: "refugee" },
                { label: "يوجد أفراد من ذوي الاحتياجات الخاصة", key: "disabledMembers" },
              ].map(({ label, key }) => (
                <Grid item xs={12} md={6} key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData[key]}
                        onChange={(e) => handleChange(key, e.target.checked)}
                        color="primary"
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>

          <Collapse in={formData.refugee} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 3, p: 3, bgcolor: 'rgba(25, 118, 210, 0.04)', borderRadius: 2, border: '1px solid rgba(25, 118, 210, 0.1)' }}>
              <Typography variant="h6" color="primary" gutterBottom>معلومات اللجوء</Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="رقم التسجيل (UNHCR)"
                    fullWidth
                    value={formData.refugeeRegistrationNo}
                    onChange={(e) => handleChange("refugeeRegistrationNo", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="رقم الملف"
                    fullWidth
                    value={formData.refugeeFileNo}
                    onChange={(e) => handleChange("refugeeFileNo", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="تاريخ التسجيل"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={formData.refugeeRegDate}
                    onChange={(e) => handleChange("refugeeRegDate", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Slide>
  );

  const renderDamageDetails = () => (
    <Slide direction="left" in={activeStep === 1} mountOnEnter unmountOnExit timeout={500}>
      <Card
        elevation={0}
        sx={{
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }
        }}
      >
        <CardHeader
          avatar={
            <Box sx={{
              bgcolor: 'primary.main',
              borderRadius: '50%',
              p: 1,
              animation: 'pulse 2s infinite'
            }}>
              <Home sx={{ color: 'white' }} />
            </Box>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              تفاصيل الأضرار
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              وصف دقيق للأضرار التي لحقت بالممتلكات
            </Typography>
          }
          action={
            completedSteps.has(1) && (
              <Zoom in={true}>
                <Chip
                  icon={<Check />}
                  label="مكتمل"
                  color="success"
                  size="small"
                  sx={{ animation: 'fadeIn 0.5s ease-in-out' }}
                />
              </Zoom>
            )
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="نوع العقار"
                fullWidth
                required
                value={formData.damage.propertyType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    damage: { ...formData.damage, propertyType: e.target.value },
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="المحافظة"
                fullWidth
                required
                value={formData.damage.governorate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    damage: { ...formData.damage, governorate: e.target.value },
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="المدينة"
                fullWidth
                required
                value={formData.damage.city || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    damage: { ...formData.damage, city: e.target.value },
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="العنوان التفصيلي"
                fullWidth
                value={formData.damage.address || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    damage: { ...formData.damage, address: e.target.value },
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="وصف الأضرار"
                fullWidth
                multiline
                rows={4}
                required
                value={formData.damage.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    damage: { ...formData.damage, description: e.target.value },
                  })
                }
                variant="outlined"
                placeholder="يرجى وصف الأضرار بالتفصيل..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="تقدير تقريبي لقيمة الضرر (بالليرة أو الدولار)"
                fullWidth
                value={formData.damage?.damageValue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    damage: { ...formData.damage, damageValue: e.target.value },
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.damage?.otherPropertyDamaged || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        damage: { ...formData.damage, otherPropertyDamaged: e.target.checked },
                      })
                    }
                    color="primary"
                  />
                }
                label="هل تضررت ممتلكات أخرى غير العقار؟ (سيارة، محل تجاري، أرض زراعية... إلخ)"
              />
            </Grid>
            <Collapse in={formData.damage?.otherPropertyDamaged} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
              <Grid item xs={12} sx={{ mt: 2, px: 3 }}>
                <TextField
                  label="تفاصيل الممتلكات الأخرى المتضررة"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.damage?.otherPropertyDetails || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      damage: { ...formData.damage, otherPropertyDetails: e.target.value },
                    })
                  }
                  variant="outlined"
                />
              </Grid>
            </Collapse>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>نوع الأضرار</Typography>
          <FormGroup>
            <Grid container spacing={2}>
              {[
                ["دمار كامل للمبنى", "damageFullBuilding"],
                ["دمار جزئي", "damagePartial"],
                ["ضرر بالبنية التحتية", "damageInfra"],
                ["حريق", "damageFire"],
                ["سرقة", "damageTheft"],
                ["تلف مائي", "damageWater"],
              ].map(([label, key]) => (
                <Grid item xs={12} md={6} key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.damage[key] || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            damage: { ...formData.damage, [key]: e.target.checked },
                          })
                        }
                        color="primary"
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>

          <Box mt={3}>
            <TextField
              label="أضرار أخرى (يرجى التفصيل)"
              fullWidth
              multiline
              rows={2}
              value={formData.damage.damageOther || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  damage: { ...formData.damage, damageOther: e.target.value },
                })
              }
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Slide>
  );

  const renderLocationAndFiles = () => (
    <Slide direction="left" in={activeStep === 2} mountOnEnter unmountOnExit timeout={500}>
      <Card
        elevation={0}
        sx={{
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }
        }}
      >
        <CardHeader
          avatar={
            <Box sx={{
              bgcolor: 'primary.main',
              borderRadius: '50%',
              p: 1,
              animation: 'pulse 2s infinite'
            }}>
              <LocationOn sx={{ color: 'white' }} />
            </Box>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              الموقع والملفات الداعمة
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              تحديد الموقع الجغرافي ورفع الوثائق
            </Typography>
          }
          action={
            completedSteps.has(2) && (
              <Zoom in={true}>
                <Chip
                  icon={<Check />}
                  label="مكتمل"
                  color="success"
                  size="small"
                  sx={{ animation: 'fadeIn 0.5s ease-in-out' }}
                />
              </Zoom>
            )
          }
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>📍 الموقع على الخريطة</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            انقر على الخريطة لتحديد موقع الضرر
          </Typography>
          <Paper elevation={1} sx={{ p: 1, mb: 3 }}>
            <div
              id="map"
              ref={mapContainerRef}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: 8,
                minHeight: "400px",
                position: "relative",
                zIndex: 1,
                backgroundColor: "#f5f5f5"
              }}
            />
          </Paper>
          <TextField
            fullWidth
            label="الإحداثيات"
            value={formData.damage?.coordinates || ''}
            InputProps={{ readOnly: true }}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>📎 رفع ملفات داعمة</Typography>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '2px dashed rgba(229, 57, 53, 0.4)',
              borderRadius: 4,
              textAlign: 'center',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,235,238,0.5) 100%)',
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,205,210,0.6) 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(229, 57, 53, 0.15)',
                '& .upload-icon': {
                  transform: 'scale(1.1) translateY(-4px)',
                  color: 'primary.main'
                }
              }
            }}
          >
            <Box className="upload-icon" sx={{ transition: 'all 0.3s ease-in-out', mb: 2 }}>
              <AttachFile sx={{ fontSize: 56, color: 'text.secondary' }} />
            </Box>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  files: Array.from(e.target.files || []),
                })
              }
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                zIndex: 2
              }}
            />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
              اسحب وأفلت الملفات هنا، أو انقر للاستعراض
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1, maxWidth: '80%', mx: 'auto', lineHeight: 1.6 }}>
              يرجى رفع: صور الأضرار (30 ميغابايت كحد أقصى)، مقاطع فيديو (30 ميغابايت)، وثائق الملكية (5 ميغابايت)، الهوية الشخصية وجواز السفر (5 ميغابايت)، وشهادات الجيران (20 ميغابايت).
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Slide>
  );

  const renderReviewAndSubmit = () => (
    <Slide direction="right" in={activeStep === 3} mountOnEnter unmountOnExit timeout={500}>
      <Card
        elevation={0}
        sx={{
          overflow: 'visible',
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }
        }}
      >
        <CardHeader
          avatar={
            <Box sx={{
              bgcolor: 'primary.main',
              borderRadius: '50%',
              p: 1,
              animation: 'pulse 2s infinite'
            }}>
              <Assignment sx={{ color: 'white' }} />
            </Box>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              مراجعة البيانات والإرسال
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              يرجى مراجعة جميع البيانات قبل الإرسال
            </Typography>
          }
          action={
            completedSteps.has(3) && (
              <Zoom in={true}>
                <Chip
                  icon={<Check />}
                  label="مكتمل"
                  color="success"
                  size="small"
                  sx={{ animation: 'fadeIn 0.5s ease-in-out' }}
                />
              </Zoom>
            )
          }
        />
        <CardContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            يرجى مراجعة جميع البيانات المدخلة والتأكد من صحتها قبل الإرسال النهائي
          </Alert>

          <Typography variant="h6" gutterBottom>📝 ملاحظات إضافية</Typography>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <FormGroup sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.documentedByOfficial || false}
                    onChange={(e) => handleChange("documentedByOfficial", e.target.checked)}
                    color="primary"
                  />
                }
                label="هل تم توثيق الأضرار من قبل جهة رسمية أو محلية؟"
              />
            </FormGroup>
            <Collapse in={formData.documentedByOfficial} timeout="auto" unmountOnExit>
              <TextField
                label="يرجى ذكر الجهة"
                fullWidth
                value={formData.officialDocumentationEntity || ""}
                onChange={(e) => handleChange("officialDocumentationEntity", e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Collapse>
            <TextField
              label="هل لديك ملاحظات إضافية قد تساعد في تقييم الضرر؟"
              fullWidth
              multiline
              rows={3}
              value={formData.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              variant="outlined"
            />
          </Paper>

          <Typography variant="h6" gutterBottom>📜 الإقرار والموافقة</Typography>
          <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
            <Typography variant="body2" sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
              أقر أنا الموقع أدناه بأن جميع المعلومات الواردة في هذا النموذج صحيحة
              ودقيقة حسب علمي واعتقادي، وأتعهد بأنني الوحيد المسؤول عن صحة هذه
              المعلومات أمام القانون. كما أقر بأن هذه المعلومات تعتبر أولية قيد
              التحقق منها من قبل الجهات المختصة، وأوافق على استخدام هذه البيانات
              لأغراض تقديم المساعدات الإنسانية والإغاثية.
            </Typography>
          </Paper>

          <FormGroup sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consentDataSharing}
                  onChange={(e) => handleChange("consentDataSharing", e.target.checked)}
                  color="primary"
                />
              }
              label="أوافق على مشاركة البيانات مع الجهات المختصة لأغراض تقديم المساعدة"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consentCall}
                  onChange={(e) => handleChange("consentCall", e.target.checked)}
                  color="primary"
                />
              }
              label="أوافق على الاتصال بي من قبل فريق المتابعة"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  color="primary"
                  required
                />
              }
              label="أقر بأنني قرأت وأوافق على جميع الشروط والأحكام المذكورة أعلاه"
            />
          </FormGroup>

          <Collapse in={isConfirmed} timeout="auto" unmountOnExit>
            <Box sx={{ mb: 3, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="اسم المتضرر"
                    fullWidth
                    required={isConfirmed}
                    value={formData.declarationName || ""}
                    onChange={(e) => handleChange("declarationName", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="تاريخ التوقيع"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required={isConfirmed}
                    value={formData.declarationDate || ""}
                    onChange={(e) => handleChange("declarationDate", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="التوقيع الإلكتروني (اكتب اسمك)"
                    fullWidth
                    required={isConfirmed}
                    value={formData.declarationSignature || ""}
                    onChange={(e) => handleChange("declarationSignature", e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={!isConfirmed || loading}
            startIcon={<Send />}
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            {loading ? 'جاري الإرسال...' : 'إرسال النموذج'}
          </Button>
        </CardContent>
      </Card>
    </Slide>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderDamageDetails();
      case 2:
        return renderLocationAndFiles();
      case 3:
        return renderReviewAndSubmit();
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        py: 4,
        background: `
          radial-gradient(circle at 15% 50%, rgba(229, 57, 53, 0.08), transparent 25%),
          radial-gradient(circle at 85% 30%, rgba(255, 138, 101, 0.12), transparent 25%),
          linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)
        `,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#e53935\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 0,
          opacity: 0.6
        }
      }} dir="rtl">
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            minHeight: '100vh',
            position: 'relative',
            zIndex: 1,
            '& .MuiContainer-root': {
              overflow: 'visible'
            }
          }}
        >

          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
              
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              
              @keyframes slideProgress {
                from { width: 0%; }
                to { width: 100%; }
              }
              
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
              }
              
              /* Force connector lines to be visible */
              .MuiStepConnector-root {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
              }
              
              .MuiStepConnector-line {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: 3px !important;
                background-color: #bdbdbd !important;
                border-radius: 2px !important;
                width: 100% !important;
              }
              
              .MuiStepConnector-alternativeLabel {
                position: absolute !important;
                top: 22px !important;
                left: calc(-50% + 22px) !important;
                right: calc(50% + 22px) !important;
                z-index: 0 !important;
              }
              
              .MuiStep-root:not(:last-child) .MuiStepConnector-root {
                display: block !important;
                visibility: visible !important;
              }
              
              .MuiStep-root:not(:last-child) .MuiStepConnector-line {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                background-color: #bdbdbd !important;
                height: 3px !important;
              }
            `}
          </style>
          <Paper elevation={0} sx={{
            p: 4, mb: 4, textAlign: 'center', background: 'transparent', border: 'none'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Poll sx={{ fontSize: '3.5rem', color: 'primary.main', mr: 2, filter: 'drop-shadow(0px 4px 8px rgba(229,57,53,0.3))' }} />
              <Typography variant="h4" color="primary.dark" gutterBottom sx={{ mb: 0, fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                نموذج الإبلاغ عن الأضرار
              </Typography>
            </Box>
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400, opacity: 0.8 }}>
              منظمة القلب الدافئ - تقييم الأضرار والمساعدات الإنسانية
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{
            mb: 5,
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}>
            <Box sx={{
              background: 'linear-gradient(135deg, #E53935 0%, #FF8A65 100%)',
              color: 'white', p: 2.5, textAlign: 'center',
              boxShadow: 'inset 0 -2px 10px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
                مراحل التقييم
              </Typography>
            </Box>

            {/* Custom Stepper with Guaranteed Connector Lines */}
            <Box sx={{ p: 5 }}>
              <Box sx={{ position: 'relative' }}>
                {/* Background connector line that spans the entire width */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 22,
                    left: '12.5%', // Start from center of first icon
                    right: '12.5%', // End at center of last icon
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '2px',
                    zIndex: 0
                  }}
                />

                {/* Progress line that shows completion */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 22,
                    left: '12.5%',
                    width: `${(activeStep / (steps.length - 1)) * 75}%`, // 75% because we start at 12.5% and end at 87.5%
                    height: '4px',
                    background: 'linear-gradient(90deg, #4CAF50 0%, #E53935 100%)',
                    borderRadius: '2px',
                    zIndex: 1,
                    transition: 'width 0.5s ease-in-out',
                    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                  }}
                />

                {/* Steps container */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {steps.map((label, index) => (
                    <Box key={index} sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                      position: 'relative'
                    }}>
                      {/* Step Icon */}
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: completedSteps.has(index) ? '#4CAF50' : index === activeStep ? '#E53935' : '#bdbdbd',
                          color: 'white',
                          border: index === activeStep ? '3px solid #fff' : '2px solid #fff',
                          boxShadow: index === activeStep
                            ? '0 4px 20px rgba(229, 57, 53, 0.4)'
                            : completedSteps.has(index)
                              ? '0 4px 20px rgba(76, 175, 80, 0.4)'
                              : '0 2px 8px rgba(0,0,0,0.1)',
                          transform: index === activeStep ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.3s ease-in-out',
                          zIndex: 2,
                          position: 'relative',
                          fontSize: '1.2rem',
                          mb: 2
                        }}
                      >
                        {completedSteps.has(index) ? (
                          <CheckCircle sx={{ fontSize: '1.2rem' }} />
                        ) : index === 0 ? (
                          <Person sx={{ fontSize: '1.2rem' }} />
                        ) : index === 1 ? (
                          <Home sx={{ fontSize: '1.2rem' }} />
                        ) : index === 2 ? (
                          <LocationOn sx={{ fontSize: '1.2rem' }} />
                        ) : (
                          <Assignment sx={{ fontSize: '1.2rem' }} />
                        )}
                      </Box>

                      {/* Step Label */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: index === activeStep ? 600 : completedSteps.has(index) ? 600 : 500,
                          color: index === activeStep ? 'primary.main' : completedSteps.has(index) ? 'success.main' : 'text.secondary',
                          textAlign: 'center',
                          maxWidth: '120px',
                          lineHeight: 1.2
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ mb: 4 }}>
            {getStepContent(activeStep)}
          </Box>

          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                size="large"
              >
                السابق
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size="large"
                >
                  التالي
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DamageAssessmentForm;
