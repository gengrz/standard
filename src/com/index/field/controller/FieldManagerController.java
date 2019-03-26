package com.index.field.controller;


import com.cf.base.BaseController;
import com.index.field.base.FieldManager;
import com.index.field.service.FieldClassService;
import com.index.field.service.FieldManagerService;
import com.jfinal.json.JFinalJson;
import com.jfinal.kit.Kv;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import cn.hutool.json.JSONUtil;
/**
 * FieldManager 管理	
 * 描述：	@ClearShiro
 * 2019-03-25 12:23:18
 */
public class FieldManagerController extends   BaseController  {

	private FieldClassService srv = new  FieldClassService();
    private FieldManagerService srcM = new FieldManagerService();
	/**
	 * 列表页面
	 * 
	 * @throws Exception
	 */
	public void list() throws Exception {
		String id = getPara("id","1");
		
		String type= srv.getType(id);
		setAttr("id",id);
		setAttr("type","--"+type);
		
		String sort = getPara("sort", "fieldid");
		String order = getPara("order", "desc");
		
		// 查询条件 caption like ? ", "%"+"关键字"+"%");
		Kv param = Kv.create();
		param.set("r.fieldclass=", id);
		Kv cond = Kv.by("cond", param);
		// 增加排序方式
		cond.set("sort", sort).set("order", order);

		Integer pageNumber = getParaToInt("pages", 1);
		Integer limit = getParaToInt("limit", 9);
		Page<Record> data = srv.pageList(pageNumber, limit, cond);
		setAttr("fieldJson", JSONUtil.parseObj(data));
		render("field.html");
	}	
	
	
	public void field() {
		String id = getPara("id");
//		String pages = getPara("pages");

		setAttr("id",id);
		// 前台排序参数获取
		String sort = getPara("sort", "fieldid");
		String order = getPara("order", "desc");
		// 查询条件 caption like ? ", "%"+"关键字"+"%");
		Kv param = Kv.create();
		param.set("r.fieldclass=", id);
		Kv cond = Kv.by("cond", param);
		// 增加排序方式
		cond.set("sort", sort).set("order", order);
		Integer pageNumber = getParaToInt("pages", 1);
		Integer limit = getParaToInt("limit", 9);
		Page<Record> data = srv.pageList(pageNumber, limit, cond);
		setAttr("fieldJson", JSONUtil.parseObj(data));
		renderJson(JSONUtil.parseObj(data));
	}
	public void edit() {
		String id = getPara();
		FieldManager fieldManager = srcM.findById(id);
		setAttr("fieldManager",JFinalJson.getJson().toJson(fieldManager));
		render("fieldManagerAdd.html");
	}
	/**
	 * 更新字段
	 */
	public void update() {
		FieldManager fieldManager = getModel(FieldManager.class, "", true);
 		String msg="保存成功";
 		//主键是否为空
		if(fieldManager.getId()!=null){
			fieldManager.update();
			msg="更新成功";
		}else{
			fieldManager.save();
		}
		
		renderJson(success(msg));
	}
	
	/**
	 * 删除字段
	 */
	public void del() {
		Object id = getPara("id");
		int flag = srv.deleteById(id);
		renderJson(json(flag));
	}
	/**
	 * 新增字段
	 */
	public void add() {
		FieldManager field = getModel(FieldManager.class,"",true);
		if(srcM.save(field)) {
			setAttr("message", "数据提交成功！");
		}else {
			setAttr("message", "数据提交失败！");
		}
		renderJson();
	}
}