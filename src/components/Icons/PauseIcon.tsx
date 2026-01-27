import { type IconProps } from './IconProps'

function PauseIcon({ className = 'w-6 h-6', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 14 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_4031_2167" fill="white">
        <rect width="5" height="26" rx="2" />
      </mask>
      <rect
        width="5"
        height="26"
        rx="2"
        stroke="currentColor"
        strokeWidth="5"
        mask="url(#path-1-inside-1_4031_2167)"
      />
      <mask id="path-2-inside-2_4031_2167" fill="white">
        <rect x="9" width="5" height="26" rx="2" />
      </mask>
      <rect
        x="9"
        width="5"
        height="26"
        rx="2"
        stroke="currentColor"
        strokeWidth="5"
        mask="url(#path-2-inside-2_4031_2167)"
      />
    </svg>
  )
}

export default PauseIcon
