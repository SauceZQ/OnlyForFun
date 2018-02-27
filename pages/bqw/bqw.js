
var storageKey = 'bqw_history_search';
var app=getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		search_name: '',//搜索的小说名
		searchHistoryArray: [],//历史记录
	},

	// 输入框事件监听
	bindKeyInput: function (e) {
		this.setData({
			search_name: e.detail.value
		})

	},
	
	//搜索按钮 
	search: function (e) {
		console.log("搜索=",e)
		app.saveFormId(e);
		var historySearchName = e.currentTarget.dataset.searchName;
		if (this.data.search_name.trim() == '' && historySearchName == undefined) {
			wx.showToast({
				title: '请输入小说名',
				icon: 'none'
			})
			return;
		}
		wx.showLoading({
			title: '正在加载...',
		})
		// 如果是点击历史记录则按历史记录搜索
		var searchKey = historySearchName ? historySearchName : this.data.search_name;
		//保存搜索记录到本地，存之前删除已有的
		var index = this.data.searchHistoryArray.indexOf(searchKey);
		if (index != -1) {
			this.data.searchHistoryArray.splice(index, 1);
		}
		this.data.searchHistoryArray.unshift(searchKey);
		this.setData({
			searchHistoryArray: this.data.searchHistoryArray,
		})
		wx.setStorage({
			key: storageKey,
			data: JSON.stringify(this.data.searchHistoryArray),
		})
		// console.log("存入数据=", this.data.searchHistoryArray)
		// 跳转
		wx.navigateTo({
			url: '../searchResult/searchResult?searchKey=' + searchKey
		})
		wx.hideLoading()
	},
	/***
	 * 清空搜索记录
	 */
	clearHistorySearch: function (e) {
		app.saveFormId(e)
		try{
			wx.removeStorageSync(storageKey);
			this.setData({
				searchHistoryArray:[]
			})
			wx.showToast({
				title: '清空成功',
				icon: 'success',
				duration:1500
			})
		}catch(e){
			wx.showToast({
				title: '清空失败',
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 加载历史记录
		try {
			var historySearch = wx.getStorageSync(storageKey);
			if (historySearch != '') {
				this.setData({
					searchHistoryArray: JSON.parse(historySearch)
				})
			}
		} catch (e) {
			console.log(e)
			wx.showToast({
				title: '查找本地搜索记录失败,' + e,
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// console.log("用户信息=", app.globalData.userInfo)		
		// if(!app.globalData.userInfo){
		// 	app.userInfoReadyCallback = res => {
		// 		console.log("回调=",res)
		// 	}
		// }
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})