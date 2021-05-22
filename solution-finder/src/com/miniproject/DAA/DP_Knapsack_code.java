package com.miniproject.DAA;

public class DP_Knapsack_code {
	
	String knap_dp_result;

	public String conversion(String weight, String values, String bag_weight) {
		try{
		String[] w = weight.split(" ");
		int size = w.length;
		int[] wt = new int[size];
		for (int i = 0; i < size; i++) {
			wt[i] = Integer.parseInt(w[i]);
		}
		String[] v = values.split(" ");
		int profit_size = v.length;
		int[] val = new int[profit_size];
		for (int i = 0; i < profit_size; i++) {
			val[i] = Integer.parseInt(v[i]);
		}
		int capacity = Integer.parseInt(bag_weight);
		if ((size != profit_size) || (capacity <= 0)) {
			knap_dp_result = "pls give proper input!!!";
			return knap_dp_result;
		} 
		else {
			int answer=knapSack(capacity,wt,val,profit_size);
			knap_dp_result="The Maximum value(Profit) in 0/1knapsack is: ";
			knap_dp_result=knap_dp_result+Integer.toString(answer);
			return knap_dp_result;

		}
	}
	catch(Exception e){
		return ("Exception occured!"+e);
	}

	}
	static int max(int a, int b)throws Exception  
    { 
        return (a > b) ? a : b; 
    } 
  
    // Returns the maximum value that 
    // can be put in a knapsack of 
    // capacity W 
    static int knapSack( 
        int W, int wt[], 
        int val[], int n)throws Exception  
    { 
        // Base Case 
        if (n == 0 || W == 0) 
            return 0; 
  
        // If weight of the nth item is 
        // more than Knapsack capacity W, 
        // then this item cannot be included 
        // in the optimal solution 
        if (wt[n - 1] > W) 
            return knapSack(W, wt, val, n - 1); 
  
        // Return the maximum of two cases: 
        // (1) nth item included 
        // (2) not included 
        else
            return max( 
                val[n - 1] + knapSack(W - wt[n - 1], 
                                      wt, val, n - 1), 
                knapSack(W, wt, val, n - 1)); 
    } 
}
