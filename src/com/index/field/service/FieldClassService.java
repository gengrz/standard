package com.index.field.service;

import java.util.List;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
/**
 * FieldClass 管理	
 * 描述：
 */
public class FieldClassService {

	public Log logger = Log.getLog(FieldClassService.class);
	
	/**
	 * 分页列表
	 * 
	 * @return 全部list
	 */
	public List<Record> getAll() {
		System.out.println(Db.find("select * from fieldclass order by classid asc"));
		return  Db.find("select * from fieldclass order by classid asc");
	}
	
}