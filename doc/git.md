# Git（分布式版本控制系统）

## Git VS SVN

+ git 是分布式的（decentralized），svn 是中央集权制
+ git 直接记录快照，而非差异比较

![存储每个文件与初始版本的差异](https://git-scm.com/book/en/v2/book/01-introduction/images/deltas.png)
![存储项目随时间改变的快照](https://git-scm.com/book/en/v2/book/01-introduction/images/snapshots.png)

## Git 常用命令

>  Git 有三种状态：已提交（committed）、已修改（modified）和已暂存（staged）。 
> 
> + 已提交表示数据已经安全的保存在本地数据库中。 
> + 已修改表示修改了文件，但还没保存到数据库中。 
> + 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

### 配置
```
git config --global user.name 'liuxin.rkl'
git config --global user.email liuxin.rkl@alibaba-inc.com
git config -l
```

### 远程仓库
```
git remote
git remote -v
git remote show origin
git fetch [remote-name]
git pull
git push [remote-name]
```

### 提交更新
```
git status
git add
git commit
git mv
```

![git commit](https://git-scm.com/book/en/v2/book/03-git-branching/images/commit-and-tree.png)

### 撤销

**记住，Git 中任何 已提交的 东西几乎总是可以恢复的, 然而，任何你未提交的东西丢失后很可能再也找不到了。**
#### 修改已提交的信息
```
git commit --amend
```

#### 撤销对文件的修改
```
git checkout -- file
```

#### 撤销暂存区的修改
```
git reset HEAD <file>
```

### 查看日志
```
git log
git log -p -2
git log --stat
git log --pretty=oneline
```

### 打标签
```
git tag
git tag -l
git tag -a v1.0 -m 'add tag v1.0'
git tag -a v0.5 9fceb02
git push origin v1.0 
git push origin --tags
git checkout -b hotfix1.0 v1.0
```
**你可以通过 tag 创建分支，但是后续需要关注的是如何合并到 master**

### 自定义 git 命令
```
git alias
br = branch
ci = commit
co = checkout
hist = log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short
st = status
```

## Git 分支
> Git 的分支，其实本质上是指向提交对象的可变指针。Git 的默认分支名字是 master。 

![分支及其提交历史](https://git-scm.com/book/en/v2/book/03-git-branching/images/branch-and-history.png)

> Git 的分支实质保证了它的创建和销毁都异常高效。同时，由于每次提交都会记录父对象，所以寻找恰当的合并基础（译注：即共同祖先）也是同样的简单和高效。 这些高效的特性使得 Git 鼓励开发人员频繁地创建和使用分支。

### git rebase 变基
> 一目的是为了确保在向远程分支推送时能保持提交历史的整洁——首先在自己的分支里进行开发，当开发完成时你需要先将你的代码变基到 origin/master 上，然后再向主项目提交修改。 不再需要进行整合工作，只需要快进合并便可。
             
```
git rebase [basebranch] [topicbranch]
```

![rebase](https://git-scm.com/book/en/v2/book/03-git-branching/images/basic-rebase-3.png)

**不要对在你的仓库外有副本的分支执行 rebase**

### rebase vs merge

> 总的原则是，只对尚未推送或分享给别人的本地修改执行变基操作清理历史，从不对已推送至别处的提交执行变基操作，这样，你才能享受到两种方式带来的便利。

## gitlab 项目管理

+ issue 切分的粒度
+ 标签管理
+ 创建 milestone
+ 不要发大招（merge request)

### service / web hooks

+ 持续集成
+ kelude bug hook

## 参考

+ [git-scm](https://git-scm.com/book/zh/v2)
+ [git vs svn](http://stackoverflow.com/questions/871/why-is-git-better-than-subversion)
