layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;

    table.render({
        elem: "#LAY-fieldManager-manage",
    	url : ctx + '/system/fieldManager/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   {field : 'fieldname',title : '字段名称(中文)',	minWidth:100,align:"center" },
   			   {field : 'fieldtype',title : '字段类型',	minWidth:100,align:"center" },
   			   {field : 'fielddesc',title : '字段描述',	minWidth:100,align:"center" },
   			   {field : 'fieldclass',title : '字段类别',	minWidth:100,align:"center" },
   			   {field : 'state',title : '状态(0可用，1不可用)',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#fieldManagerListBar"}
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-fieldManager-search)', function (data) {
        var field = data.field;
        //执行重载
        table.reload('LAY-fieldManager-manage', {
            where: field
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/system/fieldManager/add";
    	if(id){
    		title="修改"
    		url=ctx + '/system/fieldManager/edit/' + id;
    	 } 
        var index = layui.layer.open({
            title: title,
            type: 2,
            content: url,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            } ,
            end:function(){table.reload('LAY-fieldManager-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".fieldManagerAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-fieldManager-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/system/fieldManager/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-fieldManager-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的");
        }
    });

    //列表操作
    table.on('tool(LAY-fieldManager-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/system/fieldManager/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-fieldManager-manage');
              		}); 
                	 
                    });
            });
        }
    });

});

