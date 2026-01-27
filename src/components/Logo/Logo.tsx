import { LogoIcon } from '../Icons'

interface LogoProps {
  className?: string
}

function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <LogoIcon />
      </div>
    </div>
  )
}

export default Logo
