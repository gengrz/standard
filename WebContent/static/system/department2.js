layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;

    table.render({
        elem: "#LAY-department-manage",
    	url : ctx + '/system/department/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   {field : 'parent_id',title : '上级机构',	minWidth:100,align:"center" },
   			   {field : 'name',title : '部门/11111',	minWidth:100,align:"center" },
   			   {field : 'code',title : '机构编码',	minWidth:100,align:"center" },
   			   {field : 'sort_no',title : '序号',	minWidth:100,align:"center" },
   			   {field : 'linkman',title : '联系人',	minWidth:100,align:"center" },
   			   {field : 'linkman_no',title : '联系人电话',	minWidth:100,align:"center" },
   			   {field : 'update_time',title : '更新时间',	minWidth:100,align:"center" },
   			   {field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#departmentListBar"}
            ]],
	        page: true,
	        limit: 30,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-department-search)', function (data) {
        var field = data.field;
        //执行重载
        table.reload('LAY-department-manage', {
            where: field
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/system/department/add";
    	if(id){
    		title="修改"
    		url=ctx + '/system/department/edit/' + id;
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
            end:function(){table.reload('LAY-department-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".departmentAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-department-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的部门？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/system/department/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-department-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的部门");
        }
    });

    //列表操作
    table.on('tool(LAY-department-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/system/department/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-department-manage');
              		}); 
                	 
                    });
            });
        }
    });

});

