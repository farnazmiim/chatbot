import { type IconProps } from './IconProps'

function CloseIcon({ className = 'w-5 h-5', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 9.16667L17.3333 1M9.16667 9.16667L1 17.3333M9.16667 9.16667L1 1M9.16667 9.16667L17.3333 17.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CloseIcon
