export default {
	// 为模块开启命名空间
	namespaced: true,
	state: () => {
		return {
			// 每个加入购物车的商品都应该包含以下几个属性
			// {goods_id,goods_name,goods_price,goods_state,goods_small_logo,goods_count}
			carts: JSON.parse(uni.getStorageSync('carts') || '[]')
		}
	},
	actions: {},
	mutations: {
		// 把商品信息保存到vuex中数据共享
		addToCart(state, goods) {
			// 根据提交的商品id,查询购物车中是否存在这件商品
			// 如果不存在，则findResult为undefined，否则，为查找到的商品信息对象
			const findResult = state.carts.find(x => x.goods_id === goods.goods_id)

			if (!findResult) {
				// 如果购物车中没有这件商品，直接push
				state.carts.push(goods)
			} else {
				// 如果有这件商品，只更新数量
				findResult.goods_count += 1
			}

			// 数据持久化更新本地storage中的数据
			this.commit('cart/saveToStorage')
		},
		// vuex的数据持久化
		saveToStorage(state) {
			uni.setStorageSync('carts', JSON.stringify(state.carts))
		}
	},
	getters: {
		// 统计购物车中商品的总数量
		total(state) {
			return state.carts.reduce((pre, cur) => {
				return pre + cur.goods_count
			}, 0)
		}
	}
}
