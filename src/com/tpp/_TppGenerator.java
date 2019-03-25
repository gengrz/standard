
package com.tpp;

/**
 * 自动生成代码
 * @author Administrator
 *
 */
public class _TppGenerator {

	public static void main(String[] args) {
		String className = "FieldManager";
		String tableName = "FieldManager";
		String prefix = "";

		JfGenerator.me
				.setSrcFolder("src/main/java")
//				.setJsFolder("/src/main/webapp/static/")
				.setPackageBase("com.").setBasePath("system")
				// .tableSql(getSqlList())
				.javaRender(className, tableName, prefix)
				.htmlRender(className, tableName);

		System.out.println("---------OK-刷新一下项目吧---------");
	}

	// private static List<String> getSqlList() {
	// ArrayList<String> sqlList = new ArrayList<String>();
	//
	// sqlList.add("DROP TABLE IF EXISTS `blog`;");
	// sqlList.add("CREATE TABLE `blog` ( " +
	// " `id` int(11) NOT NULL AUTO_INCREMENT, " +
	// " `test` varchar(255) DEFAULT NULL, " +
	// " PRIMARY KEY (`id`) " +
	// ") ENGINE=InnoDB DEFAULT CHARSET=utf8;");
	//
	// return sqlList;
	// }

}
