import {
	defineStore
} from 'pinia'

import {
	getHosListFetch,
	getHosRegRuleFetch,
	getHosKnowInfoFetch,
	getHosDetailInfoFetch,
	getHosDepartmentListFetch,
	getHosDoctorListFetch,
	getHosRegScheduleListFecth,
	getDoctorInfoFetch,
	getDoctorDutyInfoFetch,
} from '@/api/hos.js'

const useHosStore = defineStore('hos', {
	state() {
		return {
			hosTotal: 0,
			hosList: [],
			knowInfo: {},
			detailInfo: {},
			ruleInfo: {},
			depList: [],
			doctorTotal: 0,
			doctorList: [],
			scheduleTotal: 0,
			scheduleList: [],
			doctorInfo: {},
			dutyInfo: {},
			columnList: [],
			timeList: [],
		}
	},
	actions: {
		async changeHosListAction(payload) {
			if (Object.prototype.toString.call(payload).slice(8, -1) !== 'Object') payload = {}

			try {
				const res = await getHosListFetch(payload)

				if (res.data.code === 1) {
					this.hosList = res.data.data?.result
					this.hosTotal = res.data.data?.total
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changeDoctorListAction(payload) {
			if (Object.prototype.toString.call(payload).slice(8, -1) !== 'Object') payload = {}

			try {
				const res = await getHosDoctorListFetch(payload)

				if (res.data.code === 1) {
					this.doctorList = res.data.data?.result
					this.doctorTotal = res.data.data?.total
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changeRuleInfoAction(hosId) {
			try {
				const res = await getHosRegRuleFetch(hosId)

				if (res.data.code === 1) {
					this.ruleInfo = res.data.data[0]
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changeKnowInfoAction(hosId) {
			try {
				const res = await getHosKnowInfoFetch(hosId)

				if (res.data.code === 1) {
					this.knowInfo = res.data.data[0]
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changeDetailInfoAction(hosId) {
			try {
				const res = await getHosDetailInfoFetch(hosId)

				if (res.data.code === 1) {
					this.detailInfo = res.data.data[0]
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changeDepListAction(hosId) {
			try {
				const res = await getHosDepartmentListFetch(hosId)

				if (res.data.code === 1) {
					this.depList = res.data.data
				} else {
					throw new Error('error')
				}
			} catch (e) {
				console.log(e);
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changeScheduleListAction(payload) {
			try {
				const res = await getHosRegScheduleListFecth(payload)

				if (res.data.code === 1) {
					this.scheduleList = res.data.data?.result
					this.scheduleTotal = res.data.data?.total
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: "error",
					duration: 1500
				})
			}
		},
		async changDoctorInfoAction(doctorId) {
			try {
				const res = await getDoctorInfoFetch(doctorId)

				if (res.data.code === 1) {
					this.doctorInfo = res.data?.data[0]
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: 'error',
					duration: 1500
				})
			}
		},
		async changDoctorDutyInfoAction(doctorId, time) {
			try {
				const res = await getDoctorDutyInfoFetch(doctorId, time)

				if (res.data.code === 1) {
					let columnList = [];
					if (res.data?.data[0]?.mSurplus && res.data?.data[0]?.aSurplus) {
						columnList = ["上午", "下午"];
					} else if (res.data?.data[0]?.mSurplus) {
						columnList = ["上午"];
					} else if (res.data?.data[0]?.aSurplus) {
						columnList = ["下午"];
					}

					this.dutyInfo = res.data?.data[0]
					this.timeList = columnList
				} else {
					throw new Error('error')
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: 'error',
					duration: 1500
				})
			}
		},
	}
})

export default useHosStore