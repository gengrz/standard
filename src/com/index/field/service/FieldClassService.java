package com.index.field.service;

import java.util.List;

import com.jfinal.kit.Kv;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.SqlPara;
/**
 * FieldClass 管理	
 * 描述：
 */
public class FieldClassService {

	public Log logger = Log.getLog(FieldClassService.class);

	public List<Record> getAll() {
//		System.out.println(Db.find("select * from fieldclass order by classid asc"));
		return  Db.find("select * from fieldclass order by classid asc");
	}
	/**
	 * 分页列表
	 * 
	 * @param pageNumber
	 * @param pageSize
	 * @param cond
	 * @return Page
	 */
	public Page<Record> pageList(int pageNumber, int pageSize, Kv cond) {
		SqlPara sqlPara = Db.getSqlPara("fieldManager.pageList", cond);
		Page<Record> pu = Db.paginate(pageNumber, pageSize, sqlPara);
		System.out.println(pu);
		return pu;
	}
	
	
	public String getType(String id) {
		return Db.find("select * from fieldclass where classid="+id).get(0).get("classname");
	}
	
}