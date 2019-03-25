package com.tpp;

import java.util.List;
import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSource;
import com.cf.route.BookingConfig;
import com.jfinal.kit.Kv;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.generator.DataDictionaryGenerator;
import com.jfinal.plugin.activerecord.generator.Generator;
import com.jfinal.plugin.activerecord.generator.MetaBuilder;
import com.jfinal.plugin.activerecord.generator.TableMeta;
import com.jfinal.plugin.druid.DruidPlugin;

import cn.hutool.core.date.DateUtil;

/**
 * 代码生成器
 * 
 * @author
 */
public class JfGenerator {

	public static final JfGenerator me = new JfGenerator();
	protected final JfEnjoy jfEngine = new JfEnjoy();

	protected Kv tablemetaMap = null;
	protected String packageBase = "";
	protected String srcFolder = "";
//	protected String viewFolder = "";
	protected String basePath = "";
	protected String sqlPath = "";

	public JfGenerator setPackageBase(String packageBase) {
		this.packageBase = packageBase;
		return this;
	}

	public JfGenerator setBasePath(String basePath) {
		this.basePath = basePath;
		return this;
	}

	public JfGenerator setSrcFolder(String srcFolder) {
		this.srcFolder = srcFolder;
		return this;
	}

 
	protected class DataGenerator extends DataDictionaryGenerator {
		public DataGenerator(DataSource dataSource, String dataDictionaryOutputDir) {
			super(dataSource, dataDictionaryOutputDir);
		}

		public void rebuildColumnMetas(List<TableMeta> tableMetas) {
			super.rebuildColumnMetas(tableMetas);
		}
	}

	public TableMeta getTableMeta(String tableName) {
		if (tablemetaMap == null) {

			DataSource dataSource = getDataSource();

			MetaBuilder metaBuilder = new MetaBuilder(dataSource);
			metaBuilder.setDialect(new MysqlDialect());
			// metaBuilder.addExcludedTable(_LabelGenerator.excludedTable);
			List<TableMeta> tableMetas = metaBuilder.build();
			new DataGenerator(dataSource, null).rebuildColumnMetas(tableMetas);

			if (tableMetas.size() == 0) {
				System.out.println("TableMeta 数量为 0，不生成任何文件");
				return null;
			}
			Kv kv = Kv.create();
			for (TableMeta tableMeta : tableMetas) {
				kv.set(tableMeta.name, tableMeta);
			}
			tablemetaMap = kv;
		}
		return (TableMeta) tablemetaMap.get(tableName);
	}

	/**
	 * 生成手脚架代码
	 */
	// public JfGenerator allRender(String className, String tableName) {
	// return javaRender(className, tableName).htmlRender(className, tableName);
	// }

	/**
	 * java 代码生成
	 */
	public JfGenerator javaRender(String className, String tableName, String prefix) {

		// 生成 映射对象 表名，要去掉的前缀
		generator(tableName, prefix);

		return controllerTpl(className).modelTpl(tableName, className).sqlTpl(tableName, className)
				.menuTpl(tableName, className).service(className, tableName);
		// .validator(className).service(className, tableName)
	}

	public static void generator(String tableName, String prefix) {
		// base model 所使用的包名
		String baseModelPackageName = "com.book.common.model.base";
		// base model 文件保存路径
		// String baseModelOutputDir = PathKit.getWebRootPath() +
		// "/../src/com/common/model/base";
		String baseModelOutputDir = PathKit.getWebRootPath() + "\\src\\main\\java\\com\\book\\common\\model\\base";

		// model 所使用的包名 (MappingKit 默认使用的包名)
		String modelPackageName = "com.book.common.model";
		// model 文件保存路径 (MappingKit 与 DataDictionary 文件默认保存路径)
		String modelOutputDir = baseModelOutputDir + "\\..";

		// 创建生成器
		Generator generator = new Generator(getDataSource(), baseModelPackageName, baseModelOutputDir, modelPackageName,
				modelOutputDir);

		MyMetaBuilder mb = new MyMetaBuilder(getDataSource());
		mb.setTablePrefix(tableName);
		generator.setMetaBuilder(mb);

		// 设置是否生成链式 setter 方法
		generator.setGenerateChainSetter(false);
		// 添加不需要生成的表名
		// generator.addExcludedTable("adv");
		// 设置是否在 Model 中生成 dao 对象
		generator.setGenerateDaoInModel(true);
		// 设置是否生成链式 setter 方法
		generator.setGenerateChainSetter(true);
		// 设置是否生成字典文件
		generator.setGenerateDataDictionary(false);
		// 设置需要被移除的表名前缀用于生成modelName。
		generator.setRemovedTableNamePrefixes(prefix);
		// 生成
		generator.generate();
	}

