// components/DeclarationSection.tsx

import { useState } from "react";

const DeclarationSection = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  };

  return (
    <section className="mb-8"  style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
      <h2 className="text-center text-xl font-semibold mb-4">القسم الخامس: الإقرار</h2>

      <p className="text-lg mb-4">
        أقر أنا الموقع أدناه بأن جميع المعلومات الواردة في هذا النموذج صحيحة ودقيقة حسب علمي واعتقادي،
        وأتعهد بأنني الوحيد المسؤول عن صحة هذه المعلومات أمام القانون.
        كما أقر بأن هذه المعلومات تعتبر أولية قيد التحقق منها من قبل الجهات المختصة.
        في حال ثبت صحة هذه المعلومات بعد التحقق منها، فإنني أوافق على أن يتم إحالة هذه المعلومات إلى الجهات
        المختصة لإعادة تقييم الأضرار ودفع التعويضات بناءً على ذلك.
        كما أتحمل كامل المسؤولية القانونية في حال تبين عدم صحة أي من هذه المعلومات.
      </p>

      <div className="mb-4">
        <label htmlFor="name" className="block text-lg mb-2">
          اسم المتضرر
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="أدخل اسمك"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-lg mb-2">
          تاريخ التوقيع
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="signature" className="block text-lg mb-2">
          التوقيع الإلكتروني
        </label>
        <input
          type="file"
          id="signature"
          name="signature"
          className="w-full p-3 border border-gray-300 rounded-md"
          accept="image/*"
        />
        <small className="block text-sm text-gray-600 mt-2">
          يرجى تحميل صورة التوقيع الإلكتروني
        </small>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="confirm"
          name="confirm"
          className="mr-2"
          checked={isConfirmed}
          onChange={handleConfirmationChange}
        />
        <label htmlFor="confirm" className="text-lg">
          أقر بأنني قرأت وأوافق على جميع الشروط والأحكام
        </label>
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-400"
        disabled={!isConfirmed}
      >
        إرسال
      </button>
    </section>
  );
};

export default DeclarationSection;
