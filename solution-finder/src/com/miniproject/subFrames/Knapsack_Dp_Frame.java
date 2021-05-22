package com.miniproject.subFrames;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import org.apache.commons.lang3.StringUtils;

import com.miniproject.DAA.DP_Knapsack_code;

public class Knapsack_Dp_Frame {
	JFrame f;
	JTextField tf1,tf2,tf3;
	JLabel label1,label2,label3,statusLabel,resultLabel;
	JButton solve;
	public void Knapsack_Dp(){
        f=new JFrame("0/1 Knapsack");
		
		label1=new JLabel();
		tf1=new JTextField();
		label1.setText("Enter the weights of objects: ");
		label1.setBounds(10,10,400,100);
		tf1.setBounds(250,40,300,30);
		
		label2=new JLabel();
		tf2=new JTextField();
		label2.setText("Enter the corresponding values of object: ");
		label2.setBounds(10,70,400,100);
		tf2.setBounds(250,100,300,30);
		
		label3=new JLabel();
		tf3=new JTextField();
		label3.setText("Enter the knapsack weight: ");
		label3.setBounds(10,120,300,100);
		tf3.setBounds(250,160,300,30);
		
		solve=new JButton("Solve");
		solve.setBackground(Color.LIGHT_GRAY);
		solve.setBounds(100,200,125,25);
		statusLabel=new JLabel();
		statusLabel.setBounds(30,250,250,100);



		
		f.setSize(700, 700);
		f.setLayout(null);
		f.setVisible(true);
		
		f.add(label1);
		f.add(tf1);
		f.add(label2);
		f.add(tf2);
		f.add(label3);
		f.add(tf3);
		f.add(solve);
		f.add(statusLabel);
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);


		solve.addActionListener(new CustomKnapsackdpAlgo());
		tf3.addKeyListener(new CustomKeyListener());
	}
	class CustomKnapsackdpAlgo implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			solve.setEnabled(false);
			String weight=tf1.getText();
			String profit=tf2.getText();
			String knap_weight=tf3.getText();
			
			if(StringUtils.isBlank(weight)||StringUtils.isBlank(profit)||StringUtils.isBlank(knap_weight)){
				statusLabel.setText("Invalid input!!!please Enter valid input");

				}
			else{
				statusLabel.setVisible(false);
				DP_Knapsack_code kdp=new DP_Knapsack_code();
				String result=kdp.conversion(weight,profit,knap_weight);
				
				resultLabel=new JLabel(result);
				resultLabel.setBounds(30,250,400,100);
				f.add(resultLabel);
				resultLabel.repaint();

			}
		}

	}
	class CustomKeyListener implements KeyListener {
		public void keyTyped(KeyEvent e) {
		}

		public void keyPressed(KeyEvent e) {
			if (e.getKeyCode() == KeyEvent.VK_ENTER) {
				solve.setEnabled(false);
				String weight=tf1.getText();
				String profit=tf2.getText();
				String knap_weight=tf3.getText();
				if(StringUtils.isBlank(weight)||StringUtils.isBlank(profit)||StringUtils.isBlank(knap_weight)){
					statusLabel.setText("Invalid input!!!please Enter valid input");

					}
				
				else {
					statusLabel.setVisible(false);
					DP_Knapsack_code kdp=new DP_Knapsack_code();
					String result=kdp.conversion(weight,profit,knap_weight);
					resultLabel=new JLabel(result);
					resultLabel.setBounds(30,250,400,100);
				
					f.add(resultLabel);
					resultLabel.repaint();

				}
			}
		}

		public void keyReleased(KeyEvent e) {
		}
	}

}
