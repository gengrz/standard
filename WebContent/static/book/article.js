layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index',  'table'], function () {
    var $ = layui.$
        , form = layui.form
        , table = layui.table;

    table.render({
        elem: "#LAY-article-manage",
    	url : ctx + '/book/article/listJson',
        cols: [[
            {type: "checkbox", fixed: "left", width: 50},
//   			   {field : 'folder_id',title : '目录id',	minWidth:100,align:"center" },
   			   {field : 'title',title : '文章名称',	minWidth:100,align:"center" },
   			   {field : 'content',title : '文件内容',	minWidth:100,align:"center" },
   			   {field : 'count_view',title : '浏览数',	minWidth:100,align:"center" },
   			   {field : 'count_comment',title : '评论数',	minWidth:100,align:"center" },
   			   {field : 'type',title : '类型',	minWidth:100,align:"center",templet: '#typeTpl' },
   			   {field : 'status',title : '状态',	minWidth:100,align:"center",templet: '#statusTpl' },
   			   {field : 'is_comment',title : '是否评论',	minWidth:100,align:"center",templet: '#is_commentTpl' },
   			   {field : 'is_recommend',title : '是否推荐',	minWidth:100,align:"center",templet: '#is_recommendTpl' },
   			   {field : 'sort_no',title : '排序',	minWidth:100,align:"center",sort : true },
//   			   {field : 'jump_url',title : '跳转地址',	minWidth:100,align:"center" },
//   			   {field : 'image_url',title : '图片路径',	minWidth:100,align:"center" },
//   			   {field : 'image_net_url',title : '网络图片路径',	minWidth:100,align:"center" },
//   			   {field : 'file_url',title : 'file_url',	minWidth:100,align:"center" },
//   			   {field : 'file_name',title : 'file_name',	minWidth:100,align:"center" },
//   			   {field : 'approve_status',title : '审核状态',	minWidth:100,align:"center" },
   			   {field : 'publish_time',title : '发布时间',	minWidth:100,align:"center" },
//   			   {field : 'publish_user',title : '发布者',	minWidth:100,align:"center" },
//   			   {field : 'start_time',title : '开始时间',	minWidth:100,align:"center" },
//   			   {field : 'end_time',title : '结束时间',	minWidth:100,align:"center" },
//   			   {field : 'update_time',title : '更新时间',	minWidth:100,align:"center" },
//   			   {field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
//   			   {field : 'create_id',title : '创建者',	minWidth:100,align:"center" },
            {title: "操作", minWidth: 100,align: "center",fixed: "right",toolbar: "#articleListBar"}
            ]],
	        page: true,
	        limit: 10,
	        height: "full-220",
	        text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
          }
    });
    //监听搜索
    form.on('submit(LAY-article-search)', function (data) {
        var field = data.field;
        console.log(field);
        //执行重载
        table.reload('LAY-article-manage', {
            where: {
            	title: field.title
        	}
        });
    });

  //添加 修改
    function add_edit(id) {
    	var title="添加";
    	var url= ctx+"/book/article/add";
    	if(id){
    		title="修改"
    		url=ctx + '/book/article/edit/' + id;
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
            end:function(){table.reload('LAY-article-manage');}
        })

        layui.layer.full(index);
        window.sessionStorage.setItem("index", index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(window.sessionStorage.getItem("index"));
        })
    }

    $(".articleAdd_btn").click(function () {
        add_edit();
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-article-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/book/article/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                       table.reload('LAY-article-manage');
                   });
                    });
            });
        } else {
            layer.msg("请选择需要删除的文章");
        }
    });
    
    //批量设置轮播信息
    $(".folderSet").click(function () {
        var checkStatus = table.checkStatus('LAY-article-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            $.post(ctx + "/book/article/batchFolder?ids=" + ids,
            		function (data) {
            	layer.msg(data.data, function () {
            		table.reload('LAY-article-manage');
            	});
            });
        } else {
            layer.msg("请先选择文章！");
        }
    });

    
    //列表操作
    table.on('tool(LAY-article-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            add_edit(data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/book/article/del?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  table.reload('LAY-article-manage');
              		}); 
                	 
                    });
            });
        }
    });
	form.on("submit(addArticle)", function(data) {
		// 弹出loading
		var index2 = top.layer.msg('数据提交中，请稍候', {
			icon : 16,
			time : false,
			shade : 0.8
		});
		console.log(data.field.content);
		// 提交
		$.post(ctx + "/book/article/save", data.field, function(data) {
			top.layer.close(index2);
			layer.msg(data.message, {time: 3000 
				}, function() {
				var iframe = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
				parent.layer.close(iframe); //再执行关闭   
			});
		});

		return false;
	});
});

