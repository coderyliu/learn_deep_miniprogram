import {
	defineStore
} from 'pinia'

const useMainStore = defineStore('main', {
	state() {
		return {
			token: '',
			userInfo: {
				name: "coderyliu"
			}
		}
	}
})

export default useMainStore