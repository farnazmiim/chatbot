import { type IconProps } from './IconProps'

function BackIcon({ className = '', size = 24 }: IconProps) {
  const style = { width: size * (14 / 8), height: size }

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.750002 0.749999L8.75 7.75L0.75 14.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BackIcon
