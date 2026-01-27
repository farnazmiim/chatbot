import { type IconProps } from './IconProps'

function MenuIcon({ className = 'w-6 h-6', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83398 6.125C5.35074 6.125 4.95898 6.51675 4.95898 7C4.95898 7.48325 5.35074 7.875 5.83398 7.875H22.1673C22.6506 7.875 23.0423 7.48325 23.0423 7C23.0423 6.51675 22.6506 6.125 22.1673 6.125H5.83398Z"
        fill="currentColor"
      />
      <path
        d="M5.83398 13.125C5.35074 13.125 4.95898 13.5168 4.95898 14C4.95898 14.4832 5.35074 14.875 5.83398 14.875H22.1673C22.6506 14.875 23.0423 14.4832 23.0423 14C23.0423 13.5168 22.6506 13.125 22.1673 13.125H5.83398Z"
        fill="currentColor"
      />
      <path
        d="M5.83398 20.125C5.35074 20.125 4.95898 20.5168 4.95898 21C4.95898 21.4832 5.35074 21.875 5.83398 21.875H22.1673C22.6506 21.875 23.0423 21.4832 23.0423 21C23.0423 20.5168 22.6506 20.125 22.1673 20.125H5.83398Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default MenuIcon
