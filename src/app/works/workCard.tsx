import Image from 'next/image'
import Link from 'next/link'
import React, { CSSProperties } from 'react'

export default function WorkCard({
  title,
  thumbnail,
  comment,
  link,
  className,
  linkText,
  style
}: Readonly<{
  title: string
  thumbnail: string
  comment: string
  link: string
  linkText?: string
  className?: string
  style?: CSSProperties
}>) {
  const isExternalLink = /^http/.test(link)
  return (
    <Link
      href={link}
      target={isExternalLink ? '_blank' : undefined}
      className={`block h-full p-8 border-2 border-slate-100 shadow-md shadow-slate-100 hover:bg-stone-50 hover:shadow-md transition-all ${className}`}
      style={style}
    >
      <div className="text-center">{title}</div>
      <div className="my-6 flex justify-center">
        <Image src={thumbnail} width={160} height={160} alt="" />
      </div>
      <div className="mb-4">{comment}</div>
      <div className="text-right text-sky-700">{linkText ?? '開く'}</div>
    </Link>
  )
}
