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
    	elem: "#LAY-diagRecord-manage2",
    	url : ctx + '/book/diagRecord/nodiag',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
   			   //{field : 'diag_id',title : '诊断id',	minWidth:100,align:"center" },
               {field : 'appointment_date',title : '预约日期',	minWidth:100,align:"center" },
   			   {field : 'realname',title : '姓名',	minWidth:100,align:"center" },
   			   {field : 'name',title : '地区',	minWidth:100,align:"center" },
   			   {field : 'hospital_name',title : '医院',	minWidth:100,align:"center" },
   			   //{field : 'diag_conclusion',title : '诊断结论',	minWidth:100,align:"center" },
   			   {field : 'diagnosis_status',title : '诊断状态',	minWidth:100,align:"center",templet:function(d){
   				   if(d.diagnosis_status == 0){
   					   return '未诊断';
   				   }else if(d.diagnosis_status == 1){
   					   return '已诊断';
   				   }
   			   } },
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    
  //监听搜索
    form.on('submit(LAY-diagRecord-search2)', function (data) {
        var field = data.field;
        var mobilePhone = $("#mobile_phone2").val();
        var idNumber = $("#id_number2").val();
        //执行重载
        table.reload('LAY-diagRecord-manage2', {
        	url : ctx + '/book/diagRecord/nodiag',
        	where: {
            	mobile_phone : mobilePhone,
            	id_number : idNumber
            }
        });
    });


    
    
  //列表操作
    table.on('tool(LAY-diagRecord-manage2)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'diag'){//诊断详情
        	var title="诊断";
        	var url= ctx + '/book/diagRecord/diag/' + data.id;
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

