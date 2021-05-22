package com.bot.core.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BOTUtils {
	@Autowired
	JdbcTemplate jdbc;

	final static String BANK_NAME = "BOT";
	final static String SB = "00";
	final static String CURRENT = "01";
	final static String ID_QUERY = "select ID from customer where gmail=?";

	
	public String GenerateAccountNumber(String empID, String acType, String gmail) {

		//String acNumber;
		String fullAccountNumber;

		if (acType.equalsIgnoreCase("SB")) {
			fullAccountNumber = BANK_NAME + SB + empID;
		}
		else if (acType.equalsIgnoreCase("Current")) {
			fullAccountNumber = BANK_NAME + CURRENT + empID;
		}
		else {
			return "Invalid Account type";
		}

		//acNumber = GenerateNumber(gmail);

		fullAccountNumber += GenerateNumber(gmail);
		return fullAccountNumber;
	}

	public String GenerateNumber(String gmail) {
		String idOfCustomer = jdbc.queryForObject(ID_QUERY, new Object[] { gmail }, String.class);
		String IdGenerated = null;
		if (idOfCustomer.length() == 1) {
			IdGenerated = "000" + idOfCustomer;
		} else if (idOfCustomer.length() == 2) {
			IdGenerated = "00" + idOfCustomer;
		} else if (idOfCustomer.length() == 3) {
			IdGenerated = "0" + idOfCustomer;
		} else {
			IdGenerated = idOfCustomer;
		}
		return IdGenerated;
	}
	
	

}
