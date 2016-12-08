:replace函数，为写自己的js模板做准备  待完善 function

#### 1，声明&用法
```
//数组:
var arr=[];//字面量            
var arr=new Array();//构造函数
//对象:
var obj={};//字面量            
var obj=new Object();//构造函数
//正则:
var regExp=/a/gi;//字面量      
var regExp=new RegExp('a','gi');//构造函数
                                     
//用法一
var regExp=new RegExp('a','gi');
'abcdefgABCDEFGabcdefg'.replace(regExp,"~");
'~bcdefg~BCDEFG~bcdefg'
//用法二
'abcdefgABCDEFGabcdefg'.replace(/a/gi,"~");
'~bcdefg~BCDEFG~bcdefg'
```
#### 2，gi global 和 ignore 选项
```
'abcdefgABCDEFGabcdefg'.replace(/b/,"~");  //"a~cdefgABCDEFGabcdefg"
'abcdefgABCDEFGabcdefg'.replace(/b/g,"~"); //"a~cdefgABCDEFGa~cdefg"
'abcdefgABCDEFGabcdefg'.replace(/b/i,"~"); //"a~cdefgABCDEFGabcdefg"
'abcdefgABCDEFGabcdefg'.replace(/b/gi,"~");//"a~cdefgA~CDEFGa~cdefg"
```
#### 3，`$` 字符的含义。

```
//$&匹配项的文本
'abcdefgABCDEFGabcdefg'.replace(/b/,"$&");
"abcdefgABCDEFGabcdefg"
'abcdefgABCDEFGabcdefg'.replace(/b/,"$&---");
'ab---cdefgABCDEFGabcdefg'

//$`匹配项左侧的文本
'abcdefgABCDEFGabcdefg'.replace(/b/,"$`");
"aacdefgABCDEFGabcdefg"

//$' 匹配项右侧的文本 （一直到右侧完，不会到下个匹配项就停止）
'abcdefgABCDEFGabcdefg'.replace(/b/,"$'");
"acdefgABCDEFGabcdefgcdefgABCDEFGabcdefg"

'abcdefgABCDEFGabcdefg'.replace(/b/g,"$'");
"acdefgABCDEFGabcdefgcdefgABCDEFGacdefgcdefg"

//$$ $字符
'abcdefgABCDEFGabcdefg'.replace(/b/,"$$");
"a$cdefgABCDEFGabcdefg"

//$n
$1 ..$99 一个正则中的分组，具体一个匹配项（全局可能多个匹配项）中的 第几组匹配到的东西。关于分组
分组：正则的 具体一个匹配项（全局可能多个匹配项）中的（）个数，$1代表具体一个匹配项中的第一个（）匹配的内容...
'abcdefgABCDEFGabcdefg'.replace(/(b)/,"$&---");
"ab---cdefgABCDEFGabcdefg"
'abcdefgABCDEFGabcdefg'.replace(/(b)/,"$1---");
"ab---cdefgABCDEFGabcdefg"
//$2没匹配到时，就把$2关键字当普通字符串
'abcdefgABCDEFGabcdefg'.replace(/(b)/,"$2");
"a$2cdefgABCDEFGabcdefg"

//关于分组几个括号，几个分组。下面例子c虽然匹配，但不是$2
'abcdefgABCDEFGabcdefg'.replace(/(b)c/gi,'(#$1#$2)');
"a(#b#$2)defgA(#B#$2)DEFGa(#b#$2)defg"
'abcdefgABCDEFGabcdefg'.replace(/(b)(c)/gi,'(#$1#$2)');
"a(#b#c)defgA(#B#C)DEFGa(#b#c)defg"

'abcdefgABCDEFGabcdefg'.replace(/(b)(c)/,"$&---");
"abc---defgABCDEFGabcdefg"
'abcdefgABCDEFGabcdefg'.replace(/(b)(c)/,"$1---$2???");
"ab---c???defgABCDEFGabcdefg"

'abcdefgABCDEFGabcdefg'.replace(/(b)(c)/gi,"$&---");
"abc---defgABC---DEFGabc---defg"
'abcdefgABCDEFGabcdefg'.replace(/(b)(c)/gi,"$1--$2??");
"ab--c??defgAB--C??DEFGab--c??defg"
```
#### replace(regExp，function(){})的使用
```
循环（匹配次数）：regExp的匹配选项后
```
#### 基础正则
```
============================================正则表达式基础知识==============================================
^ 匹配一个输入或一行的开头，/^a/匹配"an A"，而不匹配"An a" 
$ 匹配一个输入或一行的结尾，/a$/匹配"An a"，而不匹配"an A" 
* 匹配前面元字符0次或多次，/ba*/将匹配b,ba,baa,baaa 
+ 匹配前面元字符1次或多次，/ba+/将匹配ba,baa,baaa 
? 匹配前面元字符0次或1次，/ba?/将匹配b,ba 
(x) 匹配x保存x在名为$1...$9的变量中 
x|y 匹配x或y 
{n} 精确匹配n次 
{n,} 匹配n次以上 
{n,m} 匹配n-m次 
[xyz] 字符集(character set)，匹配这个集合中的任一一个字符(或元字符) 
[^xyz] 不匹配这个集合中的任何一个字符 
[\b] 匹配一个退格符 
\b 匹配一个单词的边界 
\B 匹配一个单词的非边界 
\cX 这儿，X是一个控制符，/\cM/匹配Ctrl-M 
\d 匹配一个字数字符，/\d/ = /[0-9]/ 
\D 匹配一个非字数字符，/\D/ = /[^0-9]/ 
\n 匹配一个换行符 
\r 匹配一个回车符 
\s 匹配一个空白字符，包括\n,\r,\f,\t,\v等 
\S 匹配一个非空白字符，等于/[^\n\f\r\t\v]/ 
\t 匹配一个制表符 
\v 匹配一个重直制表符 
\w 匹配一个可以组成单词的字符(alphanumeric，这是我的意译，含数字)，包括下划线，如[\w]匹配"$5.98"中的5，等于[a-zA-Z0-9] 
\W 匹配一个不可以组成单词的字符，如[\W]匹配"$5.98"中的$，等于[^a-zA-Z0-9]。
```