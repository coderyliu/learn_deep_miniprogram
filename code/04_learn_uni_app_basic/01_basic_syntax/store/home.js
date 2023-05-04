import {
	defineStore
} from 'pinia'

import {
	getHomeBannerListFetch
} from '@/api/home.js';

const useHomeStore = defineStore('home', {
	state() {
		return {
			bannerList: []
		}
	},
	actions: {
		async changeHomeBannerListAction() {
			try {
				const res = await getHomeBannerListFetch()
				if (res.data.code === 1) {
					this.bannerList = res.data?.data
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

export default useHomeStore