import React from 'react'

export default function SectionTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="border-l-8 border-slate-400">
      <div className="ml-3 py-1 text-lg">{children}</div>
    </div>
  )
}
