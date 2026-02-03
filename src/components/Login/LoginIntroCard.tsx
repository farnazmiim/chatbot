import { memo } from 'react'

const INTRO_TEXT =
  'دستیاری هوشمند و کارآمد برای پاسخگویی به نیازهای مشتریان است. همیار بات با استفاده از فناوری‌های پیشرفته هوش مصنوعی، توانایی ارائه خدمات متنوع از جمله پاسخ به سوالات عمومی، راهنمایی در خصوص محصولات و خدمات، پیگیری مشکلات و پشتیبانی فنی را دارد!'

function LoginIntroCardInner() {
  return (
    <div className="w-full max-w-sm rounded-2xl px-5 py-6 bg-white">
      <h1 className="mb-4 text-center font-bold text-2xl" style={{ color: '#292F52' }}>
        همیار بات
      </h1>
      <p className="text-[14px] font-normal text-center leading-relaxed" style={{ color: '#292F52' }}>
        {INTRO_TEXT}
      </p>
    </div>
  )
}

export const LoginIntroCard = memo(LoginIntroCardInner)
