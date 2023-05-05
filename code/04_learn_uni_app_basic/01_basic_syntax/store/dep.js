import {
	defineStore
} from 'pinia'

import {
	getAllDepListFetch,
	getDepListByDepNameFetch
} from '@/api/dep.js'

const useDepStore = defineStore('dep', {
	state() {
		return {
			depList: [],
			searchDepList: []
		}
	},
	actions: {
		async changeDepartmentListAction() {
			try {
				const res = await getAllDepListFetch()

				if (res.data.code === 1) {
					this.depList = res.data?.data
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
		async changeSearchDepListAction(payload) {
			try {
				const res = await getDepListByDepNameFetch(payload)

				if (res.data.code === 1) {
					const depList = res.data?.data;

					const obj = {};
					for (const item of depList) {
						if (!obj[item.hosId]) {
							obj[item.hosId] = {
								hosId: item.hosId,
								hosName: item.hosName,
								picture: item.picture,
								levelText: item.levelText,
								openTimeText: item.openTimeText,
								children: [{
									id: item.id,
									depName: item.depName,
								}, ],
							};
						} else {
							obj[item.hosId].children.push({
								id: item.id,
								depName: item.depName,
							});
						}
					}
					const newArr = Object.values(obj);

					this.searchDepList = newArr
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
	}
})

export default useDepStore