import Link from 'next/link'
import Navigation from './navigation'
import { IconButton } from '@mui/material'
import { GitHub } from '@mui/icons-material'

export default function Header() {
  return (
    <header
      id="header"
      className="fixed w-full flex items-center sm:justify-start justify-between sm:px-16 px-4 py-4 border-b-2 border-b-slate-200 bg-white"
      style={{ zIndex: 1, height: 90 }}
    >
      <div className="mr-16 p-2">
        <Link href="/" className="text-3xl">
          fukulab
        </Link>{' '}
      </div>
      <Navigation />
      <div>
        <Link href="" target="_blank">
          <GitHub />
        </Link>
      </div>
    </header>
  )
}
