package com.miniproject.DAA;

import java.util.Arrays;
import java.util.Comparator;

public class Fra_Knapsack_code {
	
	String knap_result;

	public String conversion(String weight, String values, String bag_weight) {
		try{
		String[] w = weight.split(" ");
		int size = w.length;
		int[] wt = new int[size];
		int profit_size,val[];
		try{
		for (int i = 0; i < size; i++) {
			wt[i] = Integer.parseInt(w[i]);
		}
		String[] v = values.split(" ");
		 profit_size = v.length;
		 val = new int[profit_size];
		for (int i = 0; i < profit_size; i++) {
			val[i] = Integer.parseInt(v[i]);
		}
		}
		catch(Exception e){
			return("Exception occured! "+e);
		}
		int capacity = Integer.parseInt(bag_weight);
		if ((size != profit_size) || (capacity <= 0)) {
			knap_result = "pls give proper input!!!";
			return knap_result;
		} 
		
		else {
			Double answer=getMaxValue(wt,val,capacity);
			knap_result="The Maximum value(Profit) in knapsack is: ";
			knap_result=knap_result+Double.toString(answer);
			return knap_result;

		}

	}
	
	catch(Exception e){
		return("Exception occured!"+e);
		
	}
	}
		

	public  double getMaxValue(int[] wt, int[] val, int capacity) throws Exception{
		ItemValue[] iVal = new ItemValue[wt.length];

		for (int i = 0; i < wt.length; i++) {
			iVal[i] = new ItemValue(wt[i], val[i], i);
		}

		// sorting items by value;
		Arrays.sort(iVal, new Comparator<ItemValue>() {
			@Override
			public int compare(ItemValue o1, ItemValue o2) {
				return o2.cost.compareTo(o1.cost);
			}
		});

		double totalValue = 0d;

		for (ItemValue i : iVal) {

			int curWt = (int) i.wt;
			int curVal = (int) i.val;

			if (capacity - curWt >= 0) {
				// this weight can be picked while
				capacity = capacity - curWt;
				totalValue += curVal;

			} else {
				// item cant be picked whole
				double fraction = ((double) capacity / (double) curWt);
				totalValue += (curVal * fraction);
				capacity = (int) (capacity - (curWt * fraction));
				break;
			}

		}

		return totalValue;
	}

	// item value class
	public class ItemValue  {
		Double cost;
		double wt, val, ind;

		// item value function
		public ItemValue(int wt, int val, int ind) throws Exception {
			this.wt = wt;
			this.val = val;
			this.ind = ind;
			cost = new Double(val / wt);
		}
	}
	}


