package com.index.field.controller;


import com.cf.base.BaseController;
import com.index.field.base.FieldManager;
import com.index.field.service.FieldClassService;
import com.index.field.service.FieldManagerService;
import com.jfinal.aop.Before;
import com.jfinal.kit.Kv;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

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
		setAttr("id",id);
		String type= srv.getType(id);

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
		String pages = getPara("pages");
		
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
		//System.out.println(pageNumber+"--------"+limit);
		Page<Record> data = srv.pageList(pageNumber, limit, cond);
		setAttr("fieldJson", JSONUtil.parseObj(data));
		//System.out.println(JSONUtil.parseObj(data));
		renderJson(JSONUtil.parseObj(data));
	}
	public void edit() {
		String id = getPara();
		FieldManager fieldManager = srcM.findById(id);
		setAttr("fieldManager", fieldManager);
		render("fieldManagerAdd.html");
	}
	
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