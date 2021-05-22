package com.miniproject.subFrames;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextArea;
import javax.swing.JTextField;

import org.apache.commons.lang3.StringUtils;

import com.miniproject.DAA.Hamiltanion_cycle_code;

public class Hamiltanion_Cycle_Frame {
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
	public void Hamiltanion_Cycle(){
		f = new JFrame("Hamiltanion Cycle");
		   ok = new JButton("ok"); // ok button
			ok.setBounds(500, 40, 50, 20);
			ok.setBackground(Color.LIGHT_GRAY);

			JLabel label = new JLabel(); // enter name label
			label.setText("Enter the number of vertices in the graph :");
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


			ok.addActionListener(new CustomHamilAlgo());
			textfield.addKeyListener(new CustomKeyListener());
			//f.add(label1);
			f.add(label1);
			
	   }
	   class CustomHamilAlgo implements ActionListener {
			public void actionPerformed(ActionEvent e) {
				String variables = textfield.getText();
				if(StringUtils.isBlank(variables)||(variables==Integer.toString(0))){
					
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
			
//			label2.setText("Enter the source vertex :");
//			label2.setBounds(10, 270, 200, 100);
//			f.add(label2);
//			
//			sourceField = new JTextField();
//			sourceField.setBounds(180, 310, 65, 25);
//			f.add(sourceField);
			
			JLabel note=new JLabel("Note : Use 99 for Infinity ");
			note.setBounds(50,270,200,100);
			f.add(note);
			

			solve = new JButton("Solve");
			solve.setBounds(50, 350, 100, 20);
			solve.setBackground(Color.LIGHT_GRAY);
			f.add(solve);
			solve.repaint();

			solve.addActionListener(new HamilAlgorithm());

		}

		class  HamilAlgorithm implements ActionListener {

			@Override
			public void actionPerformed(ActionEvent e) {
				solve.setEnabled(false);
				String inputArray = textArea.getText();
				String length = textfield.getText();
				//String source = sourceField.getText();
				Hamiltanion_cycle_code hcc=new Hamiltanion_cycle_code();
				 String result = hcc.conversion(length , inputArray);
				if((result.contains("doesnot")||result.contains("Exception")))
					resultLabel = new JLabel(result);
				else
				{
					//result=result.replace("src", source);
					result = result.replace("\n","<br>");
					resultLabel = new JLabel("<html>"+result+"</html>");
				}
				    resultLabel.setBounds(10, 220, 800,500);

				f.add(resultLabel);
				resultLabel.repaint();

	}

}
}
