## 编译ts
>typescript-compile tsc的缩写
```
tsc -v

tsc src/a.ts --module "commonjs"

where tsc
```
## 生成类型定义文件 
```
//-d
tsc src/a.ts -m "commonjs" -d

http://www.json2ts.com/
```
```
import * as p from "../package.json"
```
## 运行ts
```
ts-node src/a.ts   
```