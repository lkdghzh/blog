# 1，配置jdk
Groovy是依赖于Java的，所以首先要配置好JDK。
# 2，下载Groovy

[Groovy下载地址](http://groovy-lang.org/download.html)
解压即可。没有安装哦
# 3，解压路径

```
D:\java\groovy
```
![](http://images2017.cnblogs.com/blog/607624/201711/607624-20171121115006321-1057191021.png)



# 4,Groovy环境变量配置

1,新建 GROOVY_PATH 解压的地址的根路径 
```
GROOVY_PATH
D:\java\groovy\groovy-2.4.12
```

2, 修改PATH(追加一个) `%GROOVY_PATH%\bin`
```
%GROOVY_PATH%\bin
D:\java\groovy\groovy-2.4.12\bin
```
# 5,测试

cmd输入 `groovy -v` 有版本信息，表明安装成功

# 6，groovy编辑器
cmd 输入`groovyconsole`
在编辑器中输入，println "Hello Groovy" ，ctrl+R执行
![](http://images2017.cnblogs.com/blog/607624/201711/607624-20171121115643868-764121476.png)


# 7, 总结
```
1 解压地址          D:\java\groovy
2 新建环境变量地址   D:\java\groovy\groovy-2.4.12      名字 GROOVY_PATH
3 追加path变量地址  D:\java\groovy\groovy-2.4.12\bin  等于 %GROOVY_PATH%\bin
```
# 8,参考地址

[学习地址](http://www.jianshu.com/p/777cc61a6202)