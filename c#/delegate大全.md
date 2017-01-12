##### 委托调用方法的4种方式。
<pre>
using System;
using System.Collections.Generic;
namespace ConsoleApplication1
{
    delegate void DelFunc(string a);
    //delegate void FUNC<int ,int,string>( );
    class Program
    {
        
        public static void Fun1(string str)
        {
            List<int> list = new List<int>();
            Dictionary<int, object> dic = new Dictionary<int, object>();
            Console.WriteLine(str+"new");
        }
        public static void Fun2(string str)
        {
            Console.WriteLine(str + "非new");
         
        }
        static void Main(string[] args)
        {
            DelFunc del = new DelFunc(Fun1);
            del += Fun2;
            del += delegate(string str)
            {
                Console.WriteLine(str+"匿名方法");
            };
            del+=str=>Console.WriteLine(str+"lamada表达式");
            del("赋值给委托变量，通过");

            Console.ReadKey();
        }
    }
}

new，+=，delegate匿名方法，lamada表达式（就是方法，匿名的）
	</int>pre>
##### 委托约束方法的 参数返回值，泛型约束参数返回值的类型。

<pre>
namespace ConsoleApplication1
{
    //委托，规定返回值和参数，泛型<>,规定参数和返回值类型。
    delegate T3 Del<T1, T2, T3>(T1 m, T2 n);//定义：只写T,不写具体的类型，<>里 输入和返回。( )参数,并没有返回值**

    class Program
    {
        public static string Delfun1(string str1, string str2)
        {
            Console.WriteLine(1);
            return str1 + str2;
        }
        public static string Delfun2(string str1, string str2)
        {
            Console.WriteLine(2);
            return str1 + str2 + "第二个方法";
        }
        static void Main(string[] args)
        {
            {
                //new或=或+=时，指向的方法必须具体和其委托匹配的参数返回值 类型。
                Del<string, string, string> DelEntity = new Del<string, string, string>(Delfun1);
                DelEntity += Delfun2;
                DelEntity += delegate(string str1, string str2) { Console.WriteLine(3); ;return str1 + str2 + "第三个方法"; };
                DelEntity += (string str1, string str2) => { Console.WriteLine(3); return str1 + str2 + "第四个方法"; };
                //最后调用，传具体和其委托匹配的参数值
                Console.WriteLine(DelEntity("字符串1", "字符串2"));
                Console.ReadKey();
            }
        }
    }
}

泛型委托。写一个模仿的 delegate T2 Func(in T1,out T2)(T1 arg)
</pre>

##### Func的超强分析
··· c#
using System;
using System.Collections.Generic;
using System.Linq;
namespace ConsoleApplication1
{
    //Where  Find  OrderBy Take Skip

    //委托，规定返回值和参数，泛型<>,规定参数和返回值类型。
    //delegate T3 Del<in T1, in T2, out T3>(T1 m, T2 n);//定义：只写T,不写具体的类型，<>里 输入和返回。( )参数加个in,并没有返回值加out**
    //public delegate TResult Func<in T, out TResult>(T arg);
    class Program
    {
        public static bool fun(string str)
        {
            if (str.Contains("aa"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        static void Main(string[] args)
        {
            List<string> list = new List<string>() { "aa", "bb", "dd" };//using System.Collections.Generic;
            //public static IEnumerable<TSource> Where<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate);
            //where是IEnumerable<TSource>泛型接口的扩展(泛型)方法。

            //public class List<T> : IList<T>, ICollection<T>, IEnumerable<T>, IList, ICollection, IEnumerable
            //List<>继承了IEnumerable<TSource>泛型接口，所以具有where方法。

            //此扩展泛型方法存放的位置，是写在public static class Enumerable类里面

            //当list<T>确定里面的元素类型，比如string，父类接口 IEnumerable<T>也会确定其类型，
            //父类接口 IEnumerable<T>的扩展泛型方法where<T>其的参数Func<T,bool>,T也会确定其类型。
            //一般where<T>的T可以省略。

            //where(Func)中的Func是对这个集合的每一项（ 每一项变量=>条件方法体）进行查询，符合条件方法体的返回true
            //where方法返回这样多个元素就是IEnumerable<T>集合，用其接受，再foreach遍历。

            //第一Func委托类型的一个委托变量对应的lamada表达式
            //IEnumerable<string> temp = list.Where<string>(i => i.Contains("a"));//using System.Linq; 
            //第二Func委托类型的一个委托变量，事先已经指向定义好的函数
            //Func<string, bool> fun11 = new Func<string, bool>(fun);
            //第三Func委托类型的一个委托变量，让其已经指向一个匿名函数函数
            //Func<string, bool> fun11 = delegate(string str)
            //{
            //    if (str.Contains("aa"))
            //    {
            //        return true;
            //    }
            //    else
            //        return false;
            //};
            //第四Func委托类型的一个委托变量=一个函数。
            Func<string, bool> fun11=fun;
            IEnumerable<string> temp = list.Where<string>(fun11);
            foreach (var item in temp)
            {
                Console.WriteLine(item);
            }
            Console.ReadKey();

            //Where  Find  OrderBy Take Skip
            //var res = list.Find(a => a.Equals("aa"));
            //int[] arr = { 1, 2, 3 };
        }
    }
}

Where Find OrderBy Take Skip用到的泛型委托方法。Func的来龙去脉
···
   