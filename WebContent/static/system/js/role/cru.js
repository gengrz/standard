layui.use([ 'form', 'layer', 'jquery', 'table' ], function() {
	var form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
	var laypage = layui.laypage;
	var $ = layui.jquery;

	$(".showMenu").click(function() {
		console.log("showMenu") // 被执行事件的元素DOM对象，一般为button对象
	});

	// 监听提交
	form.on('submit(roleAdd)', function(data) {
		// layer.msg(JSON.stringify(data.field));
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}
		console.log(data.field.id) // 当前容器的全部表单字段，名值对形式：{name: value}
	 

		// 先得到当前iframe层的索引
		var index = parent.layer.getFrameIndex(window.name); //
		$.post(ctx + "/system/role/save", data.field, function(data) {
			layer.msg(data.message, function() {
				parent.layer.close(index); // 再执行关闭
			});
		});
		return false;
	});
	form.on('submit(roleEdit)', function(data) {
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}
		// 先得到当前iframe层的索引
		var index = parent.layer.getFrameIndex(window.name); //
		$.post(ctx + "/system/role/update", data.field, function(data) {
			layer.msg(data.message, function() {
				parent.layer.close(index); // 再执行关闭
			});
		});
		return false;
	});
	
	
})
