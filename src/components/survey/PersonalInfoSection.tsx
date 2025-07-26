// PersonalInfoSection.tsx
import React, { useState } from "react";

const PersonalInfoSection: React.FC = () => {
  const [hasHealthIssues, setHasHealthIssues] = useState(false);

  return (
    <section className="mb-8" style={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
      <h2 className="text-xl font-semibold mb-4">معلومات شخصية عن المتضرر</h2>

      <label className="block font-medium mb-1">الاسم الكامل:</label>
      <input name="full-name" type="text" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">رقم الهاتف:</label>
      <input name="phone-number" type="text" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">البريد الإلكتروني (إن وجد):</label>
      <input name="email" type="email" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">العنوان الحالي:</label>
      <input name="current-address" type="text" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">البلد الذي يقيم فيه حالياً:</label>
      <input name="country" type="text" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">نوع العمل الحالي:</label>
      <input name="job" type="text" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">هل يعاني من أمراض مزمنة أو مشاكل صحية؟</label>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="health-issues"
            value="yes"
            onChange={() => setHasHealthIssues(true)}
          /> نعم
        </label>
        <label>
          <input
            type="radio"
            name="health-issues"
            value="no"
            onChange={() => setHasHealthIssues(false)}
          /> لا
        </label>
      </div>
      {hasHealthIssues && (
        <textarea
          name="health-details"
          className="w-full border p-2 rounded mb-4"
          placeholder="يرجى تحديد المشاكل الصحية"
        />
      )}

      <label className="block font-medium mb-1">هل تعرض للإصابة خلال الحرب؟</label>
      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" name="injury" value="yes" /> نعم
        </label>
        <label>
          <input type="radio" name="injury" value="no" /> لا
        </label>
      </div>

      <label className="block font-medium mb-1">هل الشخص مسجل كلاجئ خارج البلاد؟</label>
      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" name="refugee" value="yes" /> نعم
        </label>
        <label>
          <input type="radio" name="refugee" value="no" /> لا
        </label>
      </div>

      <label className="block font-medium mb-1">إذا كان لاجئاً، رقم التسجيل (UNHCR أو أي جهة أخرى):</label>
      <input name="refugee-id" type="text" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">عدد أفراد العائلة (المقيمين معه):</label>
      <input name="family-members" type="number" className="w-full border p-2 rounded mb-4" />

      <label className="block font-medium mb-1">هل يوجد أفراد معاقين أو ذوي احتياجات خاصة؟</label>
      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" name="disabled-members" value="yes" /> نعم
        </label>
        <label>
          <input type="radio" name="disabled-members" value="no" /> لا
        </label>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
