//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		motto: '',
		userInfo: {},
		// userIco:'http://aliyuncdn.kmjiu.com/images/test/531517383019_.pic.jpg',
		userIco: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518064011001&di=5ba4bfc1c14503c899983e60486592a4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d1865543ec5b0000019ae91b12c1.jpg',
		hasUserInfo: false,
		// canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	//事件处理函数
	bindViewTap: function () {
		//更换头像
		// var _this=this;
		// wx.chooseImage({
		// 	success: function(res) {
		// 		console.log(res)
		// 		_this.setData({
		// 			userIco:res.tempFilePaths[0]
		// 		})
		// 	},
		// })
		if(!app.globalData.userInfo){
			wx.showModal({
				title: '您拒绝了授权',
				content: '是否去打开授权,展示您帅气的头像？',
				success: (res) => {
					if (res.confirm) {
						wx.openSetting({
							success: res => {
								app.getAuthorize()
							}
						})
					}
				}
			})
		}
	},

	/**
	 * 阅读历史记录
	 */
	bindReadHistory: function (event) {
		wx.navigateTo({
			url: '../readHistory/readHistory',
		})
	},

	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true,
				userIco: app.globalData.userInfo.avatarUrl
			})
		} else {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true,
					userIco: res.userInfo.avatarUrl
				})
			}
		}
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true,
			userIco: e.detail.userInfo.avatarUrl
		})
	}
})
