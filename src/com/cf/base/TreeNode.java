package com.cf.base;



/**
 * 
 * @author bigbe
 *
 */
public class TreeNode {

	private Integer id;
	private Integer pId;
	private String name;

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

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	@Override
	public String toString() {
		return "TreeNode [id=" + id + ", name=" + name + ", pId=" + pId + "]";
	}

	public TreeNode(Integer id, Integer pId, String name) {
		super();
		this.id = id;
		this.name = name;
		this.pId = pId;
	}

}
