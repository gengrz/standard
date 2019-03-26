package com.index.input.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.index.field.service.FieldClassService;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sun.org.apache.regexp.internal.recompile;

public class DataInputService {
	
	public Log logger = Log.getLog(DataInputService.class);
	
	/**
	 * 读取数据源分类
	 * @return
	 */
	public List<Record> queryDataSources() {
		return  Db.find("SELECT * from dataclass order by classid asc");
	}
	/**
	 * 根据id查询数据源信息
	 */
	public Record queryDSById(String dsId) {
		return Db.findFirst("SELECT * from data_source_mgr where data_source_id=UNHEX('"+dsId+"')");
	}
	/**
	 * 查询数据源表格
	 * @return
	 */
	public List<Record> queryDataGrid(){
		return  Db.find("SELECT hex(a.data_source_id) as data_source_id,a.data_source_name,a.data_source_key,a.believe_level,a.creater_time,b.classname from data_source_mgr as a  LEFT JOIN dataclass as b " + 
				"	on a.data_source_type=b.classid ");
	}
	
	/**
	 * 保存数据源
	 */
	public void saveDataSource(Map<String,String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("insert into ");
		sql.append("data_source_mgr(data_source_id,data_source_name,data_source_key,believe_level,version,separators,");
		sql.append("data_source_type,data_source_desc,data_source_file_id,creator,creater_time) values(");
		sql.append("unhex('"+param.get("dsId")+"'),'"+param.get("dsname")+"','"+param.get("dskey")+"',");
		sql.append(param.get("zxd")+",'"+param.get("version")+"','"+param.get("fgf")+"','");
		sql.append(param.get("dstype")+"','"+param.get("dsdesc")+"',unhex('"+param.get("fileId")+"'),");
		sql.append("'username',now()");
		sql.append(")");
		System.out.println(sql.toString());
		Db.update(sql.toString());
	}
	
	
	/**
	 * 处理上传文件
	 * @param s
	 * @param t
	 */
	public void fileChannelCopy(File s, File t,String fileId,String fileName,String filePath) {
        FileInputStream fi = null;
        FileOutputStream fo = null;
        FileChannel in = null;
        FileChannel out = null;
        try {
            fi = new FileInputStream(s);
            fo = new FileOutputStream(t);
            in = fi.getChannel();// 得到对应的文件通道
            out = fo.getChannel();// 得到对应的文件通道
            in.transferTo(0, in.size(), out);// 连接两个通道，并且从in通道读取，然后写入out通道
            
            StringBuffer sql = new StringBuffer();
            sql.append("insert into data_source_file(file_id,file_name,file_path,creator,creater_time) ");
            sql.append("values(");
            sql.append("unhex('"+fileId+"'),'"+fileName+"','"+filePath+"','username',now()");
            sql.append(")");
            Db.update(sql.toString());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fi.close();
                in.close();
                fo.close();
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
	
	/**
	 * 读取文件
	 * @param filePath  文件地址
	 * @param separators  分隔符
	 * @return
	 */
    public List<Record> readFile(String filePath,String separators) {
        try (
             BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)))
        ) {
        	if("0".equals(separators)) {
        		separators = "	";
        	}else if("1".equals(separators)) {
        		separators = ",";
        	}else if("2".equals(separators)) {
        		separators = "\"";
        	}else {
        		separators = ";";
        	}
            String line;
            String[] fieId = null;
            List<Record> fieIdList = new ArrayList<Record>();
            while ((line = br.readLine()) != null) {
                // 一次读入一行数据
                System.out.println(line);
                //处理数据分隔符  中文逗号
                fieId = line.split(separators) ;
                System.out.println(fieId.length);
                for(int i=0;i<fieId.length;i++) {
                	Record map = new Record();
                	map.set("field", fieId[i]);
                	map.set("index", i);
					/*
					 * map.put("field", fieId[i]); map.put("index", String.valueOf(i));
					 */
                	fieIdList.add(map);
                }
            }
            return fieIdList;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 查询属性信息
     * @return
     */
    public List<Record> queryAttrList(){
    	
    	return Db.find("select * from fieldclass");
    }
    /**
     * 根据属性id查询字段
     * @param id
     * @return
     */
    public List<Record> queryAttrInfoById(String id){
    	
    	return Db.find("select fieldname,fieldid from fieldmanager where fieldclass = "+id);
    }
    
    public Record queryFileInfo(String fileId){
    	
    	return  Db.findFirst("select file_path from data_source_file where file_id=UNHEX('"+fileId+"')");
    }
}
