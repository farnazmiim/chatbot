import { type IconProps } from './IconProps'

function SendIcon({ className = 'w-5 h-5', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0583 7.97496L9.99998 2.91663L4.94165 7.97496"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.0834V3.05835"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SendIcon
