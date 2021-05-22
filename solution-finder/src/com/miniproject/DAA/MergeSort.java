package com.miniproject.DAA;
import java.util.Arrays;
import org.apache.commons.lang3.*;

public class MergeSort {
	static int n;
	static int a[];
	static String result[]=new String[3];
	static long startTime;
	static long endTime,totalTime;
	
	public static String[] Function(String inpStr){
		try{
		//System.out.println(inpStr);
		if(StringUtils.isBlank(inpStr)){
			result[0]="Invalid input!! Please enter valid input";
			result[1]=String.valueOf(0);
			return result;
		}
		String[] str = inpStr.split(" ");
		 int size = str.length;
	      int [] a = new int [size];
	      for(int i=0; i<size; i++) {
	         a[i] = Integer.parseInt(str[i]);
	      }
		
	  sort(a,0,a.length-1);
	   endTime   = System.nanoTime();
	    totalTime = endTime - startTime;
	 // printArray(a);
	result[0]= Arrays.toString(a);
	result[1]=String.valueOf(totalTime);
	return result;
	  }
		catch(Exception e){
			result[0]=("Exception occured!"+e);
			return result;
		}
	}
		 static void merge(int arr[], int l, int m, int r)throws Exception  
    { 
        // Find sizes of two subarrays to be merged 
        int n1 = m - l + 1; 
        int n2 = r - m; 
  
        /* Create temp arrays */
        int L[] = new int [n1]; 
        int R[] = new int [n2]; 
  
        /*Copy data to temp arrays*/
        for (int i=0; i<n1; ++i) 
            L[i] = arr[l + i]; 
        for (int j=0; j<n2; ++j) 
            R[j] = arr[m + 1+ j]; 
  
  
        /* Merge the temp arrays */
  
        // Initial indexes of first and second subarrays 
        int i = 0, j = 0; 
  
        // Initial index of merged subarry array 
        int k = l; 
        while (i < n1 && j < n2) 
        { 
            if (L[i] <= R[j]) 
            { 
                arr[k] = L[i]; 
                i++; 
            } 
            else
            { 
                arr[k] = R[j]; 
                j++; 
            } 
            k++; 
        } 
  
        /* Copy remaining elements of L[] if any */
        while (i < n1) 
        { 
            arr[k] = L[i]; 
            i++; 
            k++; 
        } 
  
        /* Copy remaining elements of R[] if any */
        while (j < n2) 
        { 
            arr[k] = R[j]; 
            j++; 
            k++; 
        } 
    } 
  
    // Main function that sorts arr[l..r] using 
    // merge() 
    static void sort(int arr[], int l, int r) throws Exception 
    { 
    	startTime = System.nanoTime();
        if (l < r) 
        { 
            // Find the middle point 
            int m = (l+r)/2; 
  
            // Sort first and second halves 
            sort(arr, l, m); 
            sort(arr , m+1, r); 
  
            // Merge the sorted halves 
            merge(arr, l, m, r); 
        } 
    } 
  
    /* A utility function to print array of size n */
//    static void printArray(int arr[]) 
//    { 
//        int n = arr.length; 
//        for (int i=0; i<n; ++i) 
//            System.out.print(arr[i] + " "); 
//        System.out.println(); 
//    } 
//  
}

