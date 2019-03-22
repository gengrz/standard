package com.cf.base;

import java.util.List;

public class DeptTree {

	private Integer value;

	private String text;
	private Integer parent_id;
	private List<DeptTree> children;

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getParent_id() {
		return parent_id;
	}

	public void setParent_id(Integer parent_id) {
		this.parent_id = parent_id;
	}

	public List<DeptTree> getChildren() {
		return children;
	}

	public void setChildren(List<DeptTree> children) {
		this.children = children;
	}

}
