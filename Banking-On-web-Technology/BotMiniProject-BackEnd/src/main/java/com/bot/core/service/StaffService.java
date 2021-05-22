package com.bot.core.service;

import org.springframework.stereotype.Service;

@Service
public interface StaffService {
	
	public String authenticateStaff(String staffMail, String staffPwd);

}
