import lyRequest from "./index.js";

// 请求首页轮播图
export const getHomeBannerListFetch = () => {
  return lyRequest.request("/home/banner/list", "GET");
};
