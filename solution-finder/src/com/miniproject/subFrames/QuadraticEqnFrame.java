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

import com.miniproject.maths.Quadratic;


public class QuadraticEqnFrame {
	 JFrame f;
	 JButton Solve;
	 JTextField textfield;
	 JTextField tf1;
	 JLabel statusLabel,statusLabel1;
      String input;
      public void quadraticEqn(){
    	  f=new JFrame("Quadratic Equation");

  		Solve = new JButton("Solve"); // Solve button
  		Solve.setBounds(120, 170, 140, 40);
  		Solve.setBackground(Color.LIGHT_GRAY);

  		JLabel label = new JLabel(); // enter name label
  		JLabel label1 = new JLabel();
  		label.setText("Quadratic equation is of the form ax^2 + bx + c=0");
  		label.setBounds(10, 10, 400, 100);
  		label1.setText("Enter the coefficients a b c :");
  		label1.setBounds(60, 60, 400, 100);

  		f.add(Solve);
  		
  		statusLabel = new JLabel();
  		statusLabel1 = new JLabel();
  		statusLabel.setBounds(10, 210, 300, 40);
  		statusLabel1.setBounds(10, 250, 300, 40);

  		

  		f.setSize(700, 700);
  		f.setLayout(null);
  		f.setVisible(true);


  		textfield = new JTextField();
  		textfield.setBounds(270,100, 200, 30);
  		//tf1.setBounds(300, 100, 200, 30);
  		
  		f.add(label1);

  		f.add(textfield);
  		f.add(label);
  		f.add(label1);
  		f.add(statusLabel);
  		f.add(statusLabel1);
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);




  		textfield.addKeyListener(new CustomKeyListener());
  		Solve.addActionListener(new CustomActionListener());

  	}


  	 class CustomActionListener implements ActionListener  {
  		public void actionPerformed(ActionEvent e) {
  			Solve.setEnabled(false);
  			input = textfield.getText();
  			if(StringUtils.isBlank(input)){
  				statusLabel.setText("Invalid input!!Please Enter valid input");
  			}else{
  			Quadratic qe=new Quadratic();
  			String result[] = qe.findRoots(input);
  			if((result[0].contains("Invalid input")||result[0].contains("Exception")))
  				statusLabel.setText(result[0]);
  			else{
  				Solve.setEnabled(false);
  				statusLabel.setText("Root 1 ="+result[0]);
  			statusLabel1.setText("Roor 2 = "+result[1]);
  			}

  		}
  	}
  	 }
  	 class CustomKeyListener implements KeyListener {
  		public void keyTyped(KeyEvent e) {
  		}

  		public void keyPressed(KeyEvent e) {
  			if (e.getKeyCode() == KeyEvent.VK_ENTER) {
  	  			Solve.setEnabled(false);

  				input = textfield.getText();
  	  			if(StringUtils.isBlank(input)){
  	  				statusLabel.setText("Invalid input!!Please Enter valid input");
  	  			}else
  	  			{
  	  			Quadratic qe=new Quadratic();
  	  			String result[] = qe.findRoots(input);
  	  			if(result[0].contains("Invalid input"))
  	  				statusLabel.setText(result[0]);
  	  			else{
  	  				Solve.setEnabled(false);
  	  				statusLabel.setText("Root 1 ="+result[0]);
  	  			statusLabel1.setText("Roor 2 = "+result[1]);
  	  			}

  			}
  		}
  		}

  		public void keyReleased(KeyEvent e) {
  		}
  	}

     
  	 }


