export class MPost {
  title: string;
  description: string;
  id: string;
  updatedAt: string;
  viewCount: number;
  shareCount: number ;
  phoneCallCount: number;
  messageCallCount: number;
  emailCount: number;
 
  constructor(parameters : any) {
    this.title = parameters.SystemRecordTitle ||"";
    this.description = parameters.SystemRecordContent || "";
    this.id = parameters._id;
    this.updatedAt = parameters.UpdatedAt || "";
    this.viewCount = parameters.ViewCount|| 0;
    this.shareCount = parameters.ShareCount || 0;
    this.phoneCallCount = parameters.phoneCallCount || 0;
    this.messageCallCount = parameters.messageCallCount || 0;
    this.emailCount = parameters.EmailCount || 0;
  }

}
