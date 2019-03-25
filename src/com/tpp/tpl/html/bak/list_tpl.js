layui.use([ 'form', 'layer', 'jquery', 'table' ], function() {
	var form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
	var laypage = layui.laypage;
	var $ = layui.jquery;

	var table = layui.table;

	table.render({
		id : '#(classNameSmall)List',
		elem : '##(classNameSmall)List',// 指定原始表格元素选择器（推荐id选择器）
		skin : 'line', // 行边框风格
		limit : 10, // 默认采用60,
		even : true,// 开启隔行背景
		cols : [ [ // 标题栏
			{
				field : '#(tablemeta.primaryKey??)',
				checkbox : true
			},
			#for(x : tablemeta.columnMetas)
			{
				field : '#(x.name)',
				title : '#if(x.remarks)#(x.remarks)#else#(x.name)#end',
				width : 150,
				sort : true
			},
		    #end
		{
			title : '操作',
			width : 220,
			toolbar : '##(classNameSmall)Bar'
		} 
		
		] ],// 设置表头

		initSort : {
			field : '#(tablemeta.primaryKey??)',// 排序字段，对应 cols 设定的各字段名
			type : 'desc' // 排序方式 asc: 升序、desc: 降序、null: 默认排序
		},
		url : ctx + '/system/#(classNameSmall)/listJson',
		page : true,// 开启分页
		response : {
			statusName : 'code', // 数据状态的字段名称，默认：code
			statusCode : 0, // 成功的状态码，默认：0
			msgName : 'message',// 状态信息的字段名称，默认：msg
			countName : 'count',// 数据总数的字段名称，默认：count
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});

	// 监听工具条
	table.on('tool(#(classNameSmall)List)', function(obj) { // 注：tool是工具条事件名，test是table原始容器的属性
		// lay-filter="对应的值"
		var data = obj.data; // 获得当前行数据
		var layEvent = obj.event; // 获得 lay-event 对应的值
		var tr = obj.tr; // 获得当前行 tr 的DOM对象
		if (layEvent === 'del') { // 删除
			layer.confirm('确实要删除？', function(index) {
				// 向服务端发送删除指令
				$.post(ctx + "/system/#(classNameSmall)/del?id=" + data.id,
						function(data) {
							obj.del(); // 删除对应行（tr）的DOM结构
							layer.close(index);
							layer.msg("已成功删除~");
						});

			});
		} else if (layEvent === 'edit') { // 编辑
			// do something

			layer.open({
				id : '#(classNameSmall)Edit',
				title : '#if(tablemeta.remarks)#(tablemeta.remarks)#else#(tableName)#end-编辑',
				shade : false,
				maxmin : false, // 开启最大化最小化按钮
				area : [ '700px', '400px' ],
				type : 2,
				shade : 0.4,
				shadeClose : true,
				content : ctx + '/system/#(classNameSmall)/edit/' + data.id,
				end : function() {
					table.reload('#(classNameSmall)List', {});
				}
			});
		}
	});
	table.on('sort(#(classNameSmall)List)', function(obj) { // 注：tool是工具条事件名，test是table原始容器的属性
		// lay-filter="对应的值"
		console.log(obj.field); // 当前排序的字段名
		console.log(obj.type); // 当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
		console.log(this); // 当前排序的 th 对象

		// 尽管我们的 table 自带排序功能，但并没有请求服务端。
		// 有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，如：
		table.reload('#(classNameSmall)List', {
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
		table.reload('#(classNameSmall)List', {
			where : { // 设定异步数据接口的额外参数，任意设
				name : selectStr
			// …
			}
		});
	});
	// 批量删除
	$(".batchDel").click(
			function() {
				var checkStatus = table.checkStatus('#(classNameSmall)List'); // #(classNameSmall)List即为基础参数id对应的值
				// console.log(checkStatus.data) //获取选中行的数据
				var ids = [];
				$.each(checkStatus.data, function(i, n) {
					ids.push(n.id);
				});
				$.post(ctx + "/system/#(classNameSmall)/batchDel?ids=" + ids,
						function(data) {
							layer.msg(data.message, function() {
								table.reload('#(classNameSmall)List', {});
							});
						});

			});
	$(".#(classNameSmall)_add_btn").click(function() {
		layer.open({
			id : '#(classNameSmall)Add',
			title : '#if(tablemeta.remarks)#(tablemeta.remarks)#else#(tableName)#end-添加',
			shade : false,
			maxmin : false, // 开启最大化最小化按钮
			area : [ '700px', '400px' ],
			type : 2,
			shade : 0.4,
			shadeClose : true,
			content : ctx + '/system/#(classNameSmall)/add',
			end : function() {
				table.reload('#(classNameSmall)List', {});
			}
		});
	});
})
