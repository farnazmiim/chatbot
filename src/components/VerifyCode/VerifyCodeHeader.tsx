import { memo } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { BackIcon } from '../Icons'

function VerifyCodeHeaderInner() {
  return (
    <header className="flex items-center justify-between p-4 shrink-0">
      <Link
        to="/"
        className="flex items-center gap-2 hover:bg-gray-100 rounded-[14px] transition-colors no-underline"
        style={{ color: '#000000' }}
        aria-label="صفحه قبلی"
      >
        <span className="inline-flex items-center shrink-0 leading-none">
          <BackIcon />
        </span>
      </Link>
      <div className="flex items-center justify-center w-[100px] h-[45px] shrink-0">
        <Logo width={100} height={45} />
      </div>
    </header>
  )
}

export const VerifyCodeHeader = memo(VerifyCodeHeaderInner)
