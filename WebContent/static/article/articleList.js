layui.use(['form','layer','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;

    //文章列表
    var tableIns = table.render({
        elem: '#articleList',
    	url : ctx + '/system/article/listJson',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 20,
        id : "articleListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'title', title: '文章名称', minWidth:100, align:"center"},
            {field: 'count_view', title: '浏览数', minWidth:100, align:'center'},
            {field: 'count_comment', title: '评论数', align:'center'},
            {field: 'sort_no', title: '排序',  align:'center'},
            {field: 'publish_time', title: '发布时间', align:'center'},
            {field: 'publish_user', title: '发布者', align:'center',minWidth:150},
            {title: '操作', minWidth:175, templet:'#articleListBar',fixed:"right",align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("articleListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    title: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //添加文章
    function addArticle(data){
    	var index;
    	if(data){
    		index = layui.layer.open({
                title : "编辑文章",
                type : 2,
                content : ctx+"/system/article/articleEdit/" + data.id,
                success : function(layero, index){
                    var body = layui.layer.getChildFrame('body', index);
                    console.log(body);
                    if(data){
                        body.find(".title").val(data.username);  //登录名
                        body.find(".userEmail").val(data.userEmail);  //邮箱
//                        body.find(".userSex input[value="+data.userSex+"]").prop("checked","checked");  //性别
//                        body.find(".userGrade").val(data.userGrade);  //会员等级
//                        body.find(".userStatus").val(data.userStatus);    //文章状态
//                        body.find(".userDesc").text(data.userDesc);    //文章简介
                        form.render();
                    }
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
        }else{
        	index = layui.layer.open({
                title : "添加文章",
                type : 2,
                content : ctx+"/system/article/articleAdd",
                success : function(layero, index){
                    var body = layui.layer.getChildFrame('body', index);
                    console.log(body);
                    if(data){
                        body.find(".title").val(data.username);  //登录名
                        body.find(".userEmail").val(data.userEmail);  //邮箱
//                        body.find(".userSex input[value="+data.userSex+"]").prop("checked","checked");  //性别
//                        body.find(".userGrade").val(data.userGrade);  //会员等级
//                        body.find(".userStatus").val(data.userStatus);    //文章状态
//                        body.find(".userDesc").text(data.userDesc);    //文章简介
                        form.render();
                    }
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
        }
        
        layui.layer.full(index);
        window.sessionStorage.setItem("index",index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }
    $(".addNews_btn").click(function(){
    	addArticle();
    });
				
    //批量删除
    $(".batchDel_btn").click(function(){
        var checkStatus = table.checkStatus('articleListTable'),
            data = checkStatus.data,
            ids = [];
        if(data.length > 0) {
        	$.each(checkStatus.data, function(i, n) {
				ids.push(n.id);
			});
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/system/article/batchDel?ids=" + ids,
						function(data) {
							layer.msg(data.message, function() {
								  tableIns.reload();
					              layer.close(index);
							});
						});
            });
        }else{
            layer.msg("请选择需要删除的文章");
        }
    });

    //列表操作
    table.on('tool(articleList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
        	addArticle(data);
        }else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除？',{icon:3, title:'提示信息'},function(index){
            	// 向服务端发送删除指令
				$.post(ctx + "/system/article/del?id=" + data.id,
						function(data) {
							 tableIns.reload();
			                layer.close(index);
					});
            });
        }
    });

})
