package com.miniproject.DAA;

import org.apache.commons.lang3.StringUtils;

public class Hamiltanion_cycle_code {
	 int V ; 
    int path[];
    static int row;
    String hamil_result;
    public String conversion(String para, String strInput){
    	try{
	      if(StringUtils.isBlank(para) ||StringUtils.isBlank(strInput)){
	    	String  result= "Invalid input!! Please enter valid input"; 
	    	  return result;
	      }

		
			row = Integer.parseInt(para);
			V = row;
			

	       String  lineInput[] = strInput.split("\n");
	      /* String length[] = para.split("");
	       row=Integer.parseInt(length[0]);*/
	       V=row;
	       //column=Integer.parseInt(length[1]); 
	       String[][] values=new String[row][row];
	       for(int i=0;i<lineInput.length;i++){
	       	values[i]=lineInput[i].split(" ");
	       }
	       int [][]mat = new int[row][row];
	      // dint [][]constants = new int[n][1];
	       //input
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
	      String final_result= hamCycle(mat);
	      return final_result;
    	}
    	catch(Exception e){
    		return("Exception occured!"+e);
    	}
    }
    
    boolean isSafe(int v, int graph[][], int path[], int pos)throws Exception  
    { 
        /* Check if this vertex is an adjacent vertex of 
           the previously added vertex. */
        if (graph[path[pos - 1]][v] == 0) 
            return false; 
  
        /* Check if the vertex has already been included. 
           This step can be optimized by creating an array 
           of size V */
        for (int i = 0; i < pos; i++) 
            if (path[i] == v) 
                return false; 
  
        return true; 
    } 
  
    /* A recursive utility function to solve hamiltonian 
       cycle problem */
    boolean hamCycleUtil(int graph[][], int path[], int pos) throws Exception 
    { 
        /* base case: If all vertices are included in 
           Hamiltonian Cycle */
        if (pos == V) 
        { 
            // And if there is an edge from the last included 
            // vertex to the first vertex 
            if (graph[path[pos - 1]][path[0]] == 1) 
                return true; 
            else
                return false; 
        } 
  
        // Try different vertices as a next candidate in 
        // Hamiltonian Cycle. We don't try for 0 as we 
        // included 0 as starting point in hamCycle() 
        for (int v = 1; v < V; v++) 
        { 
            /* Check if this vertex can be added to Hamiltonian 
               Cycle */
            if (isSafe(v, graph, path, pos)) 
            { 
                path[pos] = v; 
  
                /* recur to construct rest of the path */
                if (hamCycleUtil(graph, path, pos + 1) == true) 
                    return true; 
  
                /* If adding vertex v doesn't lead to a solution, 
                   then remove it */
                path[pos] = -1; 
            } 
        } 
  
        /* If no vertex can be added to Hamiltonian Cycle 
           constructed so far, then return false */
        return false; 
    } 
  
    /* This function solves the Hamiltonian Cycle problem using 
       Backtracking. It mainly uses hamCycleUtil() to solve the 
       problem. It returns false if there is no Hamiltonian Cycle 
       possible, otherwise return true and prints the path. 
       Please note that there may be more than one solutions, 
       this function prints one of the feasible solutions. */
    String hamCycle(int graph[][]) throws Exception 
    { 
        path = new int[V]; 
        for (int i = 0; i < V; i++) 
            path[i] = -1; 
  
        /* Let us put vertex 0 as the first vertex in the path. 
           If there is a Hamiltonian Cycle, then the path can be 
           started from any point of the cycle as the graph is 
           undirected */
        path[0] = 0; 
        if (hamCycleUtil(graph, path, 1) == false) 
        { 
            System.out.println("\nSolution does not exist");
            hamil_result="solution doesnot exist";
            return hamil_result; 
        } 
  
        String answer=printSolution(path); 
        return answer; 
    } 
  
    /* A utility function to print solution */
    String printSolution(int path[])throws Exception  
    { 
        System.out.println("Solution Exists: Following" + 
                           " is one Hamiltonian Cycle");
        hamil_result="Solution exist:Following is one Hamiltanion cycle";
        for (int i = 0; i < V; i++){ 
            System.out.print(" " + path[i] + " ");
            hamil_result=hamil_result+"<br>"+path[i];
        }
        // Let us print the first vertex again to show the 
        // complete cycle 
        System.out.println(" " + path[0] + " "); 
        hamil_result=hamil_result+"<br>"+path[0];
        return hamil_result;
    } 
  
}
