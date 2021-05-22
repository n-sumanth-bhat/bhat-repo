package miniproject;

import javax.swing.*;
import javax.swing.event.MenuEvent;
import javax.swing.event.MenuListener;

import java.awt.Color;
import java.awt.event.*;
import com.miniproject.subFrames.DijkstraAlgoFrame;
import com.miniproject.subFrames.FloydAlgoFrame;
import com.miniproject.subFrames.Fractional_Knapsack_Frame;
import com.miniproject.subFrames.Hamiltanion_Cycle_Frame;
import com.miniproject.subFrames.Knapsack_Dp_Frame;
import com.miniproject.subFrames.Lcm_Hcf_Frame;
import com.miniproject.subFrames.LinearEqnFrame;
import com.miniproject.subFrames.MergeSortFrame;
import com.miniproject.subFrames.QuadraticEqnFrame;
import com.miniproject.subFrames.TspFrame;

public class FirstFrame implements ActionListener {
	JFrame f;
	JMenuBar mb;
	JMenuItem lnreq,quadratic,Lcm_Hcf;
	JMenuItem mergesort, dijkstra,floyd,tsp,fra_knap,Dp_knap,hamil_cycle;
	JMenu  help;
	JMenuItem cut, copy, paste, selectAll;
	JMenu Basic_Math, Daa,Home,about;
	JMenu greedy,dp,b_and_b,divide;
	
	

	public FirstFrame() {
		getFrame();
		Background();
		}
		
	

	public void getFrame() {

		
		f = new JFrame("SolFin");
//		Topics = new JMenu("Topics");
//		edit = new JMenu("Edit");
		about=new JMenu("About");
		Home=new JMenu("Home");
		help = new JMenu("Help");
		
		
		
		
		

		Basic_Math = new JMenu("Simple Math calculations");
		Daa = new JMenu("Design and Analysis of Algorithms");
		greedy= new JMenu("Algorithms on Greedy Technique");
		dp= new JMenu("Algorithms on Dynamic_programming");
		b_and_b = new JMenu("Algorithms on Branch and Bound concept");
		divide = new JMenu("Algorithms on Divide and conquer method");



		mb = new JMenuBar();
		lnreq = new JMenuItem(" linear equations");
		quadratic=new JMenuItem("Quadratic Equation");
		Lcm_Hcf=new JMenuItem("LCM and HCF(GCD)");

		mergesort = new JMenuItem("Merge Sort");
		dijkstra = new JMenuItem("Dijkstra's Algorithm");
		floyd=new JMenuItem("Floyd Algorithm");
		tsp=new JMenuItem("Travelling Salesmen");
		fra_knap=new JMenuItem("Fractional Knapsack");
		Dp_knap=new JMenuItem("0/1 Knapsack");
		hamil_cycle=new JMenuItem("Hamiltanion Cycle");
		
		
		help.addMenuListener(new SampleMenuListener());
		Home.addMenuListener(new HomeMenuListener());
		about.addMenuListener(new AboutMenuListener());
		mergesort.addActionListener(this);
		lnreq.addActionListener(this);
		quadratic.addActionListener(this);
		dijkstra.addActionListener(this);
		floyd.addActionListener(this);
		tsp.addActionListener(this);
		Lcm_Hcf.addActionListener(this);
		fra_knap.addActionListener(this);
		Dp_knap.addActionListener(this);
		hamil_cycle.addActionListener(this);
		
		
		
//		Topics.add(Basic_Math);
//		Topics.add(Daa);
//		
		divide.add(mergesort);
		
		greedy.add(dijkstra);
		greedy.addSeparator();
		greedy.add(fra_knap);
		
		dp.add(floyd);
		dp.addSeparator();
		dp.add(Dp_knap);
		
		b_and_b.add(tsp);
		b_and_b.addSeparator();
		b_and_b.add(hamil_cycle);
		
		Basic_Math.add(lnreq);
		Basic_Math.addSeparator();
		Basic_Math.add(quadratic);
		Basic_Math.addSeparator();
		Basic_Math.add(Lcm_Hcf);

		Daa.add(divide);
		Daa.addSeparator();
		Daa.add(greedy);
		Daa.addSeparator();
		Daa.add(dp);
		Daa.addSeparator();
		Daa.add(b_and_b);
		
        mb.add(Home);
		mb.add(Basic_Math);
		mb.add(Daa);
		mb.add(help);
		mb.add(about);

		f.add(mb);
		f.setJMenuBar(mb);
		

		f.setLayout(null);
		f.setSize(1375,775);
		
		 f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	     
	       f.setVisible(true);
	       
	       

	}
	
