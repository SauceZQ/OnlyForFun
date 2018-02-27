/**
 * 网络请求
 */

var host = 'https://www.sauce1024.com/';
// var host = 'http://127.0.0.1:9000/';

// 搜索接口
var search_url = host + 'bqwapi/search/';
//获取章节列表接口
var get_chapter_list_url = host + 'bqwapi/chapterlist';
// 获取详情接口
var detail_url = host + 'bqwapi/getDetail';
// 保存阅读记录接口
var save_read_history_url = host + 'bqwapi/readHistory';
// 获取阅读记录接口
var get_read_history_url = host + 'bqwapi/readHistory';
//获取 openid 接口
var get_openid_url = host + 'bqwapi/wxauthorization';
// 保存 form_id 接口
var save_wx_formid_url = host +'bqwapi/formId';

// 搜索方法
var search = function (searchKey,callback) {
	wx.showLoading({
		title: '正在加载...',
	});
	var data;
	wx.request({
		url: search_url + searchKey,
		success: function (res) {
			// console.log(res.data)
			callback(res.data);
			// 回到顶部
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			wx.hideLoading();
		},
		fail: function (e) {
			console.log(e)
			wx.showToast({
				title: e.toString(),
				icon: 'none',
			})
			wx.hideLoading()
		}
	})
}

// 获取章节列表
var getChapterList = function (novelUrl, page, limit, orderBy, callback) {
	page = page ? page : 1;
	limit = limit ? limit : 20;
	wx.showLoading({
		title: '正在加载...',
	});
	var data;
	wx.request({
		url: get_chapter_list_url,
		data: {
			novelUrl: novelUrl,
			page: page,
			limit: limit,
			orderBy: orderBy
		},
		success: function (res) {
			// console.log(res.data)
			callback(res.data);
			// 回到顶部
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			wx.hideLoading();
		},
		fail: function (e) {
			console.log(e)
			wx.showToast({
				title: e.toString(),
				icon: 'none',
			})
			wx.hideLoading()
		}
	})
}

// 获取详情
var getDetail = function (chapterUrl, callback) {
	wx.showLoading({
		title: '正在加载...',
	});
	wx.request({
		url: detail_url,
		data: {
			detailUrl: chapterUrl
		},
		success: function (res) {
			callback(res.data)
			// 回到顶部
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			wx.hideLoading()
		},
		fail: function (e) {
			wx.showToast({
				title: e.toString(),
				icon: 'none',
			})
			wx.hideLoading()
		}
	})
}

// 保存阅读记录
var saveReadHistory = function (params, callback) {
	wx.request({
		url: save_read_history_url,
		method: 'POST',
		data: params,
		success: function (res) {
			callback(res.data);
		},
		fail: function () {
			wx.showToast({
				title: e.toString(),
				icon: 'none',
			});
		}
	})
}

//获取阅读记录
var getReadHistory = function (openid, callback) {
	wx.showLoading({
		title: '正在加载...',
	});
	wx.request({
		url: get_read_history_url,
		data: {
			'openid': openid
		},
		success: function (res) {
			callback(res.data);
			wx.hideLoading();
		},
		fail: function (e) {
			console.log(e.toString());
			wx.showToast({
				title: 'get read history error',
				icon: 'none',
			})
			wx.hideLoading();
		}
	})
}

// 获取openid
var getOpenId = function (jsCode, callback) {
	wx.request({
		url: get_openid_url,
		method: 'POST',
		data: {
			'js_code': jsCode
		},
		success: function (res) {
			if (res.data.error_code == 0) {
				callback(res.data)
			} else {
				wx.showToast({
					title: 'get openid error!',
					icon: 'none',
				})
			}
		},
		fail: function (e) {
			console.log("获取openid失败", e)
			wx.showToast({
				title: e.toString(),
				icon: 'none',
			});
		}
	})
}

// 保存 form_id
// 不用 回调，保存成功与否不重要
var saveFormId=function(openId,formId){
	wx.request({
		url: save_wx_formid_url,
		method:'POST',
		data:{
			'openId':openId,
			'formId':formId,
		},
		success:res=>{
			if(res.data.error_code==0){
				console.log("保存 formId 成功！", res)
			}else{
				console.log("保存 formId 失败!", res)				
			}
		}
	})
}

//test
var test = function (params, callback) {
	var testurl = host + 'api/authenticate'
	wx.request({
		url: testurl,
		method: 'POST',
		data: params,
		success: function (res) {
			console.log("测试接口", res)
			callback(res.data)
		}
	})
}


module.exports = {
	search: search,
	getChapterList: getChapterList,
	getDetail: getDetail,
	saveReadHistory: saveReadHistory,
	getReadHistory: getReadHistory,
	getOpenId: getOpenId,
	saveFormId: saveFormId,
	test: test,
};