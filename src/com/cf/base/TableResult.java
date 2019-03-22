package com.cf.base;

import com.jfinal.kit.JsonKit;

/**
 * Ajax返回针对layui table的结果集
 * 
 * @author yu_bo
 *
 */
public class TableResult {

	// 标记成功失败，默认0:成功,1:失败
	private int code = 0;
	
	// 返回的分页总条数
	private int count = 0;

	// 返回的中文消息
	private String message;

	// 成功时携带的数据
	private Object data;

	public int getCode() {
		return code;
	}

	public TableResult setCode(int code) {
		this.code = code;
		return this;
	}

	public int getCount() {
		return count;
	}

	public TableResult setCount(int count) {
		this.count = count;
		return this;
	}

	public String getMessage() {
		return message;
	}

	public TableResult setMessage(String message) {
		this.message = message;
		return this;
	}

	public Object getData() {
		return data;
	}

	public TableResult setData(Object data) {
		this.data = data;
		return this;
	}

	// 添加成功，用于alertSuccess
	public TableResult addSuccess(String message) {
		this.message = message;
		this.code = 0;
		this.data = null;
		return this;
	}

	// 添加错误，用于alertError
	public TableResult addError(String message) {
		this.message = message;
		this.code = 1;
		this.data = null;
		return this;
	}

	// 添加错误，用于alertFail
	public TableResult addFail(String message) {
		this.message = message;
		this.code = 999;
		this.data = null;
		return this;
	}

	// 添加警告，用于alertWarn
	public TableResult addWarn(String message) {
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
	public TableResult success(Object data, int count) {
		this.message = "success";
		this.data = data;
		this.count = count;
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
