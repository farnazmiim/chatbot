import { type IconProps } from './IconProps'

function MenuIcon({ className = 'w-6 h-6', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg 
      className={className}
      style={style}
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.75 14.25H0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.75 14.25C16.75 15.6307 15.6307 16.75 14.25 16.75C12.8693 16.75 11.75 15.6307 11.75 14.25C11.75 12.8683 12.8693 11.75 14.25 11.75C15.6307 11.75 16.75 12.8683 16.75 14.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 3.25H16.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.75 3.25C0.75 4.63174 1.86928 5.75 3.25 5.75C4.63072 5.75 5.75 4.63174 5.75 3.25C5.75 1.86928 4.63072 0.75 3.25 0.75C1.86928 0.75 0.75 1.86928 0.75 3.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default MenuIcon
