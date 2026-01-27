import { type IconProps } from './IconProps'

function BotIcon({ className = 'w-3/4 h-3/4', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 7.83333C9.5 8.15749 9.39464 8.46836 9.20711 8.69757C9.01957 8.92679 8.76522 9.05556 8.5 9.05556H2.5L0.5 11.5V1.72222C0.5 1.39807 0.605357 1.08719 0.792893 0.857981C0.98043 0.628769 1.23478 0.5 1.5 0.5H8.5C8.76522 0.5 9.01957 0.628769 9.20711 0.857981C9.39464 1.08719 9.5 1.39807 9.5 1.72222V7.83333Z" stroke="#071465" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  )
}

export default BotIcon
