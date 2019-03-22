layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;

    table.render({
        elem: "#LAY-appointmentCalendar-manage",
    	url : ctx + '/book/appointmentCalendar/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   {field : 'hospital_id',title : '医院id',	minWidth:100,align:"center" },
   			   {field : 'appointment_date',title : '预约日期',	minWidth:100,align:"center" },
   			   {field : 'appointment_count',title : '一天最多可预约人数',	minWidth:100,align:"center" },
   			   {field : 'already_appointment_count',title : '当天已预约人数',	minWidth:100,align:"center" },
   			   {field : 'surplus_appointment_count',title : '当天剩余预约人数',	minWidth:100,align:"center" },
   			   {field : 'appointment_state',title : '当天预约状态（1：可预约，0：不可预约）',	minWidth:100,align:"center" },
   			   {field : 'user_id',title : '修改人',	minWidth:100,align:"center" },
   			   {field : 'update_time',title : '更新时间',	minWidth:100,align:"center" },
   			   {field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#appointmentCalendarListBar"}
            ]],
	        page: true,
	        limit: 30,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-appointmentCalendar-search)', function (data) {
        var field = data.field;
        //执行重载
        table.reload('LAY-appointmentCalendar-manage', {
            where: field
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/book/appointmentCalendar/add";
    	if(id){
    		title="修改"
    		url=ctx + '/book/appointmentCalendar/edit/' + id;
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
            end:function(){table.reload('LAY-appointmentCalendar-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".appointmentCalendarAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-appointmentCalendar-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的预约日历管理表？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/book/appointmentCalendar/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-appointmentCalendar-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的预约日历管理表");
        }
    });

    //列表操作
    table.on('tool(LAY-appointmentCalendar-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/book/appointmentCalendar/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-appointmentCalendar-manage');
              		}); 
                	 
                    });
            });
        }
    });

});

