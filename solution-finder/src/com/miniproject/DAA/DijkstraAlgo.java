package com.miniproject.DAA;


import org.apache.commons.lang3.StringUtils;

public  class DijkstraAlgo {
	static  int V=0; 
	String length[]=new String[20];
	int row;
	String lineInput[]=new String[5];
	String result="Distance from Source(src)";

	
	public String conversion(String para, String src, String strInput){
		try{
      if(StringUtils.isBlank(para) || StringUtils.isBlank(src) || Integer.parseInt(src) > Integer.parseInt(para) ||StringUtils.isBlank(strInput)){
    	String  result= "Invalid input!! Please enter valid input"; 
    	  return result;
      }

		int source = Integer.parseInt(src);
		row = Integer.parseInt(para);

       String  lineInput[] = strInput.split("\n");
       V=row;
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
   
     
    String ans =  dijkstra(mat,source);
   return  ans;
    
		}
		catch(Exception e){
			return("Exception occured!"+e);
		}
       

}
    int minDistance(int dist[], Boolean sptSet[])throws Exception  
    { 
        // Initialize min value 
        int min = Integer.MAX_VALUE, min_index = -1; 
  
        for (int v = 0; v < V; v++) 
            if (sptSet[v] == false && dist[v] <= min) { 
                min = dist[v]; 
                min_index = v; 
            } 
  
        return min_index; 
    } 
  
    // A utility function to print the constructed distance array 
    void printSolution(int dist[], int n) throws Exception 
    { 
        System.out.println("Vertex    Distance from Source"); 
        for (int i = 0; i < V; i++) {
        	
            System.out.println(i + " tt " + dist[i]); 
            result = result+"\n"+i+"  is   "+dist[i];
        }
    } 
  
    // Function that implements Dijkstra's single source shortest path 
    // algorithm for a graph represented using adjacency matrix 
    // representation 
    String dijkstra(int graph[][], int src)throws Exception  
    { 
        int dist[] = new int[V]; // The output array. dist[i] will hold 
        // the shortest distance from src to i 
  
        // sptSet[i] will true if vertex i is included in shortest 
        // path tree or shortest distance from src to i is finalized 
        Boolean sptSet[] = new Boolean[V]; 
  
        // Initialize all distances as INFINITE and stpSet[] as false 
        for (int i = 0; i < V; i++) { 
            dist[i] = Integer.MAX_VALUE; 
            sptSet[i] = false; 
        } 
  
        // Distance of source vertex from itself is always 0 
        dist[src] = 0; 
  
        // Find shortest path for all vertices 
        for (int count = 0; count < V - 1; count++) { 
            // Pick the minimum distance vertex from the set of vertices 
            // not yet processed. u is always equal to src in first 
            // iteration. 
            int u = minDistance(dist, sptSet); 
  
            // Mark the picked vertex as processed 
            sptSet[u] = true; 
  
            // Update dist value of the adjacent vertices of the 
            // picked vertex. 
            for (int v = 0; v < V; v++) 
  
                // Update dist[v] only if is not in sptSet, there is an 
                // edge from u to v, and total weight of path from src to 
                // v through u is smaller than current value of dist[v] 
                if (!sptSet[v] && graph[u][v] != 0 &&  
                   dist[u] != Integer.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) 
                    dist[v] = dist[u] + graph[u][v]; 
        }  
        printSolution(dist, V); 

        return result;
  
        // print the constructed distance array 
}
}
