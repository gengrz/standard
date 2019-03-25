package com.fox;

/**
 * 基站信息
 * 
 * @author yu_bo
 *
 */
public class PhoneData {

	private Integer id;// 13153592566
	private String phoneNo;// 13153592566

	private String duration;// 447

	private String baseNo;// 21314_50594827

	private String inTime;// 20180809192043

	private String imei;// 86250503890763

	private String baseName;// 滨州市滨城区BZBC0057-ERRRUS12-FH01-铁塔-(滨市吉宫-FL吉宫大厦)-A1

	private String longitude;// 118.019570000

	private String imsi;// 460015436998556

	private String latitude;// 37.377550000

	private String dataTime;// 20180809184455

	public PhoneData() {
		super();
	}

	public PhoneData(String phoneNo, String duration, String baseNo, String inTime, String imei, String baseName,
			String longitude, String imsi, String latitude, String dataTime) {
		super();
		this.phoneNo = phoneNo;
		this.duration = duration;
		this.baseNo = baseNo;
		this.inTime = inTime;
		this.imei = imei;
		this.baseName = baseName;
		this.longitude = longitude;
		this.imsi = imsi;
		this.latitude = latitude;
		this.dataTime = dataTime;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getBaseNo() {
		return baseNo;
	}

	public void setBaseNo(String baseNo) {
		this.baseNo = baseNo;
	}

	public String getInTime() {
		return inTime;
	}

	public void setInTime(String inTime) {
		this.inTime = inTime;
	}

	public String getImei() {
		return imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public String getBaseName() {
		return baseName;
	}

	public void setBaseName(String baseName) {
		this.baseName = baseName;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getImsi() {
		return imsi;
	}

	public void setImsi(String imsi) {
		this.imsi = imsi;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getDataTime() {
		return dataTime;
	}

	public void setDataTime(String dataTime) {
		this.dataTime = dataTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "PhoneData [ dataTime=" + dataTime+ ", longitude="+ longitude + ", latitude=" + latitude + ", baseName=" + baseName  + "]";
	}

}
