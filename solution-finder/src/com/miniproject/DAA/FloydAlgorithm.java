package com.miniproject.DAA;


import org.apache.commons.lang3.StringUtils;

public class FloydAlgorithm {

	String length[]=new String[20];
	int row;
	String lineInput[]=new String[5];
	String result="The following matrix shows the shortest "+ 
                         "distances between every pair of vertices\n";
	
	public String conversion(String para, String strInput){
		try{
			
		
	      if(StringUtils.isBlank(para) || StringUtils.isBlank(strInput)){
	    	String  result= "Invalid input!! Please enter valid input"; 
	    	  return result;
	      }

				row = Integer.parseInt(para);
 


	       String  lineInput[] = strInput.split("\n");
	       String[][] values=new String[row][row];
	       for(int i=0;i<lineInput.length;i++){
	       	values[i]=lineInput[i].split(" ");
	       }
	       int [][]mat = new int[row][row];
	       for(int i=0; i<row; i++)
	       {
	           for(int j=0; j<row; j++)
	           {
	        	   try{
	               mat[i][j] = Integer.parseInt(values[i][j]);
	               
	               if(mat[i][j]<0)
	            	   return "Invalid input!! Please enter valid input"; 
	        	   }
	        	   catch(Exception e){
	        		   return ("Exception occured!! "+e);
	        	   }
	           }
	       }
	   
	     
	    String ans =  floydWarshall(mat);
	   return  ans;
		}
		catch(Exception e){
			return("Exception occured!"+e);
		}
	}

	 String floydWarshall(int graph[][])throws Exception 
	    { 
	        int dist[][] = new int[row][row]; 
	        int i, j, k; 
	  
	        /* Initialize the solution matrix same as input graph matrix. 
	           Or we can say the initial values of shortest distances 
	           are based on shortest paths considering no intermediate 
	           vertex. */
	        for (i = 0; i < row; i++) 
	            for (j = 0; j < row; j++) 
	                dist[i][j] = graph[i][j]; 
	  
	        /* Add all vertices one by one to the set of intermediate 
	           vertices. 
	          ---> Before start of an iteration, we have shortest 
	               distances between all pairs of vertices such that 
	               the shortest distances consider only the vertices in 
	               set {0, 1, 2, .. k-1} as intermediate vertices. 
	          ----> After the end of an iteration, vertex no. k is added 
	                to the set of intermediate vertices and the set 
	                becomes {0, 1, 2, .. k} */
	        for (k = 0; k < row; k++) 
	        { 
	            // Pick all vertices as source one by one 
	            for (i = 0; i < row; i++) 
	            { 
	                // Pick all vertices as destination for the 
	                // above picked source 
	                for (j = 0; j < row; j++) 
	                { 
	                    // If vertex k is on the shortest path from 
	                    // i to j, then update the value of dist[i][j] 
	                    if (dist[i][k] + dist[k][j] < dist[i][j]) 
	                        dist[i][j] = dist[i][k] + dist[k][j]; 
	                } 
	            } 
	        } 
	  
	        // Print the shortest distance matrix 
	      String res=printSolution(dist); 
	      return res;
	    } 
	  
	    String printSolution(int dist[][])throws Exception 
	    { 
	        System.out.println("The following matrix shows the shortest "+ 
	                         "distances between every pair of vertices"); 
	        for (int i=0; i<row; ++i) 
	        { 
	            for (int j=0; j<row; ++j) 
	            { 
//	                if (dist[i][j]==99) 
//	                    System.out.print("99 "); 
//	                else
	                    System.out.print(dist[i][j]+"   "); 
	                    result = result+"\t"+dist[i][j];

	            } 
	            System.out.println();
	            result = result+"\n";

	        } 
	        return result;
	    } 
}
