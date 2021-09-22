import { post } from './_index'
import useSWR from 'swr'

const ApiModuleName = 'RealEstateRecord'

export class RealEstateAPI {
  static getPostList(filter: any, skip: number, limit: number) {
    const path = `${ApiModuleName}/postList`
    const body = {
      filter: filter,
      skip: skip,
      limit: limit
    }
    return post(path, body)
  }

  static getLanguageMeta() {
    const path = `/${ApiModuleName}/getLanguageMeta`;
    const body = {};
    return post(path, body)
      .then((res: any) => {
        if (res !== null) {
          return res.data.data.Language.values;
        }
        return [];
      });
  }

 
}
