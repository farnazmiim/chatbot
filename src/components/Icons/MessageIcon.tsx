import { type IconProps } from './IconProps'

function MessageIcon({ className = 'w-6 h-6', size }: IconProps) {
  const style = size ? { width: size, height: size } : undefined

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.475 14.3865V19.7198C22.475 20.0665 22.4625 20.3998 22.425 20.7198C22.1375 24.3198 20.15 26.1065 16.4875 26.1065H15.9875C15.675 26.1065 15.375 26.2665 15.1875 26.5331L13.6875 28.6665C13.025 29.6132 11.95 29.6132 11.2875 28.6665L9.78748 26.5331C9.62498 26.3065 9.2625 26.1065 8.9875 26.1065H8.48751C4.50001 26.1065 2.5 25.0532 2.5 19.7198V14.3865C2.5 10.4798 4.18751 8.35977 7.55001 8.0531C7.85001 8.0131 8.16251 7.99976 8.48751 7.99976H16.4875C20.475 7.99976 22.475 10.1331 22.475 14.3865Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.4758 9.05284V14.3862C27.4758 18.3062 25.7883 20.4129 22.4258 20.7195C22.4633 20.3995 22.4758 20.0662 22.4758 19.7195V14.3862C22.4758 10.1328 20.4758 7.99949 16.4883 7.99949H8.48828C8.16328 7.99949 7.85078 8.01283 7.55078 8.05283C7.83828 4.46615 9.82578 2.66614 13.4883 2.66614H21.4883C25.4758 2.66614 27.4758 4.79949 27.4758 9.05284Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8694 17.6669H16.8806"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4944 17.667H12.5056"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.12133 17.667H8.13258"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MessageIcon
