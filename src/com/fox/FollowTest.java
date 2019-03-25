package com.fox;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;

import cn.hutool.core.io.FileUtil;

public class FollowTest {

	public static void main(String[] args) {

		String listStr = FileUtil.readString("./follow.json", "utf-8");

		List<PhoneData> pd = JSONObject.parseArray(listStr, PhoneData.class);
		pd.sort((o1, o2) -> o1.getDataTime() .compareTo(o2.getDataTime()));
		
		System.out.println(pd.size());
		
		int id = 0;
		for (PhoneData phoneData : pd) {
			
			System.out.println(phoneData.toString());
			phoneData.setId(id);
			id++;
		}
		
//		for (PhoneData phoneData : pd) {
//			System.out.println(phoneData.getId() );
//		}
//		for (PhoneData phoneData : pd) {
//			System.out.println( phoneData.getLatitude() );
//		}
//		for (PhoneData phoneData : pd) {
//			System.out.println(phoneData.getLongitude());
//		}
	}

}
