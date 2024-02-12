'use client'

import SegmentTitle from '../components/segmentTitle'
import CareerSection from './careerSection'

const projects = [
  {
    name: '教育管理システムの開発',
    terms: { start: { year: 2021, month: 2 }, end: { year: 2022, month: 8 } },
    skillStacks: ['PHP(Laravel)', 'Vue.js', 'MySQL'],
    role: 'プログラマー',
    summary: `ホテル業務の教育管理システム。`
  },
  // 現場のマニュアルなどをPDFにしてシステムで管理し、おもに新入社員がどこまで学習済みかを上長が確認できるシステム。
  // 学習者にとってはゲーム的な要素もあり、学習が完了したらポイントが付与される仕組みが実装。
  {
    name: 'IT展示会の招待者管理システム',
    terms: { start: { year: 2021, month: 5 }, end: { year: 2021, month: 11 } },
    skillStacks: ['PHP(Laravel)', 'jQuery', 'PostgreSQL'],
    role: 'プログラマー',
    summary: ``
  },
  {
    name: 'mapryGIS（地理情報システム)',
    terms: { start: { year: 2023, month: 1 } },
    skillStacks: ['React', 'Firebase', 'leaflet', 'Three.js'],
    role: '設計〜リリース',
    summary: ``
  },
  {
    name: 'アプリのアカウント管理システム',
    terms: { start: { year: 2023, month: 9 } },
    skillStacks: ['PHP(Laravel)', 'React', 'MySQL'],
    role: '設計〜リリース',
    summary: ``
  }
]

export default function Career() {
  return (
    <div className="sm:pt-6 pt-2">
      <SegmentTitle>経歴</SegmentTitle>
      <div className="mt-6">
        {projects.map((project, i) => (
          <CareerSection className="mb-4" key={i}>
            <CareerSection.ProjectName>
              {project.name}
            </CareerSection.ProjectName>
            <CareerSection.ProjectTerms
              start={project.terms.start}
              end={project.terms.end}
            />
            <CareerSection.ProjectStacks skillStacks={project.skillStacks} />
            <CareerSection.ProjectRole>
              {project.role}
            </CareerSection.ProjectRole>
            <CareerSection.ProjectSummary>
              {project.summary}
            </CareerSection.ProjectSummary>
          </CareerSection>
        ))}
      </div>
    </div>
  )
}
