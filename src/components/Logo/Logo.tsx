interface LogoProps {
  className?: string
  width?: number | string
  height?: number | string
}

function Logo({ className = '', width, height }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <picture className="contents">
        <source srcSet="/logo.webp" type="image/webp" />
        <img
          src="/logo.png"
          alt="لوگو"
          className="object-contain min-w-0 min-h-0"
          style={{
            width: width ?? '100%',
            height: height ?? 'auto',
          }}
        />
      </picture>
    </div>
  )
}

export default Logo
