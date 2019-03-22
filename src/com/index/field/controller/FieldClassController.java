package com.index.field.controller;


import java.util.List;

import com.cf.base.BaseController;
import com.index.field.service.FieldClassService;
import com.jfinal.plugin.activerecord.Record;

import cn.hutool.json.JSONUtil;
/**
 * FieldClass 管理	
 * 描述：	@ClearShiro
 * 2019-03-19 14:18:59
 */
public class FieldClassController extends   BaseController  {

	private FieldClassService srv = new  FieldClassService();

	public void index() {
		List<Record> list= srv.getAll();
		System.out.println(list.toString());
		setAttr("fieldtype", JSONUtil.parseArray(list));
		render("home.html");
	}
	public void home() {
//		ArrayList<FieldClass> list = srv.getAll();
//		ArrayList<FieldClass> list = "";
//		System.out.println(list.toString());
		System.out.println("111");
		setAttr("fieldtype", JSONUtil.parseArray("[{'name':'','id':'','h':''},{'name':'','id':'','h':''}]"));
		render("home.html");
	}

	public void field() {
		
		setAttr("type","-人物属性");
		render("field.html");
	}
	public void field2() {
		setAttr("type","-虚拟属性");
		render("field.html");
	}
	
}