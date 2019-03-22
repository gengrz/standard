package com.cf.base;

import com.jfinal.kit.JsonKit;

/**
 * Ajax返回结果集
 * 
 * @author bigbe
 *
 */
public class DataResult {

	// 标记成功失败，默认0:成功,1:失败
	private int code = 0;

	// 返回的中文消息
	private String message;

	// 成功时携带的数据
	private Object data;

	public int getCode() {
		return code;
	}

	public DataResult setCode(int code) {
		this.code = code;
		return this;
	}

	public String getMessage() {
		return message;
	}

	public DataResult setMessage(String message) {
		this.message = message;
		return this;
	}

	public Object getData() {
		return data;
	}

	public DataResult setData(Object data) {
		this.data = data;
		return this;
	}

	// 添加成功，用于alertSuccess
	public DataResult addSuccess(String message) {
		this.message = message;
		this.code = 0;
		this.data = null;
		return this;
	}

	// 添加错误，用于alertError
	public DataResult addError(String message) {
		this.message = message;
		this.code = 1;
		this.data = null;
		return this;
	}

	// 添加错误，用于alertFail
	public DataResult addFail(String message) {
		this.message = message;
		this.code = 999;
		this.data = null;
		return this;
	}

	// 添加警告，用于alertWarn
	public DataResult addWarn(String message) {
		this.message = message;
		this.code = 2;
		this.data = null;
		return this;
	}

	/**
	 * 
	 * 封装成功时的数据
	 * 
	 * @param data
	 * 
	 * @return AjaxResult
	 */
	public DataResult success(Object data) {
		this.message = "success";
		this.data = data;
		this.code = 0;
		return this;
	}

	public boolean isSuccess() {
		return getCode() == 0;
	}

	@Override
	public String toString() {
		return JsonKit.toJson(this);
	}
}
