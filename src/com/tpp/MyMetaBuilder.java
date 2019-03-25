package com.tpp;

import javax.sql.DataSource;

import com.jfinal.plugin.activerecord.generator.MetaBuilder;

/**
 * <p>
 * Title: A.java
 * </p>
 * <p>
 * Description: 描述
 * </p>
 * 
 * @author bigbe
 * @version 1.0
 * @created 2016年9月12日 上午8:57:50
 */
public class MyMetaBuilder extends MetaBuilder {
	public String tablePrefix;

	public MyMetaBuilder(DataSource dataSource) {
		super(dataSource);
	}

	public void setTablePrefix(String tablePrefix) {
		this.tablePrefix = tablePrefix;
	}

	/**
	 * 跳过一些不希望处理的 table，定制更加灵活的 table 过滤规则
	 * 
	 * @return 返回 true 时将跳过当前 tableName 的处理
	 */
	@Override
	protected boolean isSkipTable(String tableName) {
		return !tableName.equals(tablePrefix);
	}
}