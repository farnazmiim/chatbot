import { LogoIcon } from '../Icons'

interface LogoProps {
  className?: string
  width?: number | string
  height?: number | string
}

function Logo({ className = '', width, height }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-full h-full min-w-0 min-h-0 overflow-hidden flex items-center justify-center">
        <LogoIcon width={width ?? '100%'} height={height ?? '100%'} />
      </div>
    </div>
  )
}

export default Logo
