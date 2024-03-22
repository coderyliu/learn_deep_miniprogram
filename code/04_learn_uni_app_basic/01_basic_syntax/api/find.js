import lyRequest from "./index.js";

// 请求文章列表
export const getArticleListFetch = (payload) => {
  return lyRequest.request("/find/article/list", "GET", payload);
};

// 请求文章内容根据文章Id
export const getArticleInfoByIdFetch = (articleId) => {
  return lyRequest.request(`/find/article/info/${articleId}`, "GET");
};
