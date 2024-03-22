import { defineStore } from "pinia";

import {
  getRegisterListFetch,
  getRechargeListFetch,
  getPayOrderListFetch,
  getPatientListFetch,
} from "@/api/person.js";

const usePersonStore = defineStore("person", {
  state() {
    return {
      registerTotal: 0,
      registerList: [],
      payTotal: 0,
      rechargeTotal: 0,
      payList: [],
      rechargeList: [],
      patientList: [],
      columnList: [],
    };
  },
  actions: {
    async changeRegisterListAction(payload) {
      try {
        const res = await getRegisterListFetch(payload);

        if (res.data.code === 1) {
          this.registerList = res.data.data?.result;
          this.registerTotal = res.data.data?.total;
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
    async changePayListAction(payload) {
      try {
        const res = await getPayOrderListFetch(payload);

        if (res.data.code === 1) {
          this.payList = res.data.data?.result;
          this.payTotal = res.data.data?.total;
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
    async changeRechargeListAction(payload) {
      try {
        const res = await getRechargeListFetch(payload);

        if (res.data.code === 1) {
          this.rechargeList = res.data.data?.result;
          this.rechargeTotal = res.data.data?.total;
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
    async changePatientListAction(payload) {
      try {
        const res = await getPatientListFetch(payload);

        if (res.data.code === 1) {
          this.patientList = res.data.data;

          this.columnList = res.data.data.map(
            (v) => v.name + " - " + (v.sex ? "男" : "女")
          );
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

export default usePersonStore;
