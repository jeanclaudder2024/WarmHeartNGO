// components/FileUploadSection.tsx

import { useState } from "react";

type FileUploadProps = {
  // Optional callback for file change
};

const FileUploadSection = () => {
  const [filePhotos, setFilePhotos] = useState<FileList | null>(null);
  const [fileVideos, setFileVideos] = useState<FileList | null>(null);
  const [fileOwnershipDocs, setFileOwnershipDocs] = useState<FileList | null>(null);
  const [fileCertificates, setFileCertificates] = useState<FileList | null>(null);
  const [fileIdPhoto, setFileIdPhoto] = useState<File | null>(null);
  const [filePassport, setFilePassport] = useState<File | null>(null);
  const [fileSyrianCard, setFileSyrianCard] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<FileList | null>>) => {
    setter(e.target.files);
  };

  return (
    <section className="mb-8"  style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
      <h2 className="text-center text-xl font-semibold mb-4">القسم الثالث: الملفات والإثباتات</h2>

      <div className="mb-4">
        <label htmlFor="property-photos" className="block text-lg mb-2">
          صور فوتوغرافية للأضرار (قبل وبعد)
        </label>
        <input
          type="file"
          id="property-photos"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e, setFilePhotos)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 30 ميغابايت لكل ملف</small>
      </div>

      <div className="mb-4">
        <label htmlFor="video-clips" className="block text-lg mb-2">
          مقاطع فيديو للأضرار
        </label>
        <input
          type="file"
          id="video-clips"
          multiple
          accept="video/*"
          onChange={(e) => handleFileChange(e, setFileVideos)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 30 ميغابايت لكل ملف</small>
      </div>

      <div className="mb-4">
        <label htmlFor="ownership-documents" className="block text-lg mb-2">
          وثائق تثبيت ملكية العقار (صك ملكية، قوانين مستندات)
        </label>
        <input
          type="file"
          id="ownership-documents"
          multiple
          accept="application/pdf,image/*"
          onChange={(e) => handleFileChange(e, setFileOwnershipDocs)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 5 ميغابايت لكل ملف</small>
      </div>

      <div className="mb-4">
        <label htmlFor="certificates" className="block text-lg mb-2">
          شهادات من الجيران أو الجهات المختصة
        </label>
        <input
          type="file"
          id="certificates"
          multiple
          accept="application/pdf,image/*"
          onChange={(e) => handleFileChange(e, setFileCertificates)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 20 ميغابايت لكل ملف</small>
      </div>

      <div className="mb-4">
        <label htmlFor="id-photo" className="block text-lg mb-2">
          صورة عن الهوية الشخصية
        </label>
        <input
          type="file"
          id="id-photo"
          accept="image/*"
          onChange={(e) => setFileIdPhoto(e.target.files?.[0] || null)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 5 ميغابايت لكل ملف</small>
      </div>

      <div className="mb-4">
        <label htmlFor="passport-photo" className="block text-lg mb-2">
          صورة عن جواز السفر (إن وجد)
        </label>
        <input
          type="file"
          id="passport-photo"
          accept="image/*"
          onChange={(e) => setFilePassport(e.target.files?.[0] || null)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 5 ميغابايت لكل ملف</small>
      </div>

      <div className="mb-4">
        <label htmlFor="syrian-card-photo" className="block text-lg mb-2">
          صورة عن البطاقة المدنية السورية (إن وجدت)
        </label>
        <input
          type="file"
          id="syrian-card-photo"
          accept="image/*"
          onChange={(e) => setFileSyrianCard(e.target.files?.[0] || null)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <small className="block text-sm text-gray-600 mt-2">الحد الأقصى للحجم: 5 ميغابايت لكل ملف</small>
      </div>
    </section>
  );
};

export default FileUploadSection;
