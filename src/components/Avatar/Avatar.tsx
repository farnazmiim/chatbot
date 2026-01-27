import { BotIcon } from '../Icons'

interface AvatarProps {
  type?: 'bot' | 'female'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function Avatar({ type = 'bot', size = 'md', className = '' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  }

  if (type === 'bot') {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
        <div className="w-full h-full bg-gradient-to-br from-[#00B4D8] to-[#00D4AA] rounded-full flex items-center justify-center">
          <BotIcon />
        </div>
      </div>
    )
  }

  // Female avatar (simplified representation)
  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
     
    </div>
  )
}

export default Avatar
