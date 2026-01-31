import { type IconProps } from './IconProps'

function CopyIcon({ className = 'w-[11px] h-[11px]', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.63379 0.438133C2.63379 0.196159 2.83036 0 3.07284 0H10.0976C10.3401 0 10.5366 0.196159 10.5366 0.438133V7.44826C10.5366 7.69024 10.3401 7.8864 10.0976 7.8864H7.46331C7.22083 7.8864 7.02426 7.69024 7.02426 7.44826C7.02426 7.20629 7.22083 7.01013 7.46331 7.01013H9.65855V0.876266H3.51188V3.06693C3.51188 3.30891 3.31532 3.50506 3.07284 3.50506C2.83036 3.50506 2.63379 3.30891 2.63379 3.06693V0.438133Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3.06655C0 2.82458 0.196568 2.62842 0.439047 2.62842H7.4638C7.70628 2.62842 7.90285 2.82458 7.90285 3.06655V10.0767C7.90285 10.3187 7.70628 10.5148 7.4638 10.5148H0.439047C0.196568 10.5148 0 10.3187 0 10.0767V3.06655ZM0.878094 3.50468V9.63855H7.02476V3.50468H0.878094Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default CopyIcon
