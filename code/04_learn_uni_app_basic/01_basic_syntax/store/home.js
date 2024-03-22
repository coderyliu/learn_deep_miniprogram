import { defineStore } from "pinia";

import { getHomeBannerListFetch } from "@/api/home.js";
import { getArticleListFetch } from "@/api/find.js";

const useHomeStore = defineStore("home", {
  state() {
    return {
      bannerList: [],
      articleList: [],
    };
  },
  actions: {
    async changeHomeBannerListAction() {
      try {
        const res = await getHomeBannerListFetch();
        if (res.data.code === 1) {
          this.bannerList = res.data?.data;
        } else {
          throw new Error("error");
        }
      } catch (e) {
        return uni.showToast({
          title: "网络异常",
          icon: "error",
          duration: 1500,
        });
      }
    },
    async changeArticleListAction() {
      try {
        const res = await getArticleListFetch();
        if (res.data.code === 1) {
          this.articleList = res.data.data?.result;
        } else {
          throw new Error("error");
        }
      } catch (e) {
        return uni.showToast({
          title: "网络异常",
          icon: "error",
          duration: 1500,
        });
      }
    },
  },
});

export default useHomeStore;
