package com.bot.core.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bot.core.service.StaffService;

@RestController
public class BotStaffController {
	
	@Autowired
	StaffService staffService;
	
	@GetMapping("/staffAuthenticate")
	public String staffAuthenticate(@RequestParam (value = "staffId") String staffId, @RequestParam(value = "staffPwd") String staffPwd) {
		return staffService.authenticateStaff(staffId, staffPwd);
	}

}
