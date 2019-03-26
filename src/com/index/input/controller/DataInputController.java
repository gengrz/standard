package com.index.input.controller;


import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.cf.base.BaseController;
import com.index.input.service.DataInputService;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;

import cn.hutool.json.JSONUtil;


public class DataInputController extends BaseController{
	
	private DataInputService srv = new  DataInputService();
	
	public void index() {
		List<Record> list= srv.queryDataSources();
		setAttr("dataSources",JSONUtil.parseArray(list));
		render("home.html");
	}
	
	public void queryDataGrid() {
		List<Record> list = srv.queryDataGrid();
		System.out.println(list.toString());
		renderJson(json(list, list.size()));
	}
	
	public void getAddDataPage() {
		List<Record> list= srv.queryDataSources();
		System.out.println(list.toString());
		setAttr("dataSources",JSONUtil.parseArray(list));
		render("add_data.html");
	}
	
	public void saveDataSource() {
		Map<String,String> param = new HashMap<String, String>();
		String dsId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
		param.put("dsId", dsId);
		param.put("dsname", getPara("dsname"));
		param.put("dskey", getPara("dskey"));
		param.put("zxd", getPara("zxd"));
		param.put("version", getPara("version"));
		param.put("fgf", getPara("fgf"));
		param.put("dstype", getPara("dstype"));
		param.put("dsdesc", getPara("dsdesc"));
		//param.put("fileId", null);
		param.put("fileId", getPara("fileId"));
		System.out.println("数据源信息========"+param);
		
		srv.saveDataSource(param);
		Map<String,String> result = new HashMap<String, String>();
		result.put("fileId", getPara("fileId"));
		result.put("dsId", dsId);
		result.put("message", "true");
		renderJson(JSONUtil.parseFromMap(result));
	}
	/**
	 * 文件上传
	 */
	public void fileUpload() {
		UploadFile uploadFile=this.getFile();
        String fileName=uploadFile.getOriginalFileName();
        File file=uploadFile.getFile();    
        System.out.println(fileName);
        System.out.println(file.getPath());
        
        String fileId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
        LocalDateTime ldt = LocalDateTime.now();
        
        String date = ldt.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String filePath = "E:\\file\\"+date+"\\"+fileId+".txt";
		String filePath2 = "E:/file/"+date+"/"+fileId+".txt";
		File t=new File(filePath); 
		File dir = t.getParentFile();
		try {
			if (!dir.exists()) {
				dir.mkdirs();
			}
			t.createNewFile();
		} catch (IOException e) {
			e.printStackTrace(); 
		} 
		srv.fileChannelCopy(file, t,fileId,fileName,filePath2);
		file.delete();
		Map<String,Object> result = new HashMap<String, Object>();
		result.put("message", fileName);
		result.put("fileId", fileId);
		System.out.println(JSONUtil.parseFromMap(result));
		//返回信息
		setAttr("fileId", fileId);
		renderJson(JSONUtil.parseFromMap(result));
 
	}
	/**
	 * 跳转结构定义页面
	 */
	public void getStructureDefinePage() {
		String dsId = getPara("dsId");
		String fileId = getPara("fileId");
		//根据文件id获取文件属性
		Record file = srv.queryFileInfo(fileId);
		Record ds = srv.queryDSById(dsId);
		String separators = ds.getStr("separators");
		System.out.println(file);
		//读取文件字段
		List<Record> fileField = srv.readFile(file.getStr("file_path"),separators);
		System.out.println(fileField);
		//查询属性列表
		List<Record> list = srv.queryAttrList();
		String id = list.get(0).getStr("classid");
		//默认展示第一个属性的字段信息
		List<Record> attrInfo = srv.queryAttrInfoById(id);
		System.out.println(attrInfo);
		setAttr("fileField", fileField);
		setAttr("fieldIndex", fileField.size());
		setAttr("attrInfo",JSONUtil.parseArray(attrInfo));
		setAttr("attrList",JSONUtil.parseArray(list));
		render("add_data2.html");
	}
	/**
	 * 根据属性id查询字段
	 */
	public void queryAttrInfoById() {
		String id = getPara("attrId");
		int i = Integer.parseInt(id);
		++i;
		System.out.println(i);
		List<Record> attrInfo = srv.queryAttrInfoById(String.valueOf(i));
		renderJson(JSONUtil.parseArray(attrInfo));
	}
	/**
	 * 保存数据源字段信息
	 */
	public void saveDSField() {
		
		int size = Integer.valueOf(getPara("lastField"));
		String index = "index";
		String field = "field";
		String sample = "sample";
		List<Map<String,String>> list = new ArrayList<Map<String,String>>();
		for(int i=0;i<size;i++) {
			Map<String,String> map = new HashMap<String, String>();
			map.put("index", getPara(index+i));
			map.put("field", getPara(field+i));
			map.put("sample", getPara(sample+i));
			list.add(map);
		}
		System.out.println(list);
		Map<String,Object> result = new HashMap<String, Object>();
		result.put("success", true);
		
		renderJson();
	}
	
	
}
