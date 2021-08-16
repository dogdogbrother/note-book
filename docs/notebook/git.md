## git配置

第一次使用git，配置用户信息:
```
git config --global user.name "your name"
git config --global user.email "youremail@github.com"
```
然后可以使用 `git config --global --list` 来查看对应的设置信息.

## remote 关联操作

如果是 clone 下来的项目,`git remote` 后显示 **origin**,这是默认的仓库名.  
`git remote -v` 会显示:
```
origin  git@gitlab.***.git (fetch)
origin  git@gitlab.***.git (push)
```
可以发现 `origin` 就是仓库地址url的映射名,那么可以猜想的到,可以更改此仓库名,也可以设置多个仓库名用来管理多个仓库.

更改仓库别名,`git remote rename origin new-origin`.
新增仓库,`git remote add test-origin 新的git地址`.

再次输入 `git remote` 就可以看到2个远程仓库了.

移除一个仓库,`git remote rm [remote-name]`.

把远程仓库分支更新到本地,可以加上 `update` 参数 `git remote update origin`,再用checkout切分支即可.

### add 提交暂存区
可以使用 * 符号来提交同一类型文件 `git add *.js`.

可以提交某一文件夹下的所有文件 `git add 文件夹名`.

可以使用 `reset` 来取消已暂存的文件:
```
git reset .  // 取消全部的暂存文件
git reset *.js  // 取消全部的暂存的js文件
```

可以使用 `checkout` 来取消对某一个文件的修改 `git checkout -- 你的文件`.

`git diff` 输出的是工作区和暂存区的差别,当然,后面可以加上文件名.
比较暂存区与上一版本的差异：git diff --cached

## commit 提交

`git commit -am '提交注释'` 基本等同于 `git add .` + `git commit -m '提交注释'`,之所以说是基本等同,是因为`-am`并不会添加新文件,也就是未追踪文件.

如果在commit提交过后发现有点小问题修改修改,但是又不想新提交一次,可以先`git add`提交到暂存区.再使用 `git commit --amend` 修正(amend)这次commit.

## fetch 更新仓库信息

`git fetch` 的作用是更新远程仓库的信息,假如同事新建立个分支上传到了远程仓库.但是我本地并不知道新分支的名字,可以使用fetch来获取仓库的最新状态.`git fetch` +  `git merge origin/分支名` 基本等同与`git pull origin dev`.


## rebase 变基合并
`git rebase` 和 `git merge` 功能是一样的,都是合并代码.

举个例子,2个开发者一起commit了一次,然后又commit了一次,最后两人都push到仓库,观察commit已经记录可以发现,一共有6次提交记录,4个commit,2个merge信息,而且会发现,提交记录会按照commit的时间排序,也就是交叉显示.

如果开发者多了起来,可见这个`commit`信息就会很乱,并且有很多没必要的`merge`提交.如果使用`rebase`,那么你本地的`commit`记录,就会形成一个整体,不会被别人的`commit`乱入,并且没有`merge commit`.



