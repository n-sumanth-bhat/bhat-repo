package com.bot.core.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.bot.core.service.StaffService;

@Service
public class StaffServiceImpl implements StaffService {
	
	final static String QUERY_AUTHENTICATE = "SELECT staffName FROM STAFF WHERE staffId = ? AND staffPassword = ?";

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Override
	public String authenticateStaff(String staffId, String staffPwd) {
		//Map<String, String> authenticateResult = new HashMap<>();
		JSONObject authenticateResult = new JSONObject();

		try {
		String staffName = jdbcTemplate.queryForObject(QUERY_AUTHENTICATE, new Object [] {staffId, staffPwd}, String.class );
		authenticateResult.put("status", "success");
		authenticateResult.put("staffName", staffName);
		authenticateResult.put("staffId", staffId);
		authenticateResult.put("staffPwd", staffPwd);

		return authenticateResult.toString();
		}
		catch (EmptyResultDataAccessException e) {
			authenticateResult.put("status", "failed");
			return authenticateResult.toString();
		}
	}

}
