// 定义一个网络请求类
const BASE_URL = 'http://www.coderyliu.online:3001'
// const BASE_URL = 'http://127.0.0.1:3003'
const TIMEOUT = 1000 * 30

class LyRequest {
	constructor(baseurl, timeout) {
		this.baseurl = baseurl
		this.timeout = timeout
	}

	request(url, method, data, header = {}) {
		uni.showLoading({
			title: 'loading...',
			mask: true,
		})

		try {
			const userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				header["userId"] = JSON.parse(userInfo).id;
			}

			const tokenAuth = uni.getStorageSync("token");
			if (tokenAuth) {
				header["authorization"] = JSON.parse(tokenAuth);
			}
		} catch (error) {}

		return new Promise((resolve, reject) => {
			uni.request({
				url: this.baseurl + url,
				method,
				timeout: this.timeout,
				data,
				header,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				},
				complete() {
					uni.hideLoading()
				}
			})
		})
	}

	get(url, data, header) {
		return this.request(url, 'GET', data, header)
	}

	post(url, data, header) {
		return this.request(url, 'POST', data, header)
	}
}

export default new LyRequest(BASE_URL, TIMEOUT)