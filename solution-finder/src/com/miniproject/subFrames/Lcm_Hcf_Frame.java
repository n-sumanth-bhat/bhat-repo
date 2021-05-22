package com.miniproject.subFrames;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

import org.apache.commons.lang3.StringUtils;

import com.miniproject.maths.HCF_LCM_Code;

public class Lcm_Hcf_Frame {
    JFrame f=new JFrame("LCM and HCF");
    JTextField tf1,tf2;
    JButton ok;
    JLabel label1,label2,statusLabel1,resultLabel,resultLabel2;
    JCheckBox HCF,LCM;
    JButton solve;
    public void Lcm_hcf(){
    	label1=new JLabel("How many numbers :");
    	label1.setBounds(10,0,150,100);
    	
    	tf1=new JTextField();
    	tf1.setBounds(300,40,65,35);
    	
    	ok=new JButton("Ok");
        ok.setBounds(450,40,60,20);
        
        f.setSize(700,700);
		f.setLayout(null);
		statusLabel1=new JLabel();
		statusLabel1.setBounds(50, 100, 300, 200);


		f.setVisible(true);
		f.add(ok);
		f.add(label1);
		f.add(tf1);
		f.add(statusLabel1);
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);


		
		ok.addActionListener(new CustomLcmAlgo());
		tf1.addKeyListener(new CustomKeyListener());

    }
    class CustomLcmAlgo implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			String variables = tf1.getText();
			if(StringUtils.isBlank(variables)||variables==Integer.toString(0)){
			statusLabel1.setText("Invalid input!!!please Enter valid input");
			
			}
			else {
				secinput();
				
			}
		}
	}
    class CustomKeyListener implements KeyListener {
		public void keyTyped(KeyEvent e) {
		}

		public void keyPressed(KeyEvent e) {
			if (e.getKeyCode() == KeyEvent.VK_ENTER) {
				String variables = tf1.getText();
				if(StringUtils.isBlank(variables)||variables==Integer.toString(0)){
					
				statusLabel1.setText("Invalid input!!!please Enter valid input");
//				f.add(statusLabel1);

				
				
				}
				else {
					statusLabel1.setVisible(false);
					secinput();
					
				}
			}
		}

		public void keyReleased(KeyEvent e) {
		}
	}
    public void secinput() {
		ok.setEnabled(false);
		label2=new JLabel();
		label2.setText("Enter the numbers :");
		label2.setBounds(10,40,550,200);

		
		tf2=new JTextField();
		tf2.setBounds(200, 100, 200, 50);


		
		
		HCF=new JCheckBox("HCF");
		LCM=new JCheckBox("LCM");
		HCF.setBounds(100,200,50,30);
		LCM.setBounds(200,200,50,30);
		f.add(HCF);
		f.add(LCM);
		f.add(label2);

		HCF.repaint();
		LCM.repaint();
		label2.repaint();
        f.add(tf2);
		tf2.repaint();
		

	    solve = new JButton("Solve");
		solve.setBounds(50, 270, 100, 20);
		solve.setBackground(Color.LIGHT_GRAY);
		f.add(solve);

		solve.repaint();

		solve.addActionListener(new LcmFunction_2());

	}
    class LcmFunction_2 implements ActionListener{
    	@Override
		public void actionPerformed(ActionEvent e) {
    		solve.setEnabled(false);
    		String input=tf2.getText();
    	
    		if(StringUtils.isBlank(input)){
    			statusLabel1.setBounds(50,300,300,200);
				statusLabel1.setText("Invalid input!!!please Enter valid input");
    		}else
    		{
    		if(HCF.isSelected()){
    			String numbers =tf2.getText();
    			String variables=tf1.getText();
    		            HCF_LCM_Code gcd=new HCF_LCM_Code();
    					String result=gcd.HCF(variables,numbers);
    				     resultLabel = new JLabel(result);
    				     resultLabel.setBounds(10,300,200,200);
    						f.add(resultLabel);
    						resultLabel.repaint();


    		}
    		if(LCM.isSelected()){
    			String numbers=tf2.getText();
    			String variables=tf1.getText();
    			HCF_LCM_Code lcm=new HCF_LCM_Code();
    			String result=lcm.conversion(variables,numbers);
    			resultLabel2=new JLabel(result);
    			resultLabel2.setBounds(300,300,200,200);
    			f.add(resultLabel2);
    			resultLabel2.repaint();
    		}
    	}
    	}
    }
    }


