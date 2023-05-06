import lyReuqest from "./index.js";

// 分页请求医院列表
export const getHosListFetch = (payload) => {
	return lyReuqest.request("/hos/list", "GET", payload);
};

// 请求医院预约规则
export const getHosRegRuleFetch = (hosId) => {
	return lyReuqest.request(`/hos/register/rule/${hosId}`, "GET");
};

// 请求医院详情
export const getHosDetailInfoFetch = (hosId) => {
	return lyReuqest.request(`/hos/detail/info/${hosId}`, "GET");
};

// 请求医院预约须知
export const getHosKnowInfoFetch = (hosId) => {
	return lyReuqest.request(`/hos/know/info/${hosId}`, "GET");
};

// 请求医院科室门诊列表
export const getHosDepartmentListFetch = (hosId) => {
	return lyReuqest.request(`/hos/department/list/${hosId}`, "GET");
};

// 请求医院医生列表
export const getHosDoctorListFetch = (payload) => {
	return lyReuqest.request("/hos/dep/doctor/list", "GET", payload);
};

// 提交医院建议
export const addHosFeedbackFetch = (data) => {
	return lyReuqest.request("/hos/feedback/add", "POST", data);
};

// 根据医生Id请求医生详细信息
export const getDoctorInfoFetch = (doctorId) => {
	return lyReuqest.request(`/hos/doctor/info/${doctorId}`, "GET");
};

// 根据医生Id和时间请求医生当天是否有排班
export const getDoctorDutyInfoFetch = (doctorId, time) => {
	return lyReuqest.request(`/hos/doctor/duty/${doctorId}`, "GET", {
		time
	});
};

// 添加挂号
export const addRegisterFetch = (data) => {
	return lyReuqest.request("/hos/reg/add", "POST", data);
};

// 取消挂号
export const cancelRegisterFetch = (data, id) => {
	return lyReuqest.request(`/hos/reg/cancel/${id}`, "PUT", data);
};

// 获取医院停诊信息
export const getHosRegScheduleListFecth = (payload) => {
	return lyReuqest.request("/hos/register/schedule/list", "GET", payload);
};