package com.index.field.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseFieldmanager<M extends BaseFieldmanager<M>> extends Model<M> implements IBean {

	public M setFieldname(java.lang.String fieldname) {
		set("fieldname", fieldname);
		return (M)this;
	}
	
	public java.lang.String getFieldname() {
		return getStr("fieldname");
	}

	public M setFieldid(java.lang.String fieldid) {
		set("fieldid", fieldid);
		return (M)this;
	}
	
	public java.lang.String getFieldid() {
		return getStr("fieldid");
	}

	public M setFieldtype(java.lang.String fieldtype) {
		set("fieldtype", fieldtype);
		return (M)this;
	}
	
	public java.lang.String getFieldtype() {
		return getStr("fieldtype");
	}

	public M setFielddesc(java.lang.String fielddesc) {
		set("fielddesc", fielddesc);
		return (M)this;
	}
	
	public java.lang.String getFielddesc() {
		return getStr("fielddesc");
	}

	public M setFieldclass(java.lang.String fieldclass) {
		set("fieldclass", fieldclass);
		return (M)this;
	}
	
	public java.lang.String getFieldclass() {
		return getStr("fieldclass");
	}

	public M setState(java.lang.String state) {
		set("state", state);
		return (M)this;
	}
	
	public java.lang.String getState() {
		return getStr("state");
	}

}