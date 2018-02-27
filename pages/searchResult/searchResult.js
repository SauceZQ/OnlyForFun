// pages/searchResult/searchResult.js
var api = require('../../api/index.js');
var app=getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		searchRusltList: [],//搜索结果
	},

	/**
	 * 直接跳转到最新章节
	 */
	bindNewsChapter: function (event) {
		var item=event.currentTarget.dataset.item;
		wx.navigateTo({
			url: '../chapterDetail/chapterDetail?detailUrl=' + item.newsChapterUrl,
		})
	},	

	/**
	 * 跳转到章节列表
	 */
	bindChapterList:function(event){
		app.saveFormId(event);
		var item = event.currentTarget.dataset.item;		
		wx.navigateTo({
			url: '../chapterList/chapterlist?novelUrl=' + item.novelUrl +'&novelName='+item.novelName,
		})
	},

	/**
	 * 获取搜索数据
	 */
	getData: function (searchKey) {
		api.search(searchKey, resData => {
			this.setData({
				searchRusltList: resData.data.searchResult,
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var searchKey = options.searchKey;
		this.getData(searchKey);
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