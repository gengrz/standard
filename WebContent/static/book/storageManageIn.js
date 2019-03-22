layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table', 'laydate'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table
        , laydate = layui.laydate;
    
    //执行一个laydate实例
    laydate.render({
      elem: '#in_date' //指定元素
    });
    table.render({
        elem: "#LAY-storageManageIn-manage",
    	url : ctx + '/book/storageManageIn/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
//   			   {field : 'in_storage_id',title : '入库单号',	minWidth:100,align:"center" },
   			   {field : 'in_storage_date',title : '入库时间',	minWidth:100,align:"center" },
   			   {field : 'material_name',title : '耗材名称',	minWidth:100,align:"center" },
   			   {field : 'material_format',title : '规格',	minWidth:100,align:"center" },
   			   {field : 'material_unit',title : '单位',	minWidth:100,align:"center" },
   			   {field : 'in_storage_count',title : '入库数量',	minWidth:100,align:"center" },
   			   {field : 'supplier',title : '供应商',	minWidth:100,align:"center" },
   			   {field : 'in_storage_amount',title : '入库总金额',	minWidth:100,align:"center" },
   			   {field : 'realname',title : '添加人',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#storageManageInListBar"}
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-storageManageIn-search)', function (data) {
    	var material_name = $("#material_name").val();
    	var in_date = $("#in_date").val();
        //执行重载
        table.reload('LAY-storageManageIn-manage', {
        	url: ctx + '/book/storageManageIn/listJson',
            where: {
            	material_name:material_name,
            	in_date:in_date
            }
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/book/storageManageIn/add";
    	if(id){
    		title="修改"
    		url=ctx + '/book/storageManageIn/edit/' + id;
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
            end:function(){table.reload('LAY-storageManageIn-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".storageManageInAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-storageManageIn-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的入库管理表？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/book/storageManageIn/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-storageManageIn-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的入库管理表");
        }
    });

    //列表操作
    table.on('tool(LAY-storageManageIn-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/book/storageManageIn/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-storageManageIn-manage');
              		}); 
                	 
                    });
            });
        }
    });

});

