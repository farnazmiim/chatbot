import { type IconProps } from './IconProps'

function BotIcon({ className = '', size }: IconProps) {
  const baseStyle: React.CSSProperties = {
    width: size || '118%',
    height: size || '100%',
    backgroundImage: 'url(/bot-sprite.png)',
    backgroundPosition: '-341px -133px',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(0.5)',
    transformOrigin: 'center center',
  }

  const style = size
    ? { ...baseStyle, width: size, height: size }
    : baseStyle

  return (
    <div
      className={className}
      style={style}
      role="img"
      aria-label="Bot Icon"
    />
  )
}

export default BotIcon
