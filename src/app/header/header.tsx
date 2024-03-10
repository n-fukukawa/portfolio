import Link from 'next/link'
import Navigation from './navigation'
import { GitHub } from '@mui/icons-material'

export default function Header() {
  return (
    <header
      id="header"
      className="fixed w-full flex items-center sm:justify-start justify-between sm:px-16 px-4 py-4 border-b-2 border-b-slate-200 bg-white"
      style={{ zIndex: 1, height: 90 }}
    >
      <div className="flex items-center mr-16 p-2">
        <a href="/" className="text-3xl">
          fukulab
        </a>
      </div>
      <Navigation />
      <div className="sm:block hidden grow text-right hover:text-sky-800">
        <a href="https://github.com/n-fukukawa/portfolio" target="_blank">
          <GitHub fontSize="large" />
        </a>
      </div>
    </header>
  )
}
