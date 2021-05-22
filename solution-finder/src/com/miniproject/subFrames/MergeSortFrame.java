package com.miniproject.subFrames;


import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

import com.miniproject.DAA.MergeSort;


public class MergeSortFrame {
	
		
		 JFrame f;
		 JButton submit;
		 JTextField textfield, tf1;;
		 JLabel statusLabel,statusLabel1;
	      String input;
//		 String input;

		public  void Mergesort() {
		

			f=new JFrame("MergeSort");

		submit = new JButton("SUBMIT"); // submit button
		submit.setBounds(100, 100, 140, 40);
		submit.setBackground(Color.LIGHT_GRAY);

		JLabel label = new JLabel(); // enter name label
		JLabel label1 = new JLabel();
		label.setText("Enter the elements to be sorted:");
		label.setBounds(10, 10, 400, 100);
		label1.setBounds(60, 60, 400, 100);

		f.add(submit);
		
		statusLabel = new JLabel();
		statusLabel1 = new JLabel();
		statusLabel.setBounds(10, 200, 300, 40);
		statusLabel1.setBounds(10, 250, 300, 40);

		

		f.setSize(700, 700);
		f.setLayout(null);
		f.setVisible(true);


		textfield = new JTextField();
		textfield.setBounds(300, 40, 200, 30);
		//tf1.setBounds(300, 100, 200, 30);
		
		f.add(label1);

		f.add(textfield);
		f.add(label);
		f.add(statusLabel);
		f.add(statusLabel1);
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);




		textfield.addKeyListener(new CustomKeyListener());
		submit.addActionListener(new CustomActionListener());

	}

	 class CustomActionListener implements ActionListener  {
		public void actionPerformed(ActionEvent e) {
			submit.setEnabled(false);
			input = textfield.getText();
			String result[] = MergeSort.Function(input);
			if((!result[0].contains("Invalid input")||result[0].contains("Exception"))){
				statusLabel.setText("<html>Sorted array is  "+result[0]+"<br>Time taken for sorting in nanoseconds = "+result[1]+"</html>");

			}
			else
				statusLabel.setText(result[0]);


		}
	}

	 class CustomKeyListener implements KeyListener {
		public void keyTyped(KeyEvent e) {
		}

		public void keyPressed(KeyEvent e) {
			if (e.getKeyCode() == KeyEvent.VK_ENTER) {
				submit.setEnabled(false);
				input = textfield.getText();
				String result[] = MergeSort.Function(input);
				if(!(result[0].contains("Invalid input")||result[0].contains("Exception"))){
					statusLabel.setText("<html>Sorted array is  "+result[0]+"<br>Time taken for sorting in nanoseconds = "+result[1]+"</html>");

				}
				else
					statusLabel.setText(result[0]);
				

			}
		}

		public void keyReleased(KeyEvent e) {
		}
	}

	 }



