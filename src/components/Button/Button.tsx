import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  className?: string
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'w-full py-4 px-6 rounded-[14px] text-[16px] transition-all duration-200'

  const variantClasses = {
    primary: 'bg-[#0095DA] border border-[#0095DA] text-white hover:opacity-90 active:scale-95',
    secondary: 'bg-white border-2 border-[#FF4F00] text-[#FF4F00] text-[14px] font-semibold hover:bg-gray-50 active:scale-95',
    outline: 'bg-[#FEF2F2] border-2 border-[#FFC9C9] text-[#C10007] hover:bg-[#00B4D8] hover:text-white active:scale-95',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
