layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table','element'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;
    var element = layui.element;

    table.render({
        elem: "#LAY-diagRecord-manage",
    	url : ctx + '/book/diagRecord/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   //{field : 'diag_id',title : '诊断id',	minWidth:100,align:"center" },
   			   {field : 'realname',title : '姓名',	minWidth:100,align:"center" },
   			   {field : 'depart_name',title : '地区',	minWidth:100,align:"center" },
   			   {field : 'hospital_name',title : '医院',	minWidth:100,align:"center" },
   			   {field : 'patient_type',title : '患者类型',	minWidth:100,align:"center",templet:function(d){
   				   if(d.patient_type == 1){
   					   return '治疗';
   				   }else if(d.patient_type == 2){
   					   return '预防';
   				   }
   			   } },
   			   {field : 'experience_flag',title : '体验类型',	minWidth:100,align:"center",templet:function(d){
   				   if(d.experience_flag == 0){
   					   return '非体验患者';
   				   }else if(d.experience_flag == 1){
   					return '体验患者';
   				   }
   			   } },
   			   //{field : 'diag_conclusion',title : '诊断结论',	minWidth:100,align:"center" },
   			   {field : 'diag_state',title : '诊断状态',	minWidth:100,align:"center",templet:function(d){
   				   if(d.diag_state == 1){
   					   return '诊断中';
   				   }else if(d.diag_state == 2){
   					   return '已诊断';
   				   }
   			   } },
   			   {field : 'diag_date',title : '诊断日期',	minWidth:100,align:"center" },
   			   //{field : 'update_time',title : '更新时间',	minWidth:100,align:"center" },
   			   //{field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#diagRecordListBar"}
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-diagRecord-search)', function (data) {
        var field = data.field;
        var mobilePhone = $("#mobile_phone").val();
        var idNumber = $("#id_number").val();
        //执行重载
        table.reload('LAY-diagRecord-manage', {
        	url : ctx + '/book/diagRecord/listJson',
        	where: {
            	mobile_phone : mobilePhone,
            	id_number : idNumber
            }
        });
    });
    
 

 
   

   

    //列表操作
    table.on('tool(LAY-diagRecord-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'diagInfo'){//诊断详情
        	var title="诊断详情";
        	var url= ctx + '/book/diagRecord/diagInfo/' + data.id;
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
                end:function(){table.reload('LAY-diagRecord-manage');}
            })

            layui.layer.full(index);
            window.sessionStorage.setItem("index", index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function () {
                layui.layer.full(window.sessionStorage.getItem("index"));
            })
        }
    });

});

