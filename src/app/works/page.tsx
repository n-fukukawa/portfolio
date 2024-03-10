'use client'

import SegmentTitle from '../components/segmentTitle'
import WorkCard from './workCard'
import './style.css'

const works = [
  {
    title: '将棋学習帳',
    thumbnail: '/assets/img/shogi_app.png',
    link: 'http://52.199.138.183',
    comment: `日々の将棋の学習を記録するアプリです。学習内容ごとに色分けし、何をどれだけ学習したか一目でわかるデザインにしました。`
  },
  {
    title: 'Mini Room',
    thumbnail: '/assets/img/room.png',
    link: '/works/room.html',
    comment: `Blenderで3Dモデルを作成し、Three.jsで表示しています。モニターはシェーダーを書いてスクリーンセーバーを表現しました`
  },
  {
    title: 'Portal with fireflies',
    thumbnail: '/assets/img/portal.png',
    link: '/works/portal.html',
    comment: `Bruno Simon氏による講座の修了作品 右上のControlパネルから色々変更できます`
  },
  {
    title: 'らくらく家計簿｜シンプル無料',
    thumbnail: '/assets/img/android_hab.png',
    link: 'https://play.google.com/store/apps/details?id=com.fukulab.hab&hl=ja&gl=US',
    linkText: 'Google Playストアへ',
    comment: `◆毎日の記録| Daily Report 項目、詳細、金額を記入して、毎日の支出を記録しましょう。`
  },
  {
    title: '家計簿 スタイリッシュなデザイン',
    thumbnail: '/assets/img/ios_hab.png',
    link: 'https://apps.apple.com/jp/app/id1595453127?mt=8',
    linkText: 'App Storeへ',
    comment: `予算設定や固定支出の登録が可能。機能もデザインもシンプル。わずわらしい設定もありません`
  },
  {
    title: 'Minimal Calc',
    thumbnail: '/assets/img/minimal_calc.png',
    link: 'https://apps.apple.com/jp/app/id1573497002?mt=8',
    linkText: 'App Storeへ',
    comment: `ミニマリストのための電卓、12桁表示、パーセント計算`
  }
]
export default function Works() {
  return (
    <div className="sm:pt-6 pt-2">
      <SegmentTitle>作品</SegmentTitle>
      <div className="flex flex-wrap pt-4">
        {works.map((work, i) => (
          <div className="workcard-wrapper" key={i}>
            <WorkCard
              title={work.title}
              thumbnail={work.thumbnail}
              link={work.link}
              linkText={work.linkText}
              comment={work.comment}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
