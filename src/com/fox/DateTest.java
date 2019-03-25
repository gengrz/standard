package com.fox;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.jfinal.plugin.activerecord.Record;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.ClassScaner;

public class DateTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(DateUtil.date(1528158347470l).toString());
		System.out.println(System.currentTimeMillis());

		// TODO Auto-generated method stub
		Set<Class<?>> set = ClassScaner.scanPackage("com.hetian");
		Map<String, String> map = new HashMap<String, String>();

		map.put("1", "AA");

		map.put("2", "BB");

		map.put("3", "CC");

		map.put("4", "DD");

		Collection<String> valueCollection = map.values();

		final int size = valueCollection.size();

		List<String> valueList = new ArrayList<String>(valueCollection);

		String[] valueArray = new String[size];

		map.values().toArray(valueArray);
		List<Record> ls=null;
		Record  rc=null;
		 
	}
}
