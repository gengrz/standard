package com.index;


import com.cf.base.BaseController;

/**
 * 
 * IndexController
 */
public class HomeController extends BaseController {
	public void index() {
		render("home.html");
	}

	public void console() {
		render("console.html");
	}

}
