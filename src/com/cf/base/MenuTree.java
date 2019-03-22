package com.cf.base;

import java.util.List;


/**
 * 菜单树
 * 
 * @author bigbe
 *
 */
public class MenuTree {

	private Integer id;

	private String name;
	private Integer parent_id;
	private String parent_name;

	private List<MenuTree> children;

	private Integer sort_no;

	private Boolean spread = true;
	private String url;
	private Integer menu_type;
	private Integer status;
	/**
	 * 树的深度
	 */
	private Integer treeLevel;

	public MenuTree() {
		super();
	}

	public MenuTree(Integer id, Integer parent_id, String name) {
		super();
		this.id = id;
		this.parent_id = parent_id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getParent_id() {
		return parent_id;
	}

	public void setParent_id(Integer parent_id) {
		this.parent_id = parent_id;
	}

	public String getParent_name() {
		return parent_name;
	}

	public void setParent_name(String parent_name) {
		this.parent_name = parent_name;
	}

	public List<MenuTree> getChildren() {
		return children;
	}

	public void setChildren(List<MenuTree> children) {
		this.children = children;
	}

	public Integer getSort_no() {
		return sort_no;
	}

	public void setSort_no(Integer sort_no) {
		this.sort_no = sort_no;
	}

	public Boolean getSpread() {
		return spread;
	}

	public void setSpread(Boolean spread) {
		this.spread = spread;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getMenu_type() {
		return menu_type;
	}

	public void setMenu_type(Integer menu_type) {
		this.menu_type = menu_type;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getTreeLevel() {
		return treeLevel;
	}

	public void setTreeLevel(Integer treeLevel) {
		this.treeLevel = treeLevel;
	}

}