	public void Background(){
		 f.getContentPane().removeAll();

	       JButton next =new JButton("Next");
			next.setBackground(Color.LIGHT_GRAY);
			JButton prev=new JButton("Prev");
			next.setBounds(1230,620,100,30);
			prev.setBounds(30,620,150,30);
			prev.setBackground(Color.lightGray);
			Background_Label bl=new Background_Label();
			 String back_label="\0";
			String[] text=bl.Back_Label();
			for(int i=0;i<=8;i++)
				back_label= back_label+text[i];
			JLabel label=new JLabel("<html>"+back_label+"</html>");
			f.add(next);
			f.repaint();
			f.add(label);
			label.setBounds(20,-70,1200,775);
	       next.addActionListener(new ActionListener() { 
	    	   public void actionPerformed(ActionEvent e) {
	    		   
	    	     next.setEnabled(false);
	    	     
	    	     Background_Label bl=new Background_Label();
	    		String  back_label="";
	    	     String[] text=bl.Back_Label();
	    			for(int i=9;i<=13;i++){
	    				back_label= back_label+text[i];
	    				 } 
	    			JLabel label1=new JLabel("<html>"+back_label+"</html>");
	    			label1.setBounds(20,-60,1200,775);
	    			label.setVisible(false);
	    			f.add(label1);
	    			f.repaint();
                     prev.setVisible(true);
	    			f.add(prev);
	    			f.repaint();
	    	   }
	    	 } );
	       prev.addActionListener(new ActionListener() { 
	    	   public void actionPerformed(ActionEvent e) { 
	    		 f.getContentPane().removeAll();
	    	     label.setVisible(true);
	    	     prev.setVisible(false);
	    	     next.setEnabled(true);
	    	     f.add(next);
	    	     f.add(label);
	    	     f.repaint();
	    	   } 
	    	 } );
	}

	public void Help_Background(){

		 f.getContentPane().removeAll();

		JButton next_help=new JButton("Next");
    	next_help.setBackground(Color.LIGHT_GRAY);
    	next_help.setBounds(1230,620,100,30);
	    JButton prev_help=new JButton("Prev");
	    prev_help.setBounds(10,620,80,30);
		prev_help.setBackground(Color.lightGray);
	    	
	    	Help_item hi=new Help_item();
			String help_text[]=hi.Help_code();
			String help_label=" ";
			for(int i=0;i<=6;i++)
				help_label+=help_text[i];
			JLabel label_help=new JLabel("<html>"+help_label+"</html>");
			f.add(next_help);
            f.repaint();
			f.add(label_help);
			label_help.setBounds(100,-50,1200,775);

			
			
		 next_help.addActionListener(new ActionListener() { 
    	   public void actionPerformed(ActionEvent e) {

    	     next_help.setEnabled(false);
    	     
    	     Help_item hi=new Help_item();
	   			String help_text[]=hi.Help_code();
	   			String help_label=" ";
	   			for(int i=8;i<=11;i++)
	   				help_label+=help_text[i];		    	     
    			JLabel label1_help=new JLabel("<html>"+help_label+"</html>");
    			label1_help.setBounds(100,-60,1200,775);
    			label_help.setVisible(false);
    			f.add(label1_help);
    			f.repaint();
                prev_help.setVisible(true);
    			f.add(prev_help);
    			f.repaint();
    	   }
    	 } );
		 prev_help.addActionListener(new ActionListener() { 
    	   public void actionPerformed(ActionEvent e) { 
    			 f.getContentPane().removeAll();
    	     label_help.setVisible(true);
    	     prev_help.setVisible(false);
    	     next_help.setEnabled(true);
    	     f.add(next_help);
    	     f.repaint();
    	     f.add(label_help);
    	     f.repaint();
    	   } 
    	 } );
	}
	
