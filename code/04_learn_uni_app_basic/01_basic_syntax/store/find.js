import {
	defineStore
} from 'pinia'

import {
	getArticleListFetch,
	getArticleInfoByIdFetch
} from '@/api/find.js'

const useFindStore = defineStore('find', {
	state() {
		return {
			articleInfo: {},
			total: 0,
			articleList: [],
		}
	},
	actions: {
		async changeArticleListAction(payload) {
			try {
				const res = await getArticleListFetch(payload)

				if (res.data.code === 1) {
					this.articleList = res.data.data?.result
					this.total = res.data.data?.total
				}
			} catch (e) {
				return uni.showToast({
					title: '网络异常',
					icon: 'error',
					duration: 1500
				})
			}
		},
		async changeArticleInfoAction(articleId) {
			try {
				const res = await getArticleInfoByIdFetch(articleId)

				if (res.data.code === 1) {
					this.articleInfo = res.data.data[0]
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

export default useFindStore