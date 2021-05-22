package com.bot.core.controller;

//name=&passwd=&gmail=&phone=&actype=&gender=&location=
//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.bot.core.bean.DBDataBean;
import com.bot.core.bean.InactiveAccountsBean;
import com.bot.core.bean.TransactionBean;
import com.bot.core.mail.MailUtils;
import com.bot.core.service.DBService;
import com.bot.core.utils.BOTUtils;

@RestController
public class BotController {

	@Autowired
	JdbcTemplate jd;

	@Autowired
	DBService dbservice;

	@Autowired
	DBDataBean dbbean;
	
//	@Autowired
//	TransactionBean tbean;

	@Autowired
	BOTUtils util;

	@Autowired
	MailUtils mailUtils;

	@GetMapping(path = "/")
	private String welcome() {
		return "Welcome to BOT....";
	}

	@GetMapping(path = "/getUser")
	public String customerDetails(@RequestParam(value = "gmail") String gmail,
			@RequestParam(value = "accNo") String accNo) {
		// return jd.queryForList("select * from customer", String.class);
		// System.out.println("gmail === " + gmail + "hash===== " + gmail.hashCode());
		// return gmail.hashCode();

		// return util.GenerateAccountNumber("SN1", "sb");

//		MailUtils mu=new MailUtils();
		// mu.accountGeneratedMail();

//		final String INACTIVE_QUERY="Select * from customer where statusType=?";
		// return jd.update(INACTIVE_QUERY,"InActive",String.class);

//		return dbservice.showInactiveAccounts();
		String userName = dbservice.getUserDetails(gmail, accNo);
		return userName;

	}

	@GetMapping(path = "/insertData")
	public String insertData(@RequestParam(value = "name") String name, @RequestParam(value = "passwd") String passwd,
			@RequestParam(value = "aadharNo") String aadharNo, @RequestParam(value = "gmail") String gmail,
			@RequestParam(value = "phone") long phone, @RequestParam(value = "acType") String acType,
			@RequestParam(value = "gender") String gender, @RequestParam(value = "location") String location) {

		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date date = new Date();
		String createdAt = formatter.format(date);

		dbbean.setName(name);
		dbbean.setPasswd(passwd);
		dbbean.setAadharNo(aadharNo);
		dbbean.setGmail(gmail);
		dbbean.setPhone(phone);
		dbbean.setAcType(acType);
		dbbean.setGender(gender);
		dbbean.setLocation(location);
		dbbean.setStatus("InActive");
		dbbean.setCreatedAt(createdAt);

		return dbservice.InsertIntoDb(dbbean);

	}
	
	@GetMapping(path="/getBalance")
	public String getAccountBalance(@RequestParam(value="gmail")String gmail) {
		return dbservice.getBalance(gmail);
	}

	@GetMapping(path = "/closeAccount")
	public String closeAcc(@RequestParam(value = "name") String name, @RequestParam(value = "gmail") String gmail) {
		return dbservice.closeAccount(name, gmail);
	}

	@GetMapping(path = "/approve")
	public String ApproveAccount(@RequestParam(value = "gmail") String gmail,
			@RequestParam(value = "staffId") String staffId, @RequestParam(value = "AccType") String accType) {

		return dbservice.approveAccount(gmail, staffId, accType);
	}

	@GetMapping(path = "/sendActivatedMail")
	public String ActivatedMailToCustomer(@RequestParam(value = "gmail") String gmail,
			@RequestParam(value = "accNo") String accNo,
			@RequestParam(value = "name") String accHolderName) {
			mailUtils.accountActivatedMail(gmail,accNo, accHolderName);
			return "Mail Has been sent successfully";
	}

//	@GetMapping(path = "/sendRejectedMail")
//	public String RejectedMailToCustomer(@RequestParam(value = "gmail") String gmail,
//			@RequestParam(value = "accNo") String accNo,
//			@RequestParam(value = "name") String accHolderName) {
//		mailUtils.accountRejectedMail(gmail,accHolderName);
//		return "Rejected Mail Has been sent successfully";
//
//	}
	@GetMapping(path = "/customerAuthenticate")
	public String customerAuthenticate(@RequestParam(value = "gmail") String gmail,@RequestParam(value="customerPwd") String passwd) {
		return dbservice.customerAuthenticate(gmail, passwd);
	}
	
	@GetMapping(path = "/credit")
	public String creditBalance(@RequestParam(value = "gmail") String gmail,
			@RequestParam(value = "amount") String amount) {

		return dbservice.creditAmount(gmail, amount);
	}

	@GetMapping(path = "/debit")
	public String debitBalance(@RequestParam(value = "gmail") String gmail,
			@RequestParam(value = "amount") String amount) {

		return dbservice.debitAmount(gmail, amount);
	}

	@GetMapping(path = "/showInactiveRecords")
	public List<InactiveAccountsBean> InactiveDetails() {
		return dbservice.showInactiveAccounts();

	}
	
	@GetMapping(path = "/transactionHistory")
	public List<TransactionBean> TransactionDetails(@RequestParam(value = "gmail")String gmail){
		
		return dbservice.TransactionDetails(gmail);
	}

}
