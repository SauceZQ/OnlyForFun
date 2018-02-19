// pages/chapterList/chapterlist.js
var api = require("../../api/index.js")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		novelName: '',//小说名
		novelUrl: '',//小说url		
		chapterList: [],//小说章节名
		page: 0,//页码
		limit: 20,//每页限制章节数
		pageArray: [],//页码集合
		totalPage: 0,//最大页码
		orderBy: 1,//排序 默认正序 1为正序 2为倒序
		empty:false,//是否为空
	},

	/**
	 * 跳转章节详情
	 */
	bindChapterTap: function (event) {
		var item = event.currentTarget.dataset.item
		wx.navigateTo({
			// url: '../chapterDetail/chapterDetail?item=' + JSON.stringify(item),
			url: '../chapterDetail/chapterDetail?detailUrl=' + item.href,
		})
	},
	/**
	 * 获取小说列表
	 */
	getList: function () {
		api.getChapterList(this.data.novelUrl, this.data.page + 1, this.data.limit,this.data.orderBy,(data) => {
			console.log('返回数据', data)
			var pageArr = [];
			var totalPage=data.total_page;
			for (var index = 1; index <= totalPage ; index++) {
				pageArr.push('第' + index + '页')
			}
			this.setData({
				empty:data.data.length==0,
				chapterList: data.data,
				pageArray: pageArr,
				totalPage: totalPage
			})
		})
	},

	/**
	 * 页码选择
	 */
	bindPickerChange: function (e) {
		console.log(e.detail.value)
		this.setData({
			page: parseInt(e.detail.value)
		})
		//刷新页面数据
		this.getList()
	},

	/**
	 * 切换页码 以及排序
	 * next 下一页
	 * last 上一页
	 * 
	 */
	changePage: function (event) {
		var pageType = event.currentTarget.dataset.pageType;
		switch (pageType) {
			case 'next':
				this.setData({
					page: this.data.page + 1
				})
				break;
			case 'last':
				this.setData({
					page: this.data.page - 1
				})
				break;
			case 'orderBy':
				this.setData({
					orderBy: this.data.orderBy==1?2:1,
					page:0,
				})
				break;
			default:
				wx.showToast({
					title: 'page type switch erro' + pageType,
				});
				return
		}
		//刷新数据
		this.getList()
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			novelName: options.novelName,
			novelUrl: options.novelUrl,
		})
		//搜索
		this.getList()
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