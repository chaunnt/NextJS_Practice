export class MPost {
  title: string = "";
  description: string = "";
  id: string = "";
  updatedAt: string = "";
  viewCount: string = "";
  clickCount: string = "";
  shareCount: string = "";
 
  constructor(parameters : any) {
    this.title = parameters.SystemRecordTitle;
    this.description = parameters.SystemRecordContent;
    this.id = parameters._id;
    this.updatedAt = parameters.UpdatedAt;
    this.viewCount = parameters.ViewCount;
    this.clickCount = parameters.ClickCount;
    this.shareCount = parameters.ShareCount;
  }
}
