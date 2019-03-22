package com.cf.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.core.Controller;

public class BaseController extends Controller {
	/**
	 * 统一日志
	 */
	// public Log logger = Log.getLog(this.getClass());
	public Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 返回dataResult
	 * 
	 * @param data
	 * @return DataResult
	 */
	public DataResult json(Object data) {
		return new DataResult().success(data);
	}

	public TableResult json(Object data, int count) {
		return new TableResult().success(data, count);
	}

	/**
	 * 返回dataResult
	 * 
	 * @param data
	 * @param message
	 * @return DataResult
	 */
	public DataResult json(Object data, String message) {
		return json(data).setMessage(message);
	}

	/**
	 * 返回dataResult
	 * 
	 * @param data
	 * @param message
	 * @param code
	 * @return DataResult
	 */
	public DataResult json(Object data, String message, int code) {
		return json(data, message).setCode(code);
	}

	/**
	 * 返回dataResult
	 * 
	 * @param message
	 * @return DataResult
	 */
	public DataResult success(String message) {
		return new DataResult().addSuccess(message);
	}

	/**
	 * 返回dataResult
	 * 
	 * @param message
	 * @return DataResult
	 */
	public DataResult error(String message) {
		return new DataResult().addError(message);
	}

	/**
	 * 返回dataResult
	 * 
	 * @param message
	 * @return DataResult
	 */
	public DataResult warn(String message) {
		return new DataResult().addWarn(message);
	}

	/**
	 * 返回dataResult
	 * 
	 * @param message
	 * @return DataResult
	 */
	public DataResult fail(String message) {
		return new DataResult().addFail(message);
	}

}
