import {
	defineStore
} from 'pinia'

import {
	getHosListFetch,
	getHosRegRuleFetch,
	getHosKnowInfoFetch,
	getHosDetailInfoFetch,
	getHosDepartmentListFetch,
	getHosDoctorListFetch
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
			doctorList: []
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
	}
})

export default useHosStore