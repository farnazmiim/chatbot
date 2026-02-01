import { type IconProps } from './IconProps'

function CameraIcon({ className = 'w-6 h-6', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7468 11.2883C14.8277 13.1204 13.3491 14.6696 11.4446 14.7475C11.3043 14.7534 4.46526 14.7396 4.46526 14.7396C2.56991 14.8835 0.9111 13.5215 0.761602 11.6963C0.750339 11.5603 0.753411 4.22219 0.753411 4.22219C0.669446 2.38815 2.14599 0.834988 4.05158 0.754176C4.19391 0.747278 11.0237 0.760089 11.0237 0.760089C12.9283 0.618176 14.5922 1.99001 14.7397 3.82405C14.7499 3.9561 14.7468 11.2883 14.7468 11.2883Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.75 5.72984L18.043 3.03484C18.859 2.36684 20.083 2.94884 20.082 4.00184L20.07 11.3508C20.069 12.4038 18.844 12.9808 18.03 12.3128L14.75 9.61784"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CameraIcon
