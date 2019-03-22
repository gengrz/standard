layui.use([ 'form', 'layer', 'jquery', 'table' ], function() {
	var form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
	var laypage = layui.laypage;
	var $ = layui.jquery;

	var table = layui.table;

	table.render({
		id : 'userList',
		elem : '#userList',// 指定原始表格元素选择器（推荐id选择器）
		skin : 'line', // 行边框风格
		limit : 10, // 默认采用60,
		even : true,// 开启隔行背景
		cols : [ [ // 标题栏
		{
			field : 'id',
			checkbox : true
		}, {
			field : 'nickName',
			title : '用户名',
			width : 220,
			sort : true
		}, {
			field : 'account',
			title : '账号',
			width : 130,
			sort : true
		}, {
			field : 'sex',
			title : '性别',
			width : 100,
		}, {
			field : 'create_time',
			title : '注册时间',
			width : 220,
			sort : true
		}, {
			field : 'id',
			title : '操作',
			width : 220,
			toolbar : '#barDemo'
		} ] ],// 设置表头

		initSort : {
			field : 'create_time',// 排序字段，对应 cols 设定的各字段名

			type : 'desc' // 排序方式 asc: 升序、desc: 降序、null: 默认排序
		},
		url : ctx + '/system/user/listJson',
		page : true,// 开启分页
		response : {
			statusName : 'code', // 数据状态的字段名称，默认：code
			statusCode : 0, // 成功的状态码，默认：0
			msgName : 'message',// 状态信息的字段名称，默认：msg
			countName : 'count',// 数据总数的字段名称，默认：count
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	// ,…… //更多参数参考右侧目录：基本参数选项
	});

	// 监听工具条
	table.on('tool(userList)', function(obj) { // 注：tool是工具条事件名，test是table原始容器的属性
		// lay-filter="对应的值"
		var data = obj.data; // 获得当前行数据
		var layEvent = obj.event; // 获得 lay-event 对应的值
		var tr = obj.tr; // 获得当前行 tr 的DOM对象
		if (layEvent === 'detail') { // 查看
			console.log("查看");
			// do somehing
		} else if (layEvent === 'del') { // 删除
			layer.confirm('确实要删除？', function(index) {
				// 向服务端发送删除指令
				$.post(ctx + "/system/user/delUser?id=" + data.id, function(
						data) {
					obj.del(); // 删除对应行（tr）的DOM结构
					layer.close(index);
					layer.msg("已成功删除~");
				});

			});
		} else if (layEvent === 'edit') { // 编辑
			// do something

			layer.open({
				id : 'userEdit',
				title : '用户管理-编辑',
				shade : false,
				maxmin : false, // 开启最大化最小化按钮
				area : [ '700px', '500px' ],
				type : 2,
				shade : 0.4,
				shadeClose : true,
				content : ctx + '/system/user/edit/' + data.id,
				end : function() {
					table.reload('userList', {});
				}
			});
		}
	});
	table.on('sort(userList)', function(obj) { // 注：tool是工具条事件名，test是table原始容器的属性
		// lay-filter="对应的值"
		console.log(obj.field); // 当前排序的字段名
		console.log(obj.type); // 当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
		console.log(this); // 当前排序的 th 对象

		// 尽管我们的 table 自带排序功能，但并没有请求服务端。
		// 有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，如：
		table.reload('userList', {
			initSort : obj,// 记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数

			where : { // 请求参数
				sort : obj.field,// 排序字段
				order : obj.type
			// 排序方式
			}
		});
	});

	$(".search_btn").click(function() {
		var selectStr = $(".search_input").val();
		table.reload('userList', {
			where : { // 设定异步数据接口的额外参数，任意设
				nickName : selectStr
			// …
			}
		});
	});
	// 批量删除
	$(".batchDel").click(function() {
		var checkStatus = table.checkStatus('userList'); // userList即为基础参数id对应的值
		// console.log(checkStatus.data) //获取选中行的数据
		var ids = [];
		$.each(checkStatus.data, function(i, n) {
			ids.push(n.id);
		});
		$.post(ctx + "/system/user/batchDelUser?ids=" + ids, function(data) {
			layer.msg(data.message, function() {
				table.reload('userList', {});
			});
		});

	});
	$(".newsAdd_btn").click(function() {
		layer.open({
			id : 'userAdd',
			title : '用户管理-添加',
			shade : false,
			maxmin : false, // 开启最大化最小化按钮
			area : [ '700px', '500px' ],
			type : 2,
			shade : 0.4,
			shadeClose : true,
			content : ctx + '/system/user/add',
			end : function() {
				table.reload('userList', {});
			}
		});
	});
})
