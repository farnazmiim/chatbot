import { type IconProps } from './IconProps'

function MicrophoneIcon({ className = 'w-6 h-6', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9987 14.2083C13.0245 14.2083 14.6654 12.5674 14.6654 10.5416V5.49992C14.6654 3.47409 13.0245 1.83325 10.9987 1.83325C8.97286 1.83325 7.33203 3.47409 7.33203 5.49992V10.5416C7.33203 12.5674 8.97286 14.2083 10.9987 14.2083Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.98828 8.84595V10.4043C3.98828 14.2726 7.13245 17.4168 11.0008 17.4168C14.8691 17.4168 18.0133 14.2726 18.0133 10.4043V8.84595"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.72656 5.89411C10.5516 5.59161 11.4499 5.59161 12.2749 5.89411"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2656 7.83746C10.7515 7.70913 11.2556 7.70913 11.7415 7.83746"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17.4167V20.1667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MicrophoneIcon
