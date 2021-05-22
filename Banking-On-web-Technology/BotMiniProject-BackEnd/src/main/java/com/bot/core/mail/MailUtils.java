package com.bot.core.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
public class MailUtils {
	
	@Autowired
	private JavaMailSender mailSender;

	public void accountActivatedMail(String emailId, String accNo, String name) {
		SimpleMailMessage acMail=new SimpleMailMessage();
		//acMail.setFrom("noreply@BOTCreators.com");
		acMail.setTo(emailId);
		acMail.setText("This is system generated mail.\nPlease donot reply to this mail\nkindly ignore if the subjected information is not for you.\n\n "
		+"Hi "+name+",\n\nYour Account has been Activated successfully!! Please find the below details\n"
		+"Username : "+emailId+"\n"
		+"AccountNumber : "+accNo+"\n"
		+"Password : You can use the password which you had given while creating the account to login");
		acMail.setSubject("BOT notification - Account Activated.");
		
		mailSender.send(acMail);
	}
	
	public void accountRejectedMail(String emailId,String name) {
		SimpleMailMessage acMail=new SimpleMailMessage();
		//acMail.setFrom("noreply@BOTCreators.com");
		acMail.setTo(emailId);
		acMail.setText("This is system generated mail.\nPlease donot reply to this mail\nkindly ignore if the subjected information is not for you.\n\n "
		+"Hi"+name+",\n\nYour Account creation requested has been rejected! Please make another request with proper details\n");
		acMail.setSubject("BOT notification - Account Creating Request FAILED!!.");
		
		mailSender.send(acMail);
	}
	
	public int amountOperationMail(String emailId,String name,float amount,String operation,float balance) {
		try {
		SimpleMailMessage acMail=new SimpleMailMessage();
		acMail.setTo(emailId);
		acMail.setText("This is system generated mail.\nPlease donot reply to this mail\nkindly ignore if the subjected information is not for you.\n\n "
		+"Hi  "+name+",\n Your account has been "+operation+" to rs."+amount+".\n"
		+"\n\n Current Balance is rs."+balance);
		mailSender.send(acMail);
		return 1;
		}
		catch (Exception e) {
			return 0;
		}
				
	}
	
	
}
