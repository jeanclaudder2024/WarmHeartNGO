export interface GalleryImage {
  id: number;
  src: string;
  alt: {
    en: string;
    ar: string;
  };
}
import img1 from "../assets/01.jpg"
import img2 from "../assets/02.jpg"
import img3 from "../assets/03.jpg"
import img4 from "../assets/10.jpg"
import img5 from "../assets/08.jpg"
import img6 from "../assets/09.jpg"
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: img1,
    alt: {
      en: "Volunteers distributing food supplies in a community outreach program",
      ar: "متطوعون يوزعون المواد الغذائية في برنامج التوعية المجتمعية"
    }
  },
  {
    id: 2,
    src: img2,
    alt: {
      en: "Children participating in our educational support program",
      ar: "أطفال يشاركون في برنامج الدعم التعليمي الخاص بنا"
    }
  },
  {
    id: 3,
    src: img3,
    alt: {
      en: "Healthcare professionals providing medical check-ups in rural areas",
      ar: "متخصصو الرعاية الصحية يقدمون الفحوصات الطبية في المناطق الريفية"
    }
  },
  {
    id: 4,
    src: img6,
    alt: {
      en: "Community members participating in a clean water initiative",
      ar: "أفراد المجتمع يشاركون في مبادرة المياه النظيفة"
    }
  },
  {
    id: 5,
    src: img4,
    alt: {
      en: "Volunteers constructing housing for families in need",
      ar: "متطوعون يبنون مساكن للعائلات المحتاجة"
    }
  },
  {
    id: 6,
    src:img5,
    alt: {
      en: "Children enjoying arts and crafts at our community center",
      ar: "أطفال يستمتعون بالفنون والحرف اليدوية في مركزنا المجتمعي"
    }
  }
];