package miniproject;

public class Help_item {
	String help[]=new String[20];
	public String[] Help_code(){
		final String BLANK = "&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; "
				+ "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;"
				+ "&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		
		final String BLANK2 = "&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

		
		help[0]="<h1 style='color:blue;text-align:center'>INPUT DETAILS!!</h1>";
		help[1]="<h3 style='color:red'>NOTE :In any textfield/textarea donot use any special characters or commas "
				+ "to separate the input,USE ONLY WHITESPACES IN BETWEEN<br>If u give input greater than specified then,result is obtained for only specified number of input.</h3>";
		help[2]="Now we'll see how to provide input for the problems";
		help[3]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Simple Linear Equations : </p>Example:<br> <pre>INPUT "+BLANK+" OUTPUT<br>Enter the number of variables: 2                                         Result is -1.0    2.0 <br> Enter the coefficient of equation(a1 b1 c1 d1...) : <br>1 2 3<br>4 5 6</pre>";
		help[4]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Quadratic Equation :</p> Example:<br><pre>INPUT "+BLANK+"OUTPUT<br>Enter the co-efficient a b c:<br> 1 4 4 "+BLANK+"Root 1=-0.2 and Root2=-0.2</pre>";
		help[5]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>LCM and HCF : </p>Example:<br><pre>INPUT "+BLANK+"OUTPUT<br>How many numbers:<br>3"+BLANK+"        HCF is 2<br>Enter the numbers:100 200 462"+BLANK2+"            LCM is 46200<br>select HCF/LCM</pre>";
		help[6]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Merge Sort:</p> Example:<br><pre>INPUT "+BLANK+"OUTPUT <br>Enter the elements to be sorted<br>20 -81 8 75 -99 10 6"+BLANK2+"                     Sorted array is [-99 -81 6 8 10 20 75]<br>"+BLANK+"        Time taken in nanoseconds is 970</pre>";
		
		//-------------------------------------------------next----------------------------------
		//help[7]="<h1 style='color:blue;text-align:center'>INPUT DETAILS!!</h1>Contd..";
		help[8]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Dijkstra : </p><pre>Example: INPUT "+BLANK+"OUTPUT<br>Enter the rows/columns of matrix:<br>3"+BLANK+"Distance from source vertex(0)is<br>Enter Matrix:<br>1 2 3"+BLANK+"0 is 0<br>4 5 6"+BLANK+"1 is 2<br>7 8 9"+BLANK+"2 is 3<br>Enter Source vertex:0</pre>";
		help[9]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Fractional knapsack : </p><pre>Example: INPUT "+BLANK+"OUTPUT<br>Enter the weight of objects:<br> 3 5 6 7 8 3"+BLANK+"The Maximum profit is 174.714<br>Enter the corresponding profits:<br>33 67 89 100 43 20<br>Enter the knapsack weight:12</pre>";
		help[10]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Floyd  :</p><pre>Example: INPUT"+BLANK+"OUTPUT<br>Enter the number of rows/columns:<br>3"+BLANK+"The following matrix show the result<br>Enter the Matrix:<br>1 99 4"+BLANK+"1 9 4<br>99 6 3"+BLANK+"6 6 3<br>3 5 99"+BLANK+"3 5 7</pre>";
		help[11]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Hamiltanion cycle : </p><pre>Example: INPUT"+BLANK2+"                                 OUTPUT<br>Enter the number of vertices:3<br>Enter the matrix:<br>1 2 3"+BLANK+"          Solution exists:<br>1 2 3"+BLANK+"           0-->1-->2-->0<br>1 2 3 </pre>";
		
		
		return help;
	}

}
