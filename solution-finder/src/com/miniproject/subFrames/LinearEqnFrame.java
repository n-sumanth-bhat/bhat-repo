package com.miniproject.subFrames;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

import org.apache.commons.lang3.StringUtils;

import com.miniproject.maths.Solve_Linear_Equation;

public class LinearEqnFrame {
	JFrame f;
	JButton ok;
	JTextField textfield, tf1;
	JTextArea textarea;
	JLabel statusLabel, statusLabel1;
	String input;
	JLabel label1 = new JLabel();
	JLabel label2 = new JLabel();
	JTextArea textArea;
	JButton solve;
	JLabel resultLabel;

	public void lineareqn() {
		f = new JFrame("Linear Equation");

		ok = new JButton("ok"); // ok button
		ok.setBounds(275, 40, 50, 20);
		ok.setBackground(Color.LIGHT_GRAY);

		JLabel label = new JLabel(); // enter name label
		label.setText("Enter the number of variables:");
		label.setBounds(10, 5, 300, 100);

		label1.setBounds(60, 60, 550, 100);
		label2.setBounds(10, 120, 550, 100);

		f.setSize(900, 900);
		f.setLayout(null);
		f.setVisible(true);

		textfield = new JTextField();
		statusLabel1=new JLabel();
		textfield.setBounds(200, 40, 65, 25);
		statusLabel1.setBounds(50, 100, 300, 200);

		f.add(ok);
		f.add(label);
		f.add(textfield);
		f.add(statusLabel1);
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);


		ok.addActionListener(new CustomLinearEquation());
		textfield.addKeyListener(new CustomKeyListener());
		f.add(label1);
		f.add(label2);
		

	}

	class CustomLinearEquation implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			String variables = textfield.getText();
			if(StringUtils.isBlank(variables)||variables==Integer.toString(0)){
				
			statusLabel1.setText("Invalid input!!!please Enter valid input");
			
			
			}
			else {
				statusLabel1.setVisible(false);
				secinput();
				
			}
		}
	}

	class CustomKeyListener implements KeyListener {
		public void keyTyped(KeyEvent e) {
		}

		public void keyPressed(KeyEvent e) {
			if (e.getKeyCode() == KeyEvent.VK_ENTER) {
				String variables = textfield.getText();
				if(StringUtils.isBlank(variables)||variables==Integer.toString(0)){
					
				statusLabel1.setText("Invalid input!!!please Enter valid input");
				
				
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
		label1.setText("Enter the coefficients of each variable for each equations like ax + by + cz + ... = d");
		label2.setText("Enter the coefficient of equation(a1 b1 c1 d1...) :");

		textArea = new JTextArea();
		textArea.setBounds(300, 150, 200, 200);
		f.add(textArea);
		textArea.repaint();

		solve = new JButton("Solve");
		solve.setBounds(50, 430, 100, 20);
		solve.setBackground(Color.LIGHT_GRAY);
		f.add(solve);
		solve.repaint();

		solve.addActionListener(new SolveLinearEqn());

	}

	class SolveLinearEqn implements ActionListener {

		@Override
		public void actionPerformed(ActionEvent e) {
			solve.setEnabled(false);
			String input = textArea.getText();
			String length = textfield.getText();
			String result = Solve_Linear_Equation.lineqn(length, input);
			if((result.contains("Invalid"))||(result.contains("Exception")))
				resultLabel = new JLabel(result);
			else
				resultLabel = new JLabel("<html>Result is <br>" + result + "</html>");
			resultLabel.setBounds(10, 300, 400, 400);
			f.add(resultLabel);
			resultLabel.repaint();

		}

	}

}
