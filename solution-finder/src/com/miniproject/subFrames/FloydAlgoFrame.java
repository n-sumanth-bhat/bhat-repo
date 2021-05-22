package com.miniproject.subFrames;
import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

import org.apache.commons.lang3.StringUtils;

import com.miniproject.DAA.FloydAlgorithm;

public class FloydAlgoFrame {
	JFrame f;
	JButton ok;
	JTextField textfield, sourceField;
	JTextArea textarea;
	JLabel statusLabel, statusLabel1;
	String input;
	JLabel label1 = new JLabel();
	JLabel label2 = new JLabel();
	JTextArea textArea;
	JButton solve;
	JLabel resultLabel,resultLabel1;
	public void FloydFunction(){
		f = new JFrame("Floyd's Algorithm");
		ok = new JButton("ok"); // ok button
		ok.setBounds(500, 40, 50, 20);
		ok.setBackground(Color.LIGHT_GRAY);

		JLabel label = new JLabel(); // enter name label
		label.setText("Enter the number of rows/cloumns of the Matrix :");
		label.setBounds(10, 0, 300, 100);

		label1.setBounds(10, 40, 550, 100);

		f.setSize(700,700);
		f.setLayout(null);
		f.setVisible(true);
		textfield = new JTextField();
		statusLabel1=new JLabel();
		textfield.setBounds(400, 40, 65, 25);
		statusLabel1.setBounds(50, 100, 300, 200);

		f.add(ok);
		f.add(label);
		f.add(textfield);
		f.add(statusLabel1);
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);


		ok.addActionListener(new CustomFloydAlgo());
		textfield.addKeyListener(new CustomKeyListener());
		//f.add(label1);
		f.add(label1);
		
	}
	 class CustomFloydAlgo implements ActionListener {
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
			label1.setText("Enter the matrix :");

			textArea = new JTextArea();
			textArea.setBounds(120, 80, 200, 200);
			f.add(textArea);
			textArea.repaint();
			
			JLabel note=new JLabel("Note : Use 99 for Infinity ");
			note.setBounds(50,260,200,100);
			f.add(note);

			 solve = new JButton("Solve");
			solve.setBounds(50, 340, 100, 20);
			solve.setBackground(Color.LIGHT_GRAY);
			f.add(solve);
			solve.repaint();

			solve.addActionListener(new FloydFunction_2());

		}
		class  FloydFunction_2 implements ActionListener {

			@Override
			public void actionPerformed(ActionEvent e) {
				solve.setEnabled(false);
				String inputArray = textArea.getText();
				String length = textfield.getText();
				FloydAlgorithm fa=new FloydAlgorithm();
				 String result = fa.conversion(length , inputArray);
				if((result.contains("Invalid")||result.contains("Exception")))
					resultLabel = new JLabel(result);
				else
				{

					result = result.replace("\n","<br>");
					resultLabel = new JLabel("<html>"+result+"</html>");
				}
				    resultLabel.setBounds(10, 175, 800,500);

				f.add(resultLabel);
				resultLabel.repaint();

			}

		}
}
