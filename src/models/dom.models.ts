import { TranslationLang } from '@/models/store.models'
import { ResultData } from '@/models/post'

export interface INavItem {
  src: string
  path: string
}

export interface ITranslationItem {
  key: TranslationLang
  text: string
  flag: string
}

export interface ISearchTenureItem {
  icon: string
  activeIcon: string
  translationKey: string
}

export interface IPostsProps {
  className?: string
  data: Array<ResultData>
}