	public static DataSource getDataSource() {
		PropKit.use("db.properties");
		DruidPlugin druidPlugin = BookingConfig.createDruidPlugin();
		druidPlugin.start();

		DruidDataSource ds = (DruidDataSource) druidPlugin.getDataSource();
		Properties properties = new Properties();
		properties.setProperty("remarks", "true");
		properties.setProperty("useInformationSchema", "true");
		ds.setConnectProperties(properties);
		return ds;
	}

	private String toClassNameSmall(String className) {
		return new StringBuffer(className.substring(0, 1).toLowerCase()).append(className.substring(1)).toString();
	}

	private String toPackages(String className) {
		String packName = new StringBuffer(packageBase).append(".").append(basePath).append(".")
				.append(className.toLowerCase()).toString().replace("..", ".");
		System.out.println("packName===" + packName);
		return packName;
	}

	// /**
	// * 生成数据库表
	// */
	// public JfGenerator tableSql(List<String> sqlList) {
	// BookingConfig config = new BookingConfig();
	// Plugins plugins = new Plugins();
	// config.configConstant(new Constants());
	// config.configPlugin(plugins);
	// for (IPlugin iPlugin : plugins.getPluginList())
	// iPlugin.start();
	//
	// Db.batch(sqlList, 200);
	// return this;
	// }

	/**
	 * 生成数据库表 TODO tableMeta待完成..
	 */
	public JfGenerator tableMeta(List<TableMeta> tableMetas) {
		return this;
	}

	/**
	 * 生成Controller
	 * 
	 * @param className
	 *            类名称
	 */
	public JfGenerator controllerTpl(String className) {
		String packages = toPackages(className);

		String classNameSmall = toClassNameSmall(className);

		jfEngine.render("/java/controller.html",
				Kv.by("package", packages).set("className", className).set("classNameSmall", classNameSmall)
						.set("basePath", basePath).set("date", DateUtil.date().toString()),
				new StringBuilder().append(System.getProperty("user.dir")).append("/").append(srcFolder).append("/")
						.append(packages.replace(".", "/")).append("/").append(className).append("Controller.java")
						.toString());
		return this;
	}

	// model
	public JfGenerator modelTpl(String tableName, String className) {
		String packages = toPackages(className);

		String classNameSmall = toClassNameSmall(className);

		jfEngine.render("/java/model.html",
				Kv.by("package", packages).set("className", className).set("classNameSmall", classNameSmall)
						.set("basePath", basePath).set("tableName", tableName).set("date", DateUtil.date().toString()),
				new StringBuilder().append(System.getProperty("user.dir")).append("/").append(srcFolder).append("/")
						.append("/com/book/common/model/").append(className).append(".java").toString());
		return this;
	}

	// sql
	public JfGenerator sqlTpl(String tableName, String className) {
		String packages = toPackages(className);

		String classNameSmall = toClassNameSmall(className);
		Kv kv = Kv.by("package", packages).set("className", className).set("classNameSmall", classNameSmall)
				.set("basePath", basePath).set("tableName", tableName);

		kv.set("date", DateUtil.date().toString());
		StringBuilder filePath = new StringBuilder();
		filePath.append(System.getProperty("user.dir")).append("/");
		filePath.append("/src/main/resources/sql/"+basePath).append("/").append(classNameSmall).append(".sql");
		jfEngine.render("/sql/tpl.html", kv, filePath.toString());
		return this;
	}

