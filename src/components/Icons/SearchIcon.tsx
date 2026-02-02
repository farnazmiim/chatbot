import { type IconProps } from './IconProps'

function SearchIcon({ className = 'w-5 h-5', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.67586 12.6017C3.4031 12.6017 0.75 9.94861 0.75 6.67585C0.75 3.4031 3.4031 0.75 6.67586 0.75C9.94861 0.75 12.6017 3.4031 12.6017 6.67585M6.67586 12.6017C8.32032 12.6017 9.80833 11.9319 10.8819 10.8501C11.945 9.77906 12.6017 8.30415 12.6017 6.67585M6.67586 12.6017C7.8373 12.6017 8.92077 12.2675 9.83525 11.6902C10.4617 11.2946 11.307 11.2794 11.8283 11.8059L14.0832 14.0831M12.6017 6.67585C12.6017 7.82952 12.2721 8.90624 11.7018 9.81684C11.3134 10.4371 11.2971 11.2694 11.812 11.7894L14.0832 14.0831M14.0832 14.0831L10.8699 10.8624"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SearchIcon
