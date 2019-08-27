/*
* 1.下载导入vue.js  npm i vue
* 2.渲染数据到页面  并且判断有没有数据
* 3.按回车添加数据到列表中  默认是添加到第一排的
* 4.全选按钮的样式改变
* 5.删除对应项  删除已经完成的任务  计算剩余的任务
* 6.双击编辑  按回车保存 去掉编辑样式  按esc还原
* 7.点击三个a链接 显示对应的列表项 修改a的样式
* 8.刷新默认自动聚焦功能
* 9.双击自动聚焦
* */
//表示该文件全局依赖vue
(function (Vue) {
	//使用严格模式  形参
	// 'use strict';
	//定义数据
	const list=[
		{id:1,title:'重复',completed:true},
		{id:2,title:'重复2',completed:true},
		{id:3,title:'重复3',completed:false},
	]
	window. vm=new Vue({
		el:"#app",
		data:{
			//存储数据
			title:'TodoList',
			list,
			//中间变量
			isTrue:null,
            status:"all"
		},
		methods:{
          //3.按回车添加数据
            add(e){
            	//获取输入框的内容 判断有没有 event事件
				console.log(e.target);
				console.log(e.target.value);
				let test=e.target.value.trim();
				if(!test) return false;
				//优化全部删除之后无法添加数据
				let last=this.list[this.list.length-1];  //最后一个元素
				//判断最后一个元素有没有 如果有最后一个元素里面的id+1 假就让当前的id=1
				let id=last?list.id+1:1;
				//获取id 添加进去 最后一个id加1
				//let id=this.list[this.list.length-1].id+1;
				this.list.push({id:id,title:test,completed:false})

				e.target.value='';
            },
		 //4.点击全选按钮
		    toggleAll(e){
            	//获取状态
				console.log(e.target.checked);
				//将状态赋值
				let checked=e.target.checked;
				this.list.forEach((item)=>{
					item.completed=checked;
				})
			},
		 //5.删除对应项 计算剩余的选项
			remove(index,e){
            	this.list.splice(index,1)
			},
			//删除完成的
			removeAll(){
                // //判断已经完成的任务项
				// this.list.forEach((item,i)=>{
                 //    if(item.completed){
                 //    	this.list.splice(i,1);
				// 	}
					//删除不干净的问题  删完重新排序
				// })
				//方法一
				// for(let i=0;i<this.length;i++){
				// 	if(this.list[i].completed){
				// 		this.list.splice(i,1);
				// 		i--;
				// 	}
				// }
				//方法二  filter()   把没有完成的数据过滤出来  重新赋值给list
				this.list=this.list.filter((item)=>{
					return !item.completed;
				})
			},
			//计算剩余的任务项
			getCount(){
            	return this.list.filter(item=>item.completed).length
			},
			//6.双击编辑任务项 回车保存去掉编辑样式  非空校验 esc还原
			dblclick(item,index,event){
            	//双击编辑  回车保存   使用中间变量判断item
				//获取编辑文本框的数据
				let editText=event.target.value.trim();
				//非空校验
				if(!editText.length&&this.isTrue==item){
					//先去除编辑样式  包括是否聚焦
					this.isTrue=null;
					this.list.splice(index,1);
					return false;
				}
				//修改当前的title数据  保存状态  数据驱动视图
				item.title=editText;
				this.isTrue=null;
			}
		},
        computed:{
			//计算剩余的任务项
			getCounto(){
				return this.list.filter(item=>item.completed).length
			},
            filterList:function(){
            	switch(this.status){
					case "active":
						return this.list.filter(item=>!item.completed);
						break;
					case "completed":
						return this.list.filter(item=>item.completed);
						break;
					default:
						return this.list;
						break;
				}
			},
			//使用计算属性来设置全选
			checkedAll(){
				//every() 用于检测数组中的元素是否满足指定的条件  如果都满足返回true 一假即假
				let res=this.list.every(item=>{
					console.log(item.completed);
					return item.completed;
				});
				return res;
			}
		},
		//局部自定义指令
		directives:{
			"editing":{
				update(el,binding){
					if(binding.value){
						el.focus()
					}
				}
			}
		}
	})

	 //7.点击3个a标签
     //onhashchange  获取路由地址  只有改变时才会触发
     window.onhashchange=function(){
		//获取点击时的路由
		 console.log(location.hash);
		 //截取路由后面的字符串 以第二个后面开始截取
		 let hash=location.hash.substr(2) || "all";
		 vm.status=hash;  //赋值到当前实例
	 }
	 //页面加载进来初始化事件
	window.onhashchange();
})(Vue);
//实参
