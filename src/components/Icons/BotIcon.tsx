import { type IconProps } from './IconProps'

function BotIcon({ className = '', size }: IconProps) {
  // Sprite sheet: 1280x960, arranged in 2x3 grid (3 columns, 2 rows)
  // Each sprite after scaling: 128x144
  // Middle-top sprite (column 2, row 1)

  const baseStyle: React.CSSProperties = {
    width: size || '118%',
    height: size || '100%',
    backgroundImage: 'url(/bot-sprite.png)',
    backgroundPosition: '-615px -133px',
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
