package com.bot.core.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.bot.core.bean.DBDataBean;
import com.bot.core.bean.InactiveAccountsBean;
import com.bot.core.mail.MailUtils;
import com.bot.core.service.DBService;
import com.bot.core.bean.TransactionBean;
import com.bot.core.utils.*;

@Service
public class DBServiceImpl implements DBService {

	final static String INSERT_QUERY = "insert into customer (name,passwd,gmail,aadharNo,accountType,phone,gender,location,statusType,createdAt) values (?,?,?,?,?,?,?,?,?,?)";

	final static String DELETE_QUERY = "delete from customer where  gmail = ?";

	final static String CREDIT_QUERY = "update customer set balance=? where gmail=?";

	final static String GET_STATUS_QUERY = "select statusType from customer where gmail=?";
	
//	final static String GET_CUSTOMER_NAME = "select name from from customer where gmail=?";
	
	final static String GET_CUSTOMER_NAME = "select name from customer where gmail=?";


	final static String GET_BALANCE = "select balance from customer where gmail=?";

	final static String INACTIVE_ACCOUNTS = "select * from customer where statusType=\"Inactive\"";
	
	final static String TRANS_DETAILS = "select * from transaction where gmail = ?";

	final static String USER_NAME_QUERY = "select name from customer where gmail = ? and accountNo =?";
	
	final static String QUERY_AUTHENTICATE = "select name from customer where gmail = ? AND passwd = ?";
	
	final static String TRANSACTION_UPDATE ="insert into transaction (accountNo,gmail,transType,amount,balance,transTime) values(?,?,?,?,?,?)";
	
	final static String GET_ACCOUNTNO ="select accountNo from customer where gmail = ?";

	@Autowired
	JdbcTemplate jdbc;
	
	@Autowired
	MailUtils mail;

	@Autowired
	BOTUtils butils;
	
	@Autowired
	TransactionBean tbean;

	@Override
	public String InsertIntoDb(DBDataBean dbbean) {
		try {
		int affectedRows = jdbc.update(INSERT_QUERY, dbbean.getName(), dbbean.getPasswd(), dbbean.getGmail(),dbbean.getAadharNo(),
				dbbean.getAcType(), dbbean.getPhone(), dbbean.getGender(), dbbean.getLocation(), dbbean.getStatus(),
				dbbean.getCreatedAt());
		if (affectedRows == 1)
			return "Successfully inserted";
		else
			return "Failed to insert";
		}
		catch(EmptyResultDataAccessException e) {
			return "failed";
		}

	}

	@Override
	public String closeAccount(String name, String gmail) {
		try {

		int deletedRows = jdbc.update(DELETE_QUERY, gmail);
		if (deletedRows == 1) {
			return "Account has been deleted Successfully";
		} else
			return "Account details are not available. Please check again";
		}
		catch(EmptyResultDataAccessException e) {
			return "failed";
		}

	}

	@Override
	public String approveAccount(String gmail, String staffId, String accType) {
		
		try {

		String updateStatusQuery = "update customer set statusType = ? where gmail = ?";
		int statusAffected = jdbc.update(updateStatusQuery, "Active", gmail);
		
		String Staff_uppercase_id = staffId.toUpperCase();

		String AccNumber = butils.GenerateAccountNumber(Staff_uppercase_id, accType, gmail);

		String updateAccNumberQuery = "update customer set accountNo=? where gmail=?";
		int acNumberAffected = jdbc.update(updateAccNumberQuery, AccNumber, gmail);

		if (statusAffected == 1 && acNumberAffected == 1) {
			return (AccNumber);
		} else {
			return "failed";
		}
		}
		catch(EmptyResultDataAccessException e) {
			return "failed";
		}
	}

	@Override
	public String creditAmount(String gmail, String amount) {
		try {
		String accStatus = jdbc.queryForObject(GET_STATUS_QUERY, new Object[] { gmail }, String.class);
		if (accStatus.equalsIgnoreCase("inactive")) {
			return "Sorry !!! your account is not-Activated please contact the bank for more info";
		} else {
			
			String accountNo=jdbc.queryForObject(GET_ACCOUNTNO, new Object[] { gmail },String.class);

			float balance = jdbc.queryForObject(GET_BALANCE, new Object[] { gmail }, Float.class);
			float creditAmount=Integer.parseInt(amount);

			float newBalance = 0;
			int mailStatus=-2;
			newBalance = balance + creditAmount;
			//System.out.println("ABout to execute credit amt");
				int balanceAffected = jdbc.update(CREDIT_QUERY, newBalance, gmail);
				//System.out.println("Executed credit amt with balanceAffected"+balanceAffected);
				

				if (balanceAffected == 1) {
					//System.out.println("executing getCustName");
					String custName = jdbc.queryForObject(GET_CUSTOMER_NAME,new Object[] { gmail },String.class);
					//System.out.println("executed getCustName"+custName);

					//mailStatus = mail.amountOperationMail(gmail,custName,creditAmount,"credit",newBalance);
					String transUpdateStatus=transBeanData(accountNo,gmail,"credit",creditAmount,newBalance);
					if(transUpdateStatus=="success") {
						 System.out.println("Ungamma transaction table olage haki aithu anta bandide");
					 }

					
					return "success";
				} else {
					return "failed";
				}


			}
		}
		 catch (EmptyResultDataAccessException e) {
			return "failed";
		 }
	}

