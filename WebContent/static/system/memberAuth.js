layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    ,formSelects : 'select/formSelects-v4'
}).use(['index',  'table','formSelects'], function () {
	
    var $ = layui.$
        , form = layui.form
        , table = layui.table;
    //下拉多选
    var formSelects = layui.formSelects;

    
    table.render({
        elem: "#LAY-user-manage",
        url: ctx + "/system/user/memberList",
        cols: [[
            {type: "checkbox",  width: 50},
            {field: 'realname', title: '姓名', minWidth: 100, align: 'center'},
            {field: 'id_number', title: '身份证号', align: 'center'},
            {field: 'mobile_phone', title: '手机号', align: 'center'},
//            {
//                field: 'user_type', title: '用户类型', minWidth: 100, align: 'center', templet: function (d) {
//                    if (d.user_type == "0") {
//                        return "超级管理员";
//                    } else if (d.user_type == "1") {
//                        return "医院管理员";
//                    } else if (d.user_type == "2") {
//                        return "医生";
//                    } else if (d.user_type == "3") {
//                        return "APP用户";
//                    } else if (d.user_type == "4") {
//                        return "超级会员";
//                    }
//                }
//            },//1,管理员,2,普通用户,3,前台用户,4,第三方用户,5,API用户
            {field: 'auth_state', title: '认证状态', align: 'center' ,templet: function(d){
            	if(d.auth_state == 0){
            		return '<span style="color: #f40c1c;">已认证</span>';
            	}else if(d.auth_state == 1){
            		return '<span style="color: #f40c1c;">未认证</span>';
            	}else if(d.auth_state == 2){
            		return '<span style="color: #f40c1c;">认证中</span>';
            	}
            }},
            {field: 'update_time', title: '更新时间', align: 'center' },
            {title: "操作",width: 180, align: "center",toolbar: "#userListBar"}
            ]],
	        page: true,
	        limit: 10,
	        text: {
            none: '暂无相关数据' //默认：无数据。
          }
    });
       
    //监听搜索
    form.on('submit(LAY-user-search)', function (data) {
        var field = data.field;
        //执行重载
        table.reload('LAY-user-manage', {
            where: field
        });
    });

  //添加 修改
    function add_edit(id) {
        var title = "添加用户";
        var url = ctx + "/system/user/add";
        if (id) {
            title = "用户认证"
            url = ctx + '/system/user/editMember/' + id;
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
                }, 500);
            } ,
            end:function(){  table.reload('LAY-user-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".userAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-user-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.post(ctx + "/system/user/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-user-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的用户");
        }
    });

    //列表操作
    table.on('tool(LAY-user-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'editState') { //启用禁用
            var editStateText = "是否确定禁用此用户？";
            var btnText = "已禁用";
            var state = "1";
            if (data.state == "1") {
                editStateText = "是否确定启用此用户？",
                    btnText = "已启用";
                state = "0";
            }
            layer.confirm(editStateText, {
                icon: 3,
                title: '系统提示',
            }, function (index) {
                $.post(ctx + "/system/user/editState", {
                        id: data.id,
                        state: state
                    },
                    function (data) {
                        layer.close(index);
                        table.reload('LAY-user-manage');
                    });

            } );
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
                $.post(ctx + "/system/user/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-user-manage');
              		}); 
                	 
                    });
            });
        }
    });

});


