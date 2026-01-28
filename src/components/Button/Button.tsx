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
  const baseClasses = 'w-full py-4 px-6 rounded-lg font-normal text-[16px] transition-all duration-200'

  const variantClasses = {
    primary: 'bg-[#0095DA] border border-[#00B6C7] text-white hover:bg-[#00B6C7] hover:border-[#00B6C7] active:scale-95',
    secondary: 'bg-white border-2 border-[#FF8C00] text-[#FF8C00] hover:bg-gray-50 active:scale-95',
    outline: 'border-2 border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white active:scale-95',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
