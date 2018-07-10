## 创建文件夹
```
mkdir like
```

## 上传、下载
```
yum install lrzsz

//上传
rz

//下载
sz picture.zip
```
## 压缩
```
yum install zip
//将当前目录4.png压缩成picture.zip
zip picture.zip 4.png
```
## 安装tree
```
yum install tree

tree 
tree -a
```
## ll、ls
```
cd /
ll
lrwxrwxrwx   1 root root     7 Jul 10 18:18 bin -> usr/bin
dr-xr-xr-x.  5 root root  4096 Jul 10 18:21 boot
drwxr-xr-x  20 root root  3040 Apr 11 12:59 dev
drwxr-xr-x. 82 root root  4096 Jul 10 18:24 etc
drwxr-xr-x.  2 root root  4096 Apr 11 12:59 home
lrwxrwxrwx   1 root root     7 Jul 10 18:18 lib -> usr/lib
lrwxrwxrwx   1 root root     9 Jul 10 18:18 lib64 -> usr/lib64
drwxr-xr-x   2 root root  4096 Jul 10 18:28 like
drwx------.  2 root root 16384 Aug 17  2017 lost+found
drwxr-xr-x.  2 root root  4096 Apr 11 12:59 media
drwxr-xr-x.  2 root root  4096 Apr 11 12:59 mnt
drwxr-xr-x.  2 root root  4096 Apr 11 12:59 opt
dr-xr-xr-x  77 root root     0 Apr 11 12:59 proc
dr-xr-x---.  5 root root  4096 Apr 11 12:59 root
drwxr-xr-x  23 root root   620 Jul 10 18:28 run
lrwxrwxrwx   1 root root     8 Jul 10 18:18 sbin -> usr/sbin
drwxr-xr-x.  2 root root  4096 Apr 11 12:59 srv
dr-xr-xr-x  13 root root     0 Apr 11 12:59 sys
drwxrwxrwt.  8 root root  4096 Jul 10 18:28 tmp
drwxr-xr-x. 13 root root  4096 Jul 10 18:18 usr
drwxr-xr-x. 19 root root  4096 Jul 10 18:18 var

ls
bin   dev  home  lib64  lost+found  mnt  proc  run   srv  tmp  var
boot  etc  lib   like   media       opt  root  sbin  sys  usr
```
## 文件位置
```
which git
/usr/bin/git
```