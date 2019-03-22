layui.use([ 'tree', 'form', 'layer', 'jquery', 'table' ], function() {
	var form = layui.form;
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
	var laypage = layui.laypage;
	var $ = layui.jquery;
	layui.tree({
		elem : '#menuListTree', // 指定元素
		nodes : menuTree,
		target : '_blank',// 是否新选项卡打开（比如节点返回href才有效）
		click : function(item) { // 点击节点回调
			layer.msg('当前节名称：' + item.name + '<br>全部参数：'
					+ JSON.stringify(item.pageurl));
			$("#menu_id").val(item.id);
			$("#menu_name").val(item.name);
			$("#pageurl").val(item.pageurl);
			$("#pid").val(item.pid);
			$("#pidName").val(item.pidName);

			$('[name="menuType"][value="' + item.menuType + '"]').prop(
					'checked', true);

			if (item.active == 1) {
				$('[name="active"]').prop('checked', true);
			} else {
				$('[name="active"]').prop('checked', false);

			}

			form.render('radio'); // 更新全部
			form.render('checkbox'); // 更新全部
			console.log(item);
		}
	});
	layui.tree({
		elem : '#pidTree', // 指定元素
		target : '_blank',// 是否新选项卡打开（比如节点返回href才有效）
		click : function(item) { // 点击节点回调
			console.log(item.id);
			console.log(item.name);
			$("#pid").val(item.id);
			$("#pidName").val(item.name);
		},
		nodes : menuTree
	});
	$("#pidName").click(function() {
		layer.open({
			shadeClose : true,
			closeBtn : 1,
			btn : [ '确定' ], // 按钮
			type : 1,
			title : "选择父菜单",
			area : [ '600px', '400px' ], // 宽高
			// shadeClose: true,
			content : $("#div_menuZtree")
		});
	});
	// 删除选中的菜单
	$("#delMenu").click(
			function() {
				var menu_id = $("#menu_id").val();
				if (menu_id != "") {
					layer.confirm('此操作将永久删除该菜单（子菜单变成顶级菜单）， 是否继续？', function() {
						$.post(ctx + "/system/menu/delMenuById?id=" + menu_id,
								function(data) {
									layer.msg(data.message, function() {
										location.reload();
									});
								});
					});

					// layer.msg("menu_id=" + menu_id);
				} else {
					layer.msg("没有选中菜单");
				}
				console.log("menu_id===" + menu_id);
			});
	// 清空父级
	$("#delParent").click(function() {
		$("#pid").val("");
		$("#pidName").val("");
	});
	$("#initAll").click(function() {
		$("#menu_id").val("");
		$("#menu_name").val("");
		$("#pageurl").val("");
		$("#pid").val("");
		$("#pidName").val("");
		$('[name="menuType"][value="1"]').prop('checked', true);
		$('[name="active"]').prop('checked', false);

		form.render(); // 更新全部
	});
	// 监听提交
	form.on('submit(menuCru)', function(data) {
		// layer.msg(JSON.stringify(data.field));
		// console.log(data.elem) // 被执行事件的元素DOM对象，一般为button对象
		// console.log(data.form) // 被执行提交的form对象，一般在存在form标签时才会返回
		// console.log(data.field) // 当前容器的全部表单字段，名值对形式：{name: value}

		$.post(ctx + "/system/menu/saveorupdate", data.field, function(data) {
			layer.msg(data.message, function() {
				location.reload();
			});
		});
		return false;
	});
})
