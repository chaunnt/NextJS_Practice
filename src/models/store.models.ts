export interface IAppStore {
  common: any
}

export enum TranslationLang {
  Vi = 'vi',
  En = 'en'
}

export interface ICommonStore {
  lang: TranslationLang
}
