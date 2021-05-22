package com.miniproject.maths;

public class Quadratic {
	double root1,root2,real,img;
	String result[]=new String[3];
	int a,b,c;
	 public  String[] findRoots(String inpStr) 
	    { 
		 try{
	     // If a is 0, then equation is not      
	     //quadratic, but linear 
	     
	    
		 String[] str = inpStr.split(" ");
		 int size = str.length;
	      int [] arr = new int [size];
	      for(int i=0; i<size; i++) {
	         arr[i] = Integer.parseInt(str[i]);
	      }
	      a=arr[0];
	      b=arr[1];
	      c=arr[2];
	      if (a == 0) 
		     { 
		       result[0]="Invalid input!! please Enter valid input";
		       return(result);
		     } 
	   
	     int d  = b*b - 4*a*c; 
	     double sqrt_val =Math.sqrt(Math.abs(d)); 
	   
	     if (d > 0) 
	     { 
	        //System.out.println("Roots are real and different \n"); 
	         root1=(double)(-b + sqrt_val) / (2 * a);
	         root2=(double)(-b + sqrt_val) / (2 * a);
	         result[0]=Double.toString(root1);
	         result[1]=Double.toString(root2);

	         
	       
	     } 
	     else // d < 0 
	     { 
	        System.out.println("Roots are complex \n"); 
	        real=-(double)b / ( 2 * a );
	        img=sqrt_val;
	        result[0]=Double.toString(real)+"+ i"+Double.toString(img);
	        result[1]=Double.toString(real)+"- i"+Double.toString(img);

	  
//	        System.out.println( -(double)b / ( 2 * a ) + " + i" 
//	                          + sqrt_val + "\n"  + -(double)b / ( 2 * a ) 
//	                          + " - i" + sqrt_val); 
	     } 
	     return(result);
	    } 
	    
	 catch(Exception e){
		 result[0]=("Exception occured!"+e);
		 return result;
	 }
	 }
}
