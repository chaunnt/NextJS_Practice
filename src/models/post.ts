export interface Post {
  allCount: Number,
  resultData: Array<ResultData>,
  metadata: Array<Metadata>,
}

interface Metadata {
  type?: string,
  name?: string,
  content?: string,
  property?: string,
}

interface ResultData {
  title?: string,
  shortDesc?: string,
  fullDesc?: string,
  id?: string,
  updatedAt?: string,
  ViewCount?: string,
  ClickCount?: string,
  ShareCount?: string,
  InvestmentRating?: string,
  ValueSalePrice?: string,
  ValueSaleUnitPrice?: string,
  ValueDiscussPrice?: string,
  ValueLandUnitPrice?: string,
  ValueHouseUnitPrice?: string,
  ValueHousePrice?: string,
  ValueLandPrice?: string,
  ValueRentPrice?: string,
  ValueRentUnitPrice?: string,
  StatusCheckLandPlanning?: string,
  StatusCheckStrongPoint?: string,
  StatusCheckWeakPoint?: string,
  StatusCheckLandPosition?: string,
  StatusCheckLandConvenience?: string,
  StatusCheckInvestmentValue?: string,
  StatusCheckRentableValue?: string,
  StatusCheckSystemRecordType?: string,
  StatusCheckDateLandPlanning?: string,
  StatusCheckDateStrongPoint?: string,
  StatusCheckDateWeakPoint?: string,
  StatusCheckDateLandPosition?: string,
  StatusCheckDateLandConvenience?: string,
  StatusCheckDateInvestmentValue?: string,
  StatusCheckDateRentableValue?: string,
  StatusCheckDateSystemRecordType?: string
}