	// sql
	public JfGenerator menuTpl(String tableName, String className) {
		TableMeta tablemeta = getTableMeta(tableName);

		String classNameSmall = toClassNameSmall(className);
		Kv kv = Kv.by("className", className).set("basePath",basePath).set("classNameSmall", classNameSmall).set("basePath", basePath)
				.set("tableName", tableName).set("tablemeta", tablemeta).set("classNameLower", className.toLowerCase());

		kv.set("date", DateUtil.date().toString());
		StringBuilder filePath = new StringBuilder();
		filePath.append(System.getProperty("user.dir")).append("/");
		filePath.append("/src/main/resources/sql/"+basePath).append("/").append(classNameSmall).append("_insert.sql");
		jfEngine.render("/sql/insert.sql", kv, filePath.toString());
		return this;
	}

	/**
	 * 生成validator
	 * 
	 * @param className
	 *            类名称
	 */
	// public JfGenerator validator(String className) {
	// String packages = toPackages(className);
	//
	// String classNameSmall = toClassNameSmall(className);
	//
	// jfEngine.render("/java/validator.html",
	// Kv.by("package", packages).set("className",
	// className).set("classNameSmall", classNameSmall),
	// new
	// StringBuilder().append(System.getProperty("user.dir")).append("/").append(srcFolder).append("/")
	// .append(packages.replace(".",
	// "/")).append("/").append(className).append("Validator.java"));
	// return this;
	// }

	/**
	 * 生成Service
	 * 
	 * @param className
	 *            类名称
	 * @param tableName
	 *            表名
	 */
	public JfGenerator service(String className, String tableName) {
		String packages = toPackages(className);

		String classNameSmall = toClassNameSmall(className);

		jfEngine.render("/java/service.html",
				Kv.by("package", packages).set("className", className).set("classNameSmall", classNameSmall)
						.set("tableName", tableName),
				new StringBuilder().append(System.getProperty("user.dir")).append("/").append(srcFolder).append("/")
						.append(packages.replace(".", "/")).append("/").append(className).append("Service.java")
						.toString());
		return this;
	}

	/**
	 * @param className
	 * @param tableName
	 */
	public JfGenerator htmlRender(String className, String tableName) {
		TableMeta tablemeta = getTableMeta(tableName);

		return htmlList(className, tablemeta);
	}

	public JfGenerator htmlList(String className, TableMeta tablemeta) {
		String packages = toPackages(className);
		String classNameSmall = toClassNameSmall(className);
		String basePathUrl = basePath.replace('.', '/');

		Kv kv = Kv.by("tablemeta", tablemeta).set("package", packages).set("className", className)
				.set("classNameSmall", classNameSmall).set("classNameLower", className.toLowerCase())
				.set("basePath", basePathUrl);

		// list.html路径
		StringBuilder filePath = new StringBuilder().append(System.getProperty("user.dir")).append("/");
		 
		filePath.append("/src/main/webapp/WEB-INF/view/"+basePath).append("/").append(classNameSmall.toLowerCase()).append("/");
		String file_path = filePath.toString();
		
		jfEngine.render("/html/list_tpl.html", kv, file_path + (classNameSmall + "List.html"));
		jfEngine.render("/html/cru_tpl.html", kv, file_path + (classNameSmall + "Add.html"));

		// JS路径
		StringBuilder jsPath = new StringBuilder();
		jsPath.append(System.getProperty("user.dir")).append("/");
		jsPath.append("/src/main/webapp/static/"+basePath).append("/");
		String js_path = jsPath.toString();

//		jfEngine.render("/html/cru_tpl.js", kv, js_path + (classNameSmall + "Add.js"));
		jfEngine.render("/html/list_tpl.js", kv, js_path + (classNameSmall + ".js"));
		return this;
	}

}
