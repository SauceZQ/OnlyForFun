// pages/chapterDetail/chapterDetail.js
var api = require('../../api/index.js')
// 获取全局变量
var app=getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		data: null,//解析当前章节详情对象
		hasLast: false,//是否有上一章
		hasNext: false,//是否有下一章
	},

	/**
	 * 检测是否有上一章或者下一章
	 */
	checkHasPreOrNextChapter: function () {
		this.setData({
			hasNext: this.data.data.nextPageUrl.indexOf('.html') != -1,
			hasLast: this.data.data.lastPageUrl.indexOf('.html') != -1
		})
	},

	/**
	 * 更改页码
	 */
	changePage: function (event) {
		var pageType = event.currentTarget.dataset.pageType;
		var url = '';
		switch (pageType) {
			case 'last':
				url = this.data.data.lastPageUrl;
				break;
			case 'next':
				url = this.data.data.nextPageUrl;
				break;
			default:
				wx.showToast({
					title: 'pageType error ' + pageType,
				})
				return;
		}
		//刷新数据
		this.getDetailData(url)
	},

	/**
	 * 跳转到目录
	 */
	toMune: function (e) {
		wx.navigateTo({
			url: '../chapterList/chapterlist?novelName=' + this.data.data.novelName+'&novelUrl='+this.data.data.novelUrl,
		})
	},

	/**
	 * 获取章节详情数据
	 */
	getDetailData: function (detialUrl) {
		api.getDetail(detialUrl, (data) => {
			this.setData({
				data: data
			});
			//检测上一页和下一页
			this.checkHasPreOrNextChapter()
		})
	},

	/**
	 * 保存阅读记录
	 */
	saveReadHistory: function () {
		// 如果这里没有拿到openid，得用一个标识符来代替，比如手机的一些参数信息
		var params = {
			'novelname': this.data.data.novelName,
			'openid': app.globalData.openid,
			'chapter_url': this.data.data.currentPageUrl,
			'chapter_name': this.data.data.chapterTitle
		}
		api.saveReadHistory(params, (data) => {
			console.log(data)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 章节详情页url
		var currentPageUrl = options.detailUrl;
		//获取数据
		this.getDetailData(currentPageUrl)
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
		this.saveReadHistory();
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		// console.log('detial page onUnload', this.data.data)
		this.saveReadHistory();
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