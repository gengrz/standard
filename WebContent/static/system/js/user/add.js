layui.use([ 'form', 'layer', 'jquery', 'table' ], function() {
	var form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
	var laypage = layui.laypage;
	var $ = layui.jquery;

	$(".showMenu").click(function() {
		console.log("showMenu") // 被执行事件的元素DOM对象，一般为button对象
	});

	// 监听提交
	form.on('submit(userAdd)', function(data) {
		// layer.msg(JSON.stringify(data.field));
		console.log(data.elem) // 被执行事件的元素DOM对象，一般为button对象
		console.log(data.form) // 被执行提交的form对象，一般在存在form标签时才会返回
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}
		// 取value
		var str2value = $("#roles-multiple").select2("val");
		console.log(str2value) // 当前容器的全部表单字段，名值对形式：{name: value}
		data.field["roleIds"] = str2value.toString();
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}

		// 先得到当前iframe层的索引
		var index = parent.layer.getFrameIndex(window.name); //
		$.post(ctx + "/system/user/save", data.field, function(data) {
			layer.msg(data.message, function() {
				parent.layer.close(index); // 再执行关闭
			});
		});
		return false;
	});
	form.on('submit(userEdit)', function(data) {
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}
		// 取value
		var str2value = $("#roles-multiple").select2("val");
		console.log(str2value) // 当前容器的全部表单字段，名值对形式：{name: value}
		data.field["roleIds"] = str2value.toString();
		console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}

		// 先得到当前iframe层的索引
		var index = parent.layer.getFrameIndex(window.name); //
		$.post(ctx + "/system/user/update", data.field, function(data) {
			layer.msg(data.message, function() {
				parent.layer.close(index); // 再执行关闭
			});
		});
		return false;
	});
	form.verify({
		username : function(value, item) { // value：表单的值、item：表单的DOM对象
			if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
				return '用户名不能有特殊字符';
			}
			if (/(^\_)|(\__)|(\_+$)/.test(value)) {
				return '用户名首尾不能出现下划线\'_\'';
			}
			if (/^\d+\d+\d$/.test(value)) {
				return '用户名不能全为数字';
			}
		}

		// 我们既支持上述函数式的方式，也支持下述数组的形式
		// 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
		,
		pass : [ /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格' ]
	});
})
