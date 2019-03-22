layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table','laydate'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table
        , laydate = layui.laydate;
    
    //执行一个laydate实例
    laydate.render({
      elem: '#searchDate' //指定元素
    });

    table.render({
        elem: "#LAY-appointment-manage",
    	url : ctx + '/book/appointment/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   /*{field : 'user_id',title : '用户id',	minWidth:100,align:"center" },*/
   			   {field : 'name',title : '地区名称',	minWidth:100,align:"center" },
   			   {field : 'hospital_name',title : '医院名称',	minWidth:100,align:"center" },
   			   {field : 'realname',title : '患者名称',	minWidth:100,align:"center" },
   			   {field : 'mobile_phone',title : '联系方式',	minWidth:100,align:"center" },
   			   {field : 'appointment_date',title : '预约日期',	minWidth:100,align:"center" },
   			   {field : 'appointment_time',title : '预约时段',	minWidth:100,align:"center",templet:function(d){
   				   if(d.appointment_time==1){
   					   return "上午";
   				   }else if(d.appointment_time==2){
   					   return "下午";
   				   }
   			   } },
   			   {field : 'appointment_status',title : '预约状态',	minWidth:100,align:"center",templet:function(d){
   				   if(d.appointment_status==1){
   					   return "已接受";
   				   }else if(d.appointment_status==0){
   					   return "未接受";
   				   }else if(d.appointment_status==2){
   					   return "已取消";
   				   }
   			   } },
   			   {field : 'diagnosis_status',title : '诊断状态',minWidth:100,align:"center" ,templet:function(d){
   				   if(d.diagnosis_status==1){
   					   return "已诊断";
   				   }else if(d.diagnosis_status==0){
   					   return "未诊断";
   				   }
   			   }},
   			   {field : 'treatment_status',title : '治疗状态',minWidth:100,align:"center",templet:function(d){
   				   if(d.treatment_status==1){
   					   return "完成";
   				   }else if(d.treatment_status==0){
   					   return "未完成";
   				   }
   			   }},
//   			   {field : 'update_time',title : '更新时间',	minWidth:100,align:"center" },
//   			   {field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#appointmentListBar"}
            ]],
	        page: true,
	        limit: 30,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-appointment-search)', function (data) {
        var searchDate = $("#searchDate").val();
        var mobile_phone = $("#mobile_phone").val();
        //执行重载
        table.reload('LAY-appointment-manage', {
            url : ctx + '/book/appointment/listJson',
        	where: {
            	mobile_phone:mobile_phone,
            	searchDate:searchDate
            }
        });
    });

  //添加 修改
    function add_edit(id) {
    	if(id){
    		title="详情"
    		url=ctx + '/book/appointment/info/' + id;
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
            end:function(){table.reload('LAY-appointment-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".appointmentAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-appointment-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的预约管理表？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/book/appointment/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-appointment-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的预约管理表");
        }
    });
    
    //批量接受预约
    $(".batchUpd_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-appointment-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            $.post(ctx + "/book/appointment/batchUpd?ids=" + ids,
                function (data) {
            	   if(data){
            		   layer.msg("已接受预约！", function () {
     	                  table.reload('LAY-appointment-manage');
     	               });
            	   }else{
            		   layer.msg("操作失败！！！", function () {
     	                  table.reload('LAY-appointment-manage');
     	               });
            	   }
            	   
            });
        } else {
            layer.msg("请先选择患者！");
        }
    });

    //列表操作
    table.on('tool(LAY-appointment-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/book/appointment/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-appointment-manage');
              		}); 
                	 
                    });
            });
        }else if(layEvent === 'accept'){//接受预约
        	 $.post(ctx + "/book/appointment/accept?id=" + data.id,
                 function (data) {
             	   if(data){
             		   layer.msg("已接受预约！", function () {
      	                  table.reload('LAY-appointment-manage');
      	               });
             	   }else{
             		   layer.msg("操作失败！！！", function () {
      	                  table.reload('LAY-appointment-manage');
      	               });
             	   }
             	   
             });
        }else if(layEvent === 'info'){//详情
        	add_edit(data.id)
        }
    });

});

