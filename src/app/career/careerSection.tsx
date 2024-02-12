import React from 'react'

export default function CareerSection({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={
        'p-6 border-2 border-slate-100 shadow-md shadow-slate-100 ' + className
      }
    >
      {children}
    </div>
  )
}

CareerSection.ProjectName = function ProjectName({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mb-2 text-md font-bold">{children}</div>
}

CareerSection.ProjectTerms = function ProjectTerms({
  start,
  end
}: Readonly<{
  start: { year: number; month: number }
  end?: { year: number; month: number }
}>) {
  return (
    <div className="mb-1 text-sm">
      {start.year}年{start.month}月〜{end ? `${end.year}年${end.month}月` : ''}
    </div>
  )
}

CareerSection.ProjectStacks = function ProjectStacks({
  skillStacks
}: Readonly<{ skillStacks: string[] }>) {
  return (
    <div className="mb-1 text-sm">
      {skillStacks.map((skillStack, i) => (
        <span className="mr-2" key={i}>
          {skillStack}
        </span>
      ))}
    </div>
  )
}

CareerSection.ProjectRole = function ProjectRole({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-sm">
      <span className="mr-2">役割:</span>
      <span>{children}</span>
    </div>
  )
}

CareerSection.ProjectSummary = function ProjectSummary({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="sm:max-w-xl mt-4 text-sm">{children}</div>
}
