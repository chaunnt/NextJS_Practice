
import { MPostRealEstate } from "@/models/postRealEstate";
import { RealEstateAPI } from "../api/realEstate";
import useSWR from 'swr'

const fetcher = (url:string) => fetch(url).then(res => res.json())
const baseUrl = "https://jsonplaceholder.typicode.com"

export default class RealEstateService {
  static async getPostListByArea(filter = {}, page = 1) { 
    const skip = 1 - page;
    const postList:any = await RealEstateAPI.getPostList(filter, skip, skip * 20);
    const postListData = [];
    for (let i = 0; i < postList.data.data.resultData.length; i++) {
      const element = new MPostRealEstate(postList.data.data.resultData[i]);
      postListData.push({...element});
    }
    return postListData;
  }

  static useGetPosts(path:string) {
    if (!path) {
      throw new Error("Path is required")
    }
    const url = baseUrl + path
    const { data, error } = useSWR(url, fetcher)
    return { data, error }
  }

  static getLangguageMeta() {
    return RealEstateAPI.getLanguageMeta();
  }
}
