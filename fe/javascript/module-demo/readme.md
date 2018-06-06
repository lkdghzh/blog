# 1.规范的产生
<p>js现在既可以运行在浏览器，又可运行在服务端。</p>
<p>但这门语言设计之初，10天设计出的语言，是考虑不到现在的情况的。</p>
<p>也没有提供类似功能，隔离、组织js代码-模块化。</p>
<p>为了规范化,便出现了amd和commonjs规范，分别试用于客户端（browser）和服务端（server）。</p>
<p>后来在客户端（browser）端，也就是requirejs为代表的amd规范，玉伯 觉得requirejs“无明显的bug”，便创建了cmd规范，以seajs为代表，并表示seajs“明显无bug”</p>
--commonjs</p>
--amd cmd（后 玉伯 提）</p>
> 这么拗口的一句，requirejs“无明显的bug”，seajs“明显无bug”，其实就是 代码编写阅读<-->到实际js加载与执行 的是否对应
<p>我个人认为：cmd，seajs目前项目数量偏少，生态偏不健全（也许目光短浅），可以以requirejs为主。</p>

# 2.规范的分类
## 2.1  服务端：同步
commonjs规范，以nodejs为代表
> 模块加载与执行，同步的。原因在于：加载文件都是直接从服务器硬盘上直接读取，


## 2.2  浏览器：异步（今天的主角）
amd，cmd规范，amd  以RequireJS代表,cmd 以SeaJS代表
> 模块加载与执行，异步的。原因在于：需要远距离传输，进行加载js文件，script的onload事件，这个onload事件加载script是异步的。所以最大的特点是异步

### 2.2.1  amd cmd区别
1. 相同： 都是异步加载模块
1. 不同： RequireJS对模块的态度是预加载预执行(无明显的bug)，SeaJS对模块的态度是懒加载懒执行(明显无bug)。

### 2.2.2  如何理解预加载预执行(无明显的bug)和懒加载懒执行(明显无bug)

### 2.2.3  插曲：如何保证异步的加载和执行顺序
> 要保证这些脚本加载与运行的顺序，当然要使用异步处理方案，比如可以用一下异步处理方案。
+ jQuery $.defferd
+ es6 promise
+ es7 generator yeild
+ es7 async await