	public String debitAmount(String gmail, String amount) {
		
		try {
		String accStatus = jdbc.queryForObject(GET_STATUS_QUERY, new Object[] { gmail }, String.class);
		if (accStatus.equalsIgnoreCase("inactive")) {
			return "Sorry !!! your account is not-Activated please contact the bank for more info";
		} else {

			float balance = jdbc.queryForObject(GET_BALANCE, new Object[] { gmail }, Float.class);

			if (Integer.parseInt(amount) >= balance) {
				return "NoBalance";
			} else {
				
				String accountNo=jdbc.queryForObject(GET_ACCOUNTNO, new Object[] { gmail },String.class);

				
				float newBalance = 0;
				int mailStatus=-2;
				float debitAmount = Integer.parseInt(amount);
				newBalance = balance - debitAmount;

				int balanceAffected = jdbc.update(CREDIT_QUERY, newBalance, gmail);

				if (balanceAffected == 1) {
					String custName = jdbc.queryForObject(GET_CUSTOMER_NAME,new Object[] { gmail },String.class);
					//System.out.println("Sending mail to cust = "+custName);

					mailStatus=mail.amountOperationMail(gmail,custName,debitAmount,"debit",newBalance);
					 String transUpdateStatus=transBeanData(accountNo,gmail,"debit",debitAmount,newBalance);
					 if(transUpdateStatus=="success") {
						 System.out.println("Ungamma transaction table olage haki aithu anta bandide");
					 }

					//System.out.println("Sent mail with mailStatus = "+mailStatus);
					if(mailStatus==1) {
//					if(balanceAffected==1) {
						return "success";
					}
					else {
						return "failedEmail";
					}
					
				} else {
					return "failedTransaction";
				}
			}
		}
		}
		catch(EmptyResultDataAccessException e) {
			//System.out.println("ungamma exception bandaite");
			return "failed";
		}

	}

	@Override
	public List<InactiveAccountsBean> showInactiveAccounts() {
		try {

		List<InactiveAccountsBean> beanList = jdbc.query(INACTIVE_ACCOUNTS,
				new BeanPropertyRowMapper(InactiveAccountsBean.class));
		return beanList;
		}
		catch(EmptyResultDataAccessException e) {
			return null;//----------------innu gottagilla
		
		}

	}

	@Override
	public String getUserDetails(String gmail, String accNo) {
		try {
			String UserName = jdbc.queryForObject(USER_NAME_QUERY, new Object[] { gmail, accNo }, String.class);
			return UserName;
		} catch (EmptyResultDataAccessException e) {
			return "failed";
		}

	}
	
	
	@Override
	public String customerAuthenticate(String gmail,String customerPwd) {
		JSONObject authenticateResult = new JSONObject();

		try {
		String name = jdbc.queryForObject(QUERY_AUTHENTICATE, new Object [] {gmail, customerPwd}, String.class );
		authenticateResult.put("status", "success");
		authenticateResult.put("Name" , name );
		authenticateResult.put("gmail", gmail);
		//authenticateResult.put("Balance", balance);
		//authenticateResult.put("staffPwd", passwd);

		return authenticateResult.toString();
		}
		catch (EmptyResultDataAccessException e) {
			authenticateResult.put("status", "failed");
			return authenticateResult.toString();
		}
		
	}
	
	@Override
	public String getBalance (String gmail) {
		try {
			//System.out.println(gmail);
			float balance = jdbc.queryForObject(GET_BALANCE, new Object[] { gmail }, Float.class);
			//System.out.println(balance);
			return Float.toString(balance);
		}
		catch (Exception e) {
			return "failed";
			// TODO: handle exception
		}
	}
	
	@Override
	public String transactionUpdate(TransactionBean tbean) {
		try {
		int affectedRows= jdbc.update(TRANSACTION_UPDATE,tbean.getAccountNo(),tbean.getGmail(),
				                      tbean.getTransType(),tbean.getAmount(),tbean.getBalance(),tbean.getTransTime());
		
		if (affectedRows == 1)
			return "success";
		else
			return "failed";
		}
		catch(EmptyResultDataAccessException e) {
			return "failed";
		}
	}
	
	@Override
	public String transBeanData(String accNo,String gmail,String transType,float amount,float balance) {
		try {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date date = new Date();
		String transTime = formatter.format(date);

		tbean.setAccountNo(accNo);
		tbean.setGmail(gmail);
		tbean.setTransType(transType);
		tbean.setAmount(amount);
		tbean.setBalance(balance);
		tbean.setTransTime(transTime);
		
		String updateStatus=transactionUpdate(tbean);
		if(updateStatus=="success") {
		
		return "success";
		}
		else {
			return "failed";
		}
		
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("catch "+e.getMessage());
			return "failed";
		}
		
	}
	
	@Override
	public List<TransactionBean> TransactionDetails(String gmail) {
		try {

		List<TransactionBean> beanList = jdbc.query(TRANS_DETAILS,new Object[] {gmail},
				new BeanPropertyRowMapper(TransactionBean.class));
		return beanList;
		}
		catch(EmptyResultDataAccessException e) {
			return null;//----------------innu gottagilla
		
		}

	}


}
