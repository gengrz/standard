package com.cf.route;




import java.nio.file.Path;
import java.nio.file.Paths;

import com.cf._MappingSet;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.ehcache.EhCachePlugin;
import com.jfinal.template.Engine;


/**
 * 
 * API引导式配置
 */
public class BookingConfig extends JFinalConfig {
	/**
	 * 配置常量
	 */
	public void configConstant(Constants me) {
		me.setDevMode(isDevMode());
		PropKit.use("db.properties");
		initErrorView(me);
	}
	private boolean isDevMode() {
//		return Config.getToBoolean("CONSTANTS.DEV_MODE");
		return true;
	}
	private void initErrorView(Constants me) {
		
	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		me.add(new SystemRoute());
		
	}

	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
	}

	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		DruidPlugin druidPlugin = createDruidPlugin();
		me.add(druidPlugin);

		
		
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
		// sql 模板的添加

		String webRootPath = PathKit.getRootClassPath();// 获取项目跟路径
		Path absoluteWebPath = Paths.get(webRootPath, "/sql");// 获取项目绝对根路径
		arp.setBaseSqlTemplatePath(absoluteWebPath.toString());
		arp.addSqlTemplate("/all.sql");
		// 所有映射在 MappingKit 中自动化搞定
		_MappingSet.mapping(arp);
		me.add(arp);
		// me.add(new ShiroPlugin());
		me.add(new EhCachePlugin());
	
		
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {

	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
		// 全局变量
		me.add(new ContextPathHandler("ctx"));
	}

	/**
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 * 
	 * 使用本方法启动过第一次以后，会在开发工具的 debug、run config 中自动生成
	 * 一条启动配置，可对该自动生成的配置再添加额外的配置项，例如 VM argument 可配置为： -XX:PermSize=64M
	 * -XX:MaxPermSize=256M
	 */
	public static void main(String[] args) {
		/**
		 * 特别注意：Eclipse 之下建议的启动方式
		 */
		JFinal.start("WebContent", 8085, "/");

	}

	@Override
	public void configEngine(Engine arg0) {
		// TODO Auto-generated method stub
		
	}

	

}
