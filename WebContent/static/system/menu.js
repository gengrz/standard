layui.config({
    base: '/js/layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    , treetable: 'treetable-lay/treetable'
}).use(['index',  'table', 'treetable'], function () {
	var $ = layui.$
        , form = layui.form
        , table = layui.table;
	var treetable = layui.treetable;
    // 渲染表格
    var renderTable = function () {
	        layer.load(2);
	        treetable.render({
	          treeColIndex: 1,
	          treeSpid: 0,
	          treeIdName: 'id',
	          treePidName: 'parent_id',
	          elem: '#LAY-menu-manage',
	      	  url : ctx + '/system/menu/findMenusAll',
	          page: false,
	          cols: [[
	                   {type: 'numbers'},
	      			   {field : 'name',title : '菜单名称',	minWidth:100},
	      			   {field : 'url',title : '菜单地址',	minWidth:100},
	      			   {field : 'status',title : '状态', width: 60,  templet: function (d) {
	                       if (d.status == 0) {
	                           return '<span class="layui-badge layui-bg-gray">隐藏</span>';
	                       }
	                       if (d.status == 1) {
	                           return '<span class="layui-badge layui-bg-blue">显示</span>';
	                       } 
	                   },	align:"center" },
	      			   {field : 'sort_no',title : '排序',width:60,align:"center" },
	                   {field: 'url_type', width: 80, align: 'center', templet: function (d) {
	                           if (d.url_type == 0) {
	                               return '<span class="layui-badge layui-bg-gray">按钮</span>';
	                           }
	                           if (d.url_type ==1) {
	                               return '<span class="layui-badge layui-bg-blue">菜单</span>';
	                           } else{
	                        	   return '<span class="layui-badge ">未知</span>'; 
	                           }
	                       }, title: '类型'
	                   },
	              {templet: '#menuListBar',  align: 'center', title: '操作'}
	          ]],
	          done: function () {
	              layer.closeAll('loading');
	          }
	      });
	    };

	  renderTable();
      $('#btn-expand').click(function () {
          treetable.expandAll('#LAY-menu-manage');
      });

      $('#btn-fold').click(function () {
          treetable.foldAll('#LAY-menu-manage');
      });
  
      $('#btn-refresh').click(function () {
          renderTable();
      });

//    table.render({
//        elem: "#LAY-menu-manage",
//    	url : ctx + '/system/menu/listJson',
//        cols: [[
//            {type: "checkbox", fixed: "left", width: 50},
//   			   {field : 'parent_id',title : '父id',	minWidth:100,align:"center" },
//   			   {field : 'name',title : '名称/11111',	minWidth:100,align:"center" },
//   			   {field : 'url_key',title : '菜单key',	minWidth:100,align:"center" },
//   			   {field : 'url',title : '链接地址',	minWidth:100,align:"center" },
//   			   {field : 'status',title : '状态//radio/2,隐藏,1,显示',	minWidth:100,align:"center" },
//   			   {field : 'url_type',title : '类型//select/1,根目录,2,a标签,3,a标签_blank,4,外部url',	minWidth:100,align:"center" },
//   			   {field : 'sort_no',title : '排序',	minWidth:100,align:"center" },
//   			   {field : 'level',title : '级别',	minWidth:100,align:"center" },
//   			   {field : 'create_time',title : '创建时间',	minWidth:100,align:"center" },
//   			   {field : 'create_id',title : '创建者',	minWidth:100,align:"center" },
//            {title: "操作", minWidth: 175,align: "center",fixed: "right",toolbar: "#menuListBar"}
//            ]],
//	        page: true,
//	        limit: 30,
//	        height: "full-220",
//	        text: {
//            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
//          }
//    });
//    //监听搜索
//    form.on('submit(LAY-menu-search)', function (data) {
//        var field = data.field;
//        //执行重载
//        table.reload('LAY-menu-manage', {
//            where: field
//        });
//    });
      $('#btn-search').click(function () {
    	    var keyword = $('#edt-search').val();
    	    var searchCount = 0;
    	    $('#LAY-menu-manage').next('.treeTable').find('.layui-table-body tbody tr td').each(function () {
    	        $(this).css('background-color', 'transparent');
    	        var text = $(this).text();
    	        if (keyword != '' && text.indexOf(keyword) >= 0) {
    	            $(this).css('background-color', 'rgba(250,230,160,0.5)');
    	            if (searchCount == 0) {
    	                treetable.expandAll('#LAY-menu-manage');
    	                $('html,body').stop(true);
    	                $('html,body').animate({scrollTop: $(this).offset().top - 150}, 500);
    	            }
    	            searchCount++;
    	        }
    	    });
    	    if (keyword == '') {
    	        layer.msg("请输入搜索内容", {icon: 5});
    	    } else if (searchCount == 0) {
    	        layer.msg("没有匹配结果", {icon: 5});
    	    }
    	});
  //添加 修改
    function add_edit(op,id) {
    	var title="添加";
    	var url= ctx+"/system/menu/add/"+id;
    	if(op){
    		title="修改"
    		url=ctx + '/system/menu/edit/' + id;
    	 } 
        var index = layui.layer.open({
        	 area: ["500px", "450px"],
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
            end:function(){
            	renderTable();
//            	table.reload('LAY-menu-manage');
            }
        })
    }

    $(".menuAdd_btn").click(function () {
    	 add_edit(false,"");
    });

    //批量删除
    $(".batchDel_btn").click(function () {
        var checkStatus = table.checkStatus('LAY-menu-manage'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            $.each(checkStatus.data, function (i, n) {
                ids.push(n.id);
            });
            layer.confirm('确定删除选中的菜单？', {icon: 3, title: '提示信息'}, function (index) {
            	$.post(ctx + "/system/menu/batchDel?ids=" + ids,
                    function (data) {
                	 layer.msg(data.message, function () {
                      // table.reload('LAY-menu-manage');
                		 renderTable();
                	 });
                    });
            });
        } else {
            layer.msg("请选择需要删除的菜单");
        }
    });

    //列表操作
    table.on('tool(LAY-menu-manage)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;
        if (layEvent === 'add') { //添加 
            add_edit(false,data.id);
        }
        else if (layEvent === 'edit') { //编辑
            add_edit(true,data.id);

        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除？', {icon: 3, title: '提示信息'}, function (index) {
                // 向服务端发送删除指令
				$.post(ctx + "/system/menu/delMenuById?id=" + data.id,
                    function (data) {
                	layer.msg(data.message, {
              		  icon: 1,
              		  time: 1000 //1秒关闭（如果不配置，默认是3秒）
              		}, function(){
                   	  //table.reload('LAY-menu-manage');
              			 renderTable()
              		}); 
                	 
                    });
            });
        }
    });

});

