
import { MPostRealEstate } from "@/models/postRealEstate";
import { RealEstateAPI } from "../api/realEstate";

export default class RealEstateService {
  static async getPostListByArea(filter = {}, page = 1) { 
    const skip = 1 - page;
    const postList:any = await RealEstateAPI.getPostList(filter, skip, skip * 20);
    if(!postList){
      return [];
    }
    const postListData = [];
    for (let i = 0; i < postList.data.data.resultData.length; i++) {
      const element = new MPostRealEstate(postList.data.data.resultData[i]);
      postListData.push({...element});
    }
    return postListData;
  }
}
