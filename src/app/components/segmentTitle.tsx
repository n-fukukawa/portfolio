import React from 'react'

export default function SegmentTitle({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="py-4 border-b-2 sm:text-2xl text-xl">{children}</div>
}
