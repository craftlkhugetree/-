::@echo off表示执行了这条命令后关闭所有命令(包括本身这条命令)的回显。而echo off命令则表示关闭其他所有命令(不包括本身这条命令)的回显，@的作用就是关闭紧跟其后的一条命令的回显，

::forfiles
::/P    pathname      表示开始搜索的路径。默认文件夹是当前工作的目录 (.)。
::/M    searchmask    根据搜索掩码搜索文件。默认搜索掩码是 '*'。
::/S                  指导 forfiles 递归到子目录。像 "DIR /S"。
::/C    command       表示为每个文件执行的命令。命令字符串应该用双引号括起来。



@echo off

echo 这是测试内容的第1行
echo 这是测试内容的第2行
echo 这是测试内容的第3行
echo end

pause