import { type IconProps } from './IconProps'

function BotIcon({ className = '', size }: IconProps) {
  const baseStyle: React.CSSProperties = {
    width: size || '118%',
    height: size || '100%',
    backgroundImage:
      "image-set(url('/bot.webp') type('image/webp'), url('/bot-lcp.png') type('image/png'))",
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
