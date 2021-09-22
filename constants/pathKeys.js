import { removeVietnameseAccent } from "../utils/common";

export default {
  HOME: "/home",
  ABOUT: "/about",
  LOGIN: "/login",
  ROOT: "/",
  DASHBOARD: "/dashboard",
  VILLA: "/?ar_tn=Biệt thự",
  ALLEYHOUSE: "/?ar_tn=Nhà hẻm",
  THEGROUND: "/?ar_tn=Đất nền",
  TOWNHOUSE: "/?ar_tn=Nhà phố",
  APARTMENT: "/?ar_tn=Chung cư",
  PROJECT: "/?ar_tn=Dự Án",
  FACTORY: "/?ar_tn=Nhà Xưởng",
  INDUSTRY: "/?ar_tn=Đất khu công nghiệp",
  ANOTHER: "/?ar_tn=khác",
  FOR_SALE: `/${removeVietnameseAccent("Rao bán").replace(/\s/g, '-')}/list?syt_spt=Rao bán`,
  FOR_RENT: `/${removeVietnameseAccent("Cho thuê").replace(/\s/g, '-')}/list?syt_spt=Cho thuê`,
  FOR_CONTACT: `/${removeVietnameseAccent("Liên hệ").replace(/\s/g, '-')}/list?syt_spt=Liên hệ`,

};
