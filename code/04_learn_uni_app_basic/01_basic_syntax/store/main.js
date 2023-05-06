import {
	defineStore
} from 'pinia'

const useMainStore = defineStore('main', {
	state() {
		return {
			token: '',
			userInfo: {}
		}
	},
	actions: {
		async changeTokenAction(payload) {
			this.token = payload
		},
		async changeUserInfoAction(payload) {
			this.userInfo = payload
		}
	}
})

export default useMainStore