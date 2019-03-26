package com.index.field.service;

import java.util.ArrayList;

import com.index.field.base.FieldManager;
import com.jfinal.kit.Kv;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.SqlPara;;
/**
 * FieldManager 管理	
 * 描述：
 */
public class FieldManagerService {

	public Log logger = Log.getLog(FieldManagerService.class);
	
//	public static final FieldManagerService me = Enhancer.enhance(FieldManagerService.class);
	
	// dao 对象只让本业务使用，其它要用它的地方统统在业务层创建方法来转调
	private final  FieldManager dao = new  FieldManager();
	
	
	
	/**
	 * 分页列表
	 * 
	 * @param pageNumber
	 * @param pageSize
	 * @param cond
	 * @return Page
	 */
	public Page<FieldManager> pageList(int pageNumber, int pageSize, Kv cond) {
		SqlPara sqlPara = dao.getSqlPara("fieldManager.pageList", cond);
		Page<FieldManager> pu = dao.paginate(pageNumber, pageSize, sqlPara);
		//dao.paginate(pageNumber, pageSize, sqlPara);
		return pu;
	}
	/**
	 * 分页列表
	 * 
	 * @return 全部list
	 */
	public ArrayList<FieldManager> getAll() {
		return (ArrayList<FieldManager>) dao.find("select * from fieldmanager order by id asc");
	}
	/**
	 * 批量删除
	 * 
	 * @param cond
	 * @return
	 */
	public int batchDel(Kv cond) {
		SqlPara sqlPara = dao.getSqlPara("fieldManager.batchDel", cond);
		return Db.update(sqlPara);

	}
 
	/**
	* 保存
	*/
	public boolean save(FieldManager fieldManager) {
		return fieldManager.save();
	}
	
	/**
	* 更新
	*/
	public void update(FieldManager fieldManager) {
		fieldManager.update();
	}
	
	/**
	* 查询
	*/
	public FieldManager findById(Object idValue) {
		return dao.findById(idValue);
	}
	
	/**
	* 删除
	*/
	public int deleteById(Object fieldManagerId) {
		int res=Db.update("delete from fieldmanager where id=?", fieldManagerId);
		return res;
	}
	
	
}