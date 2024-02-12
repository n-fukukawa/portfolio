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
    <div
      className={`h-full p-8 border-2 border-slate-100 shadow-md shadow-slate-100 ${className}`}
      style={style}
    >
      <div className="text-center">{title}</div>
      <div className="my-6 flex justify-center">
        <Image src={thumbnail} width={100} height={100} alt="" />
      </div>
      <div className="mb-4">{comment}</div>
      <div className="text-right">
        <Link
          href={link}
          target={isExternalLink ? '_blank' : undefined}
          className="text-sky-700"
        >
          {linkText ?? '開く'}
        </Link>
      </div>
    </div>
  )
}
