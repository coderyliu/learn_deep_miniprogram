import {
	defineStore
} from 'pinia'

import {
	getHosListFetch
} from '@/api/hos.js'

const useHosStore = defineStore('hos', {
	state() {
		return {
			hosTotal: 0,
			hosList: []
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
					duration: 1500
				})
			}
		}
	}
})

export default useHosStore