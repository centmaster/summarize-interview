## Python 笔记

##### tuple陷阱

但是，要定义一个只有1个元素的tuple，如果你这么定义：

```python
>>> t = (1)
>>> t
1
```

定义的不是tuple，是`1`这个数！这是因为括号`()`既可以表示tuple，又可以表示数学公式中的小括号，这就产生了歧义，因此，Python规定，这种情况下，按小括号进行计算，计算结果自然是`1`。

所以，只有1个元素的tuple定义时必须加一个逗号`,`，来消除歧义：

```python
>>> t = (1,)
```

##### 有关input

```python
birth = input('birth: ')
if birth < 2000:
    print('00前')
else:
    print('00后')
```

程序会报错，因为输入是字符串形式。需要用int(birth)来转成数字