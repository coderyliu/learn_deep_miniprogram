import lyReuqest from "./index.js";

// 获取用户个人信息
export const getUserInfoFetch = () => {
  return lyReuqest.request("/person/info", "GET");
};

// 实名认证
export const verifyPersonInfoFetch = (data) => {
  return lyReuqest.request("/person/real", "POST", data);
};

// 用户充值
export const payAccountMoneyFetch = (data) => {
  return lyReuqest.request("/person/pay", "POST", data);
};

// 提交系统意见
export const addSystemSuggestFetch = (data) => {
  return lyReuqest.request("/person/feedback/add", "POST", data);
};

// 添加就诊人
export const addPatientInfoFetch = (data) => {
  return lyReuqest.request("/person/patient/add", "POST", data);
};

// 修改就诊人
export const updatePatientInfoFetch = (data, id) => {
  return lyReuqest.request(`/person/patient/update/${id}`, "PUT", data);
};

// 删除就诊人
export const removePatientInfoFetch = (id) => {
  return lyReuqest.request(`/person/patient/remove/${id}`, "GET");
};

// 获取就诊人列表
export const getPatientListFetch = () => {
  return lyReuqest.request("/person/patient/list", "GET");
};

// 获取挂号列表
export const getRegisterListFetch = (payload) => {
  return lyReuqest.request("/person/register/list", "GET", payload);
};

// 获取充值订单
export const getPayOrderListFetch = (payload) => {
  return lyReuqest.request("/person/account/pay/order", "GET", payload);
};

// 获取交易记录
export const getRechargeListFetch = (payload) => {
  return lyReuqest.request("/person/recharge/pay/order", "GET", payload);
};
