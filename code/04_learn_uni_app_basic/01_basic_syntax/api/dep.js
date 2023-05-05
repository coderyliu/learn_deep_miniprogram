import lyReuqest from "./index.js";

// 获取所有的科室门诊列表
export const getAllDepListFetch = () => {
	return lyReuqest.request("/dep/list", "GET");
};

// 获取科室门诊列表根据depName
export const getDepListByDepNameFetch = (payload) => {
	return lyReuqest.request("/dep/search", "GET", payload);
};