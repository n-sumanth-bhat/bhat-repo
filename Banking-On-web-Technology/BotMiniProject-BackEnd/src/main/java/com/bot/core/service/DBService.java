package com.bot.core.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bot.core.bean.DBDataBean;
import com.bot.core.bean.InactiveAccountsBean;
import com.bot.core.bean.TransactionBean;

@Service
public interface DBService {

	public String InsertIntoDb(DBDataBean bean);

	public String closeAccount(String name, String gmail);
	
	public String getUserDetails(String gmail,String accNo);
	
	public List<InactiveAccountsBean> showInactiveAccounts();
	
	public String approveAccount(String gmail,String staffId,String accType);
		
	public String creditAmount(String gmail,String amount);
	
	public String debitAmount(String gmail,String amount);
	
	public String customerAuthenticate(String gmail,String customerPwd);
	
	public String getBalance(String gmail);
	
	public String transactionUpdate(TransactionBean tbean);
	
	public String transBeanData(String accNo,String gmail,String transType,float amount,float balance);
	
	public List<TransactionBean> TransactionDetails(String gmail);

}
