layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;

    table.render({
        elem: "#[[#]]#LAY-#(classNameSmall)-manage",
    	url : ctx + '/#(basePath)/#(classNameSmall)/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
            #for(x : tablemeta.columnMetas)
             #if(tablemeta.primaryKey!= x.name)
   			   {field : '#(x.name)',title : '#if(x.remarks)#(x.remarks)#else#(x.name)#end',	minWidth:100,align:"center" },
   			 #end
   		    #end
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "##(classNameSmall)ListBar"}
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-#(classNameSmall)-search)', function (data) {
        var field = data.field;
        //执行重载
        table.reload('LAY-#(classNameSmall)-manage', {
            where: field
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/#(basePath)/#(classNameSmall)/add";
    	if(id){
    		title="修改"
    		url=ctx + '/#(basePath)/#(classNameSmall)/edit/' + id;
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
            end:function(){table.reload('LAY-#(classNameSmall)-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".#(classNameSmall)Add_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-#(classNameSmall)-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的#(tablemeta.remarks??tableName)？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/#(basePath)/#(classNameSmall)/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-#(classNameSmall)-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的#(tablemeta.remarks??tableName)");
        }
    });

    //列表操作
    table.on('tool(LAY-#(classNameSmall)-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/#(basePath)/#(classNameSmall)/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-#(classNameSmall)-manage');
              		}); 
                	 
                    });
            });
        }
    });

});


