// pages/readHistory/readHistory.js
var api = require('../../api/index.js')
var app = getApp()
var OPENID_STORAGE_KEY = 'openid'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		readHistoryList: [],//阅读历史
	},

	/**
	 * 获取阅读记录
	 */
	getReadHistoryData: function () {
		var openid = app.globalData.openid;
		if (openid == '') {
			openid = wx.getStorageSync(OPENID_STORAGE_KEY)
		}
		api.getReadHistory(openid, resData => {
			this.setData({
				readHistoryList: resData.data.read_historys
			})
		})
	},

	/**
	 * 跳转到章节详情
	 */
	bindReadHistoryItem:function(event){
		var item=event.currentTarget.dataset.item
		wx.navigateTo({
			url : '../chapterDetail/chapterDetail?detailUrl='+item.chapter_url,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
		this.getReadHistoryData();
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