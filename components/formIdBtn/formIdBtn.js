// compoents/FormIdBtn/formIdBtn.js
Component({
	options:{
		// multipleSlots:true //组件定义时启用 slot 支持
	},
	/**
	 * 	 组件属性列表
	 */
	properties:{

	},

	/**
	 * 私有数据 组件初始数据
	 */
	data:{

	},

	/**
	 * 组件的方法列表 
	 */
	methods:{
		/**
		 * 内部私有方法 
		 * triggerEvent 用于触发
		 */
		_bindsubmit(e){
			var submitDetail=e.detail;
			this.triggerEvent('bindsubmit',submitDetail)
		}
	}


})