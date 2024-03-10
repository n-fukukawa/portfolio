'use client'

import SegmentTitle from '../components/segmentTitle'
import SectionTitle from '../components/sectionTItle'

const skillStacks = [
  { type: 'バックエンド', items: ['PHP(Laravel)', 'Python(Django)'] },
  {
    type: 'フロントエンド',
    items: [
      'Javascript',
      'Typescript',
      'React',
      'Vue.js',
      'Next.js',
      'Three.js'
    ]
  },
  { type: 'データベース', items: ['MySQL', 'PostgreSQL', 'Firebase'] },
  { type: 'インフラ', items: ['AWS', 'さくらVPS'] },
  { type: 'その他', items: ['Git', 'Github Actions', 'Figma'] }
]

const qualifications = [
  { name: '基本情報処理技術者', year: 2019, month: 6 },
  { name: '応用情報処理技術者', year: 2023, month: 6 }
]

export default function Introduction() {
  return (
    <div className="sm:pt-6 pt-2">
      <SegmentTitle>自己紹介</SegmentTitle>
      <div className="mt-4">
        <div>
          <div>将棋大好きエンジニアのふくかわです。</div>
          <div>兵庫県出身、在住。ミニマリスト。</div>
          <div>1995年生まれ</div>
        </div>
        <div className="mt-6">
          <div>
            JavascriptやPHPを使用したWebアプリケーションの開発をしています。
          </div>
          <div>特にSQLが好きで、効率のいいクエリを考えるのが楽しいです。</div>
          <div>
            設計が重要だと思っているので、最近はシステムアーキテクト試験の勉強中です。
          </div>
        </div>

        <section className="mt-12">
          <SectionTitle>できること</SectionTitle>
          <div className="mt-4 ">
            <table className="mt-2 whitespace-nowrap">
              <thead>
                <tr>
                  <th className="py-2 text-left" colSpan={2}>
                    Webアプリケーション開発全般
                  </th>
                </tr>
              </thead>
              <tbody>
                {skillStacks.map(({ type, items }) => (
                  <tr className="border-b-2" key={type}>
                    <td className="pr-8 py-2 pl-2">{type}</td>
                    <td className="pr-4 py-2">
                      {items.map((item, i) => (
                        <span className="pr-3" key={i}>
                          {item}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <SectionTitle>資格</SectionTitle>
          <div className="mt-4">
            {qualifications.map((qualification, i) => (
              <div key={i}>{qualification.name}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
