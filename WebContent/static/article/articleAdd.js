layui.use(['form','layer'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    form.on("submit(articleAdd)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
		$.post(ctx + "/system/article/save", data.field, function(data) {
			layer.msg(data.message, function() {
				  top.layer.close(index);
		            top.layer.msg("文章添加成功！");
		            layer.closeAll("iframe");
		            //刷新父页面
		            parent.location.reload(); 
			});
		});
		
//        setTimeout(function(){
//            top.layer.close(index);
//            top.layer.msg("用户添加成功！");
//            layer.closeAll("iframe");
//            //刷新父页面
//            parent.location.reload();
//        },2000);
        
        return false;
    })
    
    form.on("submit(articleEdit)",function(data){
        //弹出loading
        var index = top.layer.msg('数据编辑中，请稍候',{icon: 16,time:false,shade:0.8});
		$.post(ctx + "/system/article/update", data.field, function(data) {
			layer.msg(data.message, function() {
				  top.layer.close(index);
		            top.layer.msg("文章编辑成功！");
		            layer.closeAll("iframe");
		            //刷新父页面
		            parent.location.reload(); 
			});
		});
		
//        setTimeout(function(){
//            top.layer.close(index);
//            top.layer.msg("用户添加成功！");
//            layer.closeAll("iframe");
//            //刷新父页面
//            parent.location.reload();
//        },2000);
        
        return false;
    })
    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());

})