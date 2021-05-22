package miniproject;

public class Background_Label {
	public String[] Back_Label(){
		String label[]=new String[20];
		label[0]="<h1 style='color:blue;text-align:center'>WELCOME To Solution Finder!!!</h1>";
		label[1]="<p> Here, we deal with some of the problems of Basic Mathematics and problems on Algorithms</p><br>";
		label[1]=label[1]+"Let us see what are these problems <br>";
		label[2]="<h2 style='color:green'>BASIC MATHEMATICAL PROBLEMS</h2>";
		label[3]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Simple Linear Equation : </p>This is a problem to solve two or more simultaneous linear equation"
				                         + "        i.e, two or more equation of degree 1 and findout the value of each variable";
		label[3]+="<br><p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Quadratic Equation : </p>In quadratic equation,we need to solve the given single equation of degree 2 and find out the roots of the variable";
		label[3]+="<br><p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>HCF and LCM : </p> This problem is to calculate the Highest Common factor and Least common Multiple of given n numbers";
		label[4]="<br><h2 style='color:green'><b>DESIGN AND ANALYSIS OF ALGORITHMS<br></b></h2>";
		
		label[5]="<p style='font-size:14px;padding-top:10px;'>DIVIDE AND CONQUER :</p>";		
		label[6]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>MergeSort :</p> This Algorithm is used to sort the given array elements and to calculate the time taken for sorting.This algorithm uses Divide and conquer method";
		
		label[7]="<p style='font-size:14px;padding-top:10px;'>GREEDY TECHNIQUE:</p>";
				label[8]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Fractional Knapsack : </p> In this algorithm,there are n objects with profits and we need to fill the knapsack bag of some pre-defined weight with these objects"
				+ "Such that the profit is maximum.Hence it is a maximization problem,therfore it follows greedy method."
				+ "note that fraction of the object is allowed here<br>  ";
		label[8]+="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Dijkstra Algorithm :</p> This is a algorithm for finding the shortest path between nodes in a graph.This is a minimization problem ,Therefore it"
				+ "follows greedy method.This algorithm may/may not give correct solution for negative edge graph";
		
		
		//---------------------------------------------NEXT------------------------------------
		label[9]="<h1 style='color:blue;text-align:center'>WELCOME To Solution Finder!!!</h1>";
		label[10]="<h2>Contd..</h2>";
		label[10]+="<p style='font-size:14px;padding-top:10px;'>DYNAMIC PROGRAMMING:</p>";
		label[11]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Floyd Algorithm :</p> This is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights.It searches for all possibilities"
				+ "and chooses the best solution therefore it follows dynamic programming.<br>";
		label[11]+="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>0/1 Knapsack :</p> This algorithm is similar to that of fractional algorithm but,fractions are not allowed here i.e., it either select the whole object or"
				+ "it doesn't select that at all.";
		
		label[12]="<p style='font-size:14px;padding-top:10px;'>BACKTRACKING / BRANCH-AND-BOUND :</p>";
		label[13]="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Hamiltanion Cycle :</p> It is a graph traversal technique (closed loop) in which each node is visited exactly once and return back to the initial medium";
		label[13]+="<p style='color:#E1167C; font-size:12px; padding-top:10px;padding-bottom:5px;'>Travelling Salesperson Problem :</p> It is question states that ,Given a list of cities and the distances between each pair of cities ,"
				+ "what is the shortest possible route that visitts each city and returns to the original city.This can be solved by Branch and Bound method.";
							
		
				
			return label;	                       
		
	
	}
   
}
