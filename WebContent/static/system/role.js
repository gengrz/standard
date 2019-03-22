layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;

    table.render({
        elem: "#LAY-role-manage",
    	url : ctx + '/system/role/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   {field : 'name',title : '角色名',	minWidth:100,align:"center" },
  			   {field : 'status',title : '状态', width: 60,  templet: function (d) {
                   if (d.status == 0) {
                       return '<span class="layui-badge layui-btn-danger">隐藏</span>';
                   }
                   if (d.status == 1) {
                       return '<span class="layui-badge layui-bg-blue">显示</span>';
                   } 
               },	align:"center" },
   			   {field : 'sort_no',title : '排序',	minWidth:100,align:"center" },
   			   {field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#roleListBar"}
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-role-search)', function (data) {
        var field = data.field;
        //执行重载
        table.reload('LAY-role-manage', {
            where: field
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/system/role/add";
    	if(id){
    		title="修改"
    		url=ctx + '/system/role/edit/' + id;
    	 } 
        var index = layui.layer.open({
            title: title,
            type: 2,
       	 	area: ["500px", "450px"],
            content: url,
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            } ,
            end:function(){table.reload('LAY-role-manage');}
        })

        
    }

    $(".roleAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-role-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的角色？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/system/role/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-role-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的角色");
        }
    });

    //列表操作
    table.on('tool(LAY-role-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        }	else	if (layEvent === 'allotAuth') { // 查看
			layer.open({
				id : 'roleEdit',
				title : [ data.name, 'color:blue;' ],
				shade : false,
				maxmin : false, // 开启最大化最小化按钮
				area : [ '300px', '500px' ],
				type : 2,
				shade : 0.4,
				shadeClose : true,
				content : ctx + '/system/role/allotAuth/' + data.id,
				end : function() {
					var roles = $('#role_data').val();
					if (roles != "") {

					}
				}
			});
		} else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/system/role/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-role-manage');
              		}); 
                	 
                    });
            });
        }
    });

});

