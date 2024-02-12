'use client'

import { Menu } from '@mui/icons-material'
import { ClickAwayListener, IconButton, Popper } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

const links = [
  { path: '/works', name: '作品' },
  { path: '/blog', name: '記事' },
  { path: '/introduction', name: '自己紹介' },
  { path: '/career', name: '経歴' }
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const buttonEl = useRef<HTMLButtonElement>(null)

  return (
    <>
      <HorizontalNavList className="sm:block hidden" />

      {/* ハンバーガーメニュー */}
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className="sm:hidden">
          <IconButton
            aria-describedby="menu-button"
            onClick={() => setOpen(true)}
            ref={buttonEl}
          >
            <Menu fontSize="large" />
          </IconButton>
          <Popper
            id="menu-button"
            open={open}
            anchorEl={buttonEl.current}
            placement="bottom-end"
            onClick={() => setOpen(false)}
            className="w-56 p-2 border-2 border-slate-100 bg-white shadow-md"
            style={{ zIndex: 1 }}
          >
            <nav className="sm:hidden">
              <VerticalNavList />
            </nav>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  )
}

function HorizontalNavList({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <nav className={className}>
      <ul className="flex">
        {links.map((link) => (
          <li className="mx-4 my-2" key={link.path}>
            <Link
              href={link.path}
              className={navItemClassName(pathname === link.path)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function VerticalNavList({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <nav className={className}>
      <ul>
        {links.map((link) => (
          <li className="mx-4 my-2" key={link.path}>
            <Link
              href={link.path}
              className={
                navItemClassName(pathname === link.path) +
                ' inline-block w-full'
              }
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const navItemClassName = (isActive: boolean) => {
  return isActive ? 'text-sky-700 pointer-events-none' : 'hover:text-sky-700'
}