	public void About_Background(){
		 f.getContentPane().removeAll();

		About_item ai=new About_item();
		String abt="";
		String text_about[]=ai.About();
		for(int i=0;i<=6;i++)
			abt=abt+text_about[i];
		JLabel label_about=new JLabel("<html>"+abt+"</html>");
		JLabel label_thank=new JLabel("<html>"+text_about[7]+"</html>");
		label_about.setBounds(100,-100,1200,775);
		f.add(label_about);
		f.repaint();
		label_thank.setBounds(1110,500,200,100);
		f.add(label_thank);
		f.repaint();

		
	}
    public void actionPerformed(ActionEvent e) {
		// if (e.getSource() == cut)
		// ta.cut();
		// if (e.getSource() == paste)
		// ta.paste();
		// if (e.getSource() == copy)
		// ta.copy();
		// if (e.getSource() == selectAll)
		// ta.selectAll();
		if (e.getSource() == mergesort) {
			MergeSortFrame ms=new MergeSortFrame();
			ms.Mergesort();
			}
		if(e.getSource()==lnreq){
			LinearEqnFrame lieqn=new LinearEqnFrame();
			lieqn.lineareqn();
		}
		if(e.getSource()==quadratic){
			 QuadraticEqnFrame qf= new QuadraticEqnFrame();
			 qf.quadraticEqn();
			 
		}
		if(e.getSource()==dijkstra){
			DijkstraAlgoFrame dj=new DijkstraAlgoFrame();
			dj.dijkstra();
			}
		if(e.getSource()==floyd){
			FloydAlgoFrame floydf=new FloydAlgoFrame();
			floydf.FloydFunction();
		}
		if(e.getSource()==tsp){
			TspFrame tspf=new TspFrame();
			tspf.Tsp();
		}
		if(e.getSource()==Lcm_Hcf){
			Lcm_Hcf_Frame lh=new Lcm_Hcf_Frame();
			lh. Lcm_hcf();
		}
		if(e.getSource()==fra_knap){
			Fractional_Knapsack_Frame fk=new Fractional_Knapsack_Frame();
			fk.f_Knapsack();
		}
		if(e.getSource()==Dp_knap){
			Knapsack_Dp_Frame dpk=new Knapsack_Dp_Frame();
			dpk.Knapsack_Dp();
		}
		if(e.getSource()==hamil_cycle){
			Hamiltanion_Cycle_Frame hamc=new Hamiltanion_Cycle_Frame();
			hamc.Hamiltanion_Cycle();
		}
}

	public static void main(String[] args) {
	    new FirstFrame();
		
	}
	 class SampleMenuListener implements MenuListener {

	   	    
	   	    public void menuSelected(MenuEvent e) {
	   	    	Help_Background();
	   	    }
	   	    @Override
	   	    public void menuDeselected(MenuEvent e) {
	   	    }

	   	    @Override
	   	    public void menuCanceled(MenuEvent e) {
	   	    }
	   	}
	 class HomeMenuListener implements MenuListener {

	   	    
	   	    public void menuSelected(MenuEvent e) {
		    	     Background();
	   	    }
	   	    @Override
	   	    public void menuDeselected(MenuEvent e) {
	   	    }

	   	    @Override
	   	    public void menuCanceled(MenuEvent e) {
	   	    }
	   	
}
	 class AboutMenuListener implements MenuListener {

	   	    
	   	    public void menuSelected(MenuEvent e) {
	   	    	About_Background();;
	   	    }
	   	    @Override
	   	    public void menuDeselected(MenuEvent e) {
	   	    }

	   	    @Override
	   	    public void menuCanceled(MenuEvent e) {
	   	    }
	   	}
	   	    }
