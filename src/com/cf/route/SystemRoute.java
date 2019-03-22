package com.cf.route;


import com.index.HomeController;
import com.index.field.controller.FieldClassController;
import com.index.input.controller.DataInputController;
import com.index.input.controller.FileUpLoadController;
import com.jfinal.config.Routes;

/**
 * 
 * @author 前台路由
 *
 */
public class SystemRoute extends Routes {

	@Override
	public void config() {

		setBaseViewPath("/WEB-INF/view");
		add("/system/home", HomeController.class, "/system/admin"); //
		add("/system/field", FieldClassController.class, "/system/fieldclass");
		add("/system/dataInput",DataInputController.class,"/system/dataInput");

	}


}
