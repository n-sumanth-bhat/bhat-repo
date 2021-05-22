"""def Fibonacci(n):
   
    # Check if input is 0 then it will
    # print incorrect input
    if n < 0:
        print("Incorrect input")
 
    # Check if n is 0
    # then it will return 0
    elif n == 0:
        return 0
 
    # Check if n is 1,2
    # it will return 1
    elif n == 1 or n == 2:
        return 1
 
    else:
        return Fibonacci(n-1) + Fibonacci(n-2)
 
# Driver Program
num = input("enter a number: ")
print(Fibonacci(int(num)))


def pri(m,n):
    for i in range (m,n+1):
        if i>1:
            for j in range (2,i):
                if(i%j)==0:
                    break
            else:
                    print(i)

print("enter m")
m=int(input())
print("enter n")
n=int(input())
(pri(m,n))"""
string="hello1234 hi 2225JF"
d={"digit":0,"upper":0,"lower":0,"words":0}
for i in string:
        if(i.isdigit()):
            d["digit"]+=1
for i in string:
        if(i.isupper()):
           d["upper"]+=1
for i in string:
        if(i.islower()):
            d["lower"]+=1
d["words"]=len(string.split())
print(d)