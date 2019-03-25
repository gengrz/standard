layui.use([ 'form', 'layer', 'jquery', 'table' ], function() {
	var form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
	var laypage = layui.laypage;
	var $ = layui.jquery;

	// 监听提交
	form.on('submit(#(classNameSmall)Add)', function(data) {
		// layer.msg(JSON.stringify(data.field));
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}
		console.log(data.field.id) // 当前容器的全部表单字段，名值对形式：{name: value}
	 

		// 先得到当前iframe层的索引
		var index = parent.layer.getFrameIndex(window.name); //
		$.post(ctx + "/system/#(classNameSmall)/save", data.field, function(data) {
			layer.msg(data.message, function() {
				parent.layer.close(index); // 再执行关闭
			});
		});
		return false;
	});
	form.on('submit(#(classNameSmall)Edit)', function(data) {
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}
		// 先得到当前iframe层的索引
		var index = parent.layer.getFrameIndex(window.name); //
		$.post(ctx + "/system/#(classNameSmall)/update", data.field, function(data) {
			layer.msg(data.message, function() {
				parent.layer.close(index); // 再执行关闭
			});
		});
		return false;
	});
	
	
})
