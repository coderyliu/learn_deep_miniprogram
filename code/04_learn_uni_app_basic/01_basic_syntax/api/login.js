import lyReuqest from "./index.js";

// 发送手机验证码
export const sendPhoneCaptchaFetch = (payload) => {
  return lyReuqest.request("/login/phoneCat/send", "POST", payload);
};

// 验证码登录
export const loginWithCaptchaFetch = (payload) => {
  return lyReuqest.request("/login/phoneCat/log", "POST", payload);
};
