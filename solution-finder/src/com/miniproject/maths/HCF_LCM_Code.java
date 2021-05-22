package com.miniproject.maths;


import org.apache.commons.lang3.StringUtils;

public class HCF_LCM_Code {
	
	 public String HCF(String variables,String values){
		 try{
		 String gcdresult;
		 if(StringUtils.isBlank(values))
		 {
				gcdresult="Invalid input!! Please enter valid input";
				return gcdresult;
			}
		     int n= Integer.parseInt(variables);
		     String[] str = values.split(" ");
			
		      long []input = new long [n];
		      for(int i=0; i<n; i++) {
		         input[i] = Long.parseLong(str[i]);
		      }

		     long result = input[0];
		     for(int i = 1; i < input.length; i++)
		     {
		     result= hcf(result, input[i]);
		     }     
		     gcdresult="The GCD/HCF of the numbers is: ";
		     gcdresult=gcdresult+Long.toString(result);
		     return gcdresult;
		 }
		 catch(Exception e){
			 return("Exception occured!"+e);
		 }
		  }
		
		static long hcf(long a,long b)throws Exception
		  {
		    while (b > 0)
		    {
		        long temp = b;
		        b = a % b; 
		        a = temp;
		    }
		    return a;
	 }
		
		public String conversion(String variables,String values)
		{  
			try{
			String lcmresult;
		
			if(StringUtils.isBlank(values)){
				lcmresult="Invalid input!! Please enter valid input";
				return lcmresult;
			}
			int n= Integer.parseInt(variables);
		     String[] str = values.split(" ");
			
		      int []input = new int [n];
		      for(int i=0; i<n; i++) {
		         input[i] = Integer.parseInt(str[i]);
		      }
		      long answer=lcm_of_array_elements(input);
		      lcmresult="Lcm of given numbers is :";
		      lcmresult=lcmresult+Long.toString(answer);
		      return lcmresult;
			}
			catch(Exception e){
				return("Exception occured!"+e);
			}
		}
		public static long lcm_of_array_elements(int[] element_array) throws Exception
	    { 
	        long lcm_of_array_elements = 1; 
	        int divisor = 2; 
	          
	        while (true) { 
	            int counter = 0; 
	            boolean divisible = false; 
	              
	            for (int i = 0; i < element_array.length; i++) { 
	  
	                // lcm_of_array_elements (n1, n2, ... 0) = 0. 
	                // For negative number we convert into 
	                // positive and calculate lcm_of_array_elements. 
	  
	                if (element_array[i] == 0) { 
	                    return 0; 
	                } 
	                else if (element_array[i] < 0) { 
	                    element_array[i] = element_array[i] * (-1); 
	                } 
	                if (element_array[i] == 1) { 
	                    counter++; 
	                } 
	  
	                // Divide element_array by devisor if complete 
	                // division i.e. without remainder then replace 
	                // number with quotient; used for find next factor 
	                if (element_array[i] % divisor == 0) { 
	                    divisible = true; 
	                    element_array[i] = element_array[i] / divisor; 
	                } 
	            } 
	  
	            // If divisor able to completely divide any number 
	            // from array multiply with lcm_of_array_elements 
	            // and store into lcm_of_array_elements and continue 
	            // to same divisor for next factor finding. 
	            // else increment divisor 
	            if (divisible) { 
	                lcm_of_array_elements = lcm_of_array_elements * divisor; 
	            } 
	            else { 
	                divisor++; 
	            } 
	  
	            // Check if all element_array is 1 indicate  
	            // we found all factors and terminate while loop. 
	            if (counter == element_array.length) { 
	                return lcm_of_array_elements; 
	            } 
	        } 

   }
}