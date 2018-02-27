//app.js
var api=require('./api/index.js')
var OPENID_STORAGE_KEY='openid'
App({

	/**
	 * 登陆操作
	 */
	doLogoin:function(){
		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				api.getOpenId(res.code, resData => {
					//保存一份全局变量 
					this.globalData.openid = resData['openid']
					//保存一份本地数据
					wx.setStorageSync(OPENID_STORAGE_KEY, resData['openid'])
				})
			}
		})
	},

	/**
	 * 授权操作
	 */
	getAuthorize:function(){
		// 获取用户信息
		wx.getSetting({
			success: res => {			
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况·
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				} else {					
					//未获取授权，申请获取用户信息授权
					var _this=this;
					wx.authorize({
						scope: 'scope.userInfo',
						success(errMsg){							
							console.log('get authorize success!')
							_this.getAuthorize()
						},
						fail(e){
							console.log("get authorize error",e)
						}
					})
				}
			}
		})
	},

	onLaunch: function () {
		//登陆
		this.doLogoin();
		//获取用户信息
		this.getAuthorize();
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs);
		
	},

	//保存formid
	saveFormId: function (e) {
		var formId = e.detail.formId;
		var openid = this.globalData.openid
		if (openid == '' || openid == undefined) {
			this.doLogoin();
			// 这里没有openid 则获取一次，但是获取过程是异步的，所以这一次 formid 则不用保存了
			return;
		}
		api.saveFormId(openid, formId)
	},
	
	globalData: {
		userInfo: null,
		openid:'',
		bgimg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517830816238&di=8c8281d1f3029588a1873b17ff7fcb20&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1412%2F03%2Fc6%2F189091_1417587575892_1024x1024.jpg'
	}
})