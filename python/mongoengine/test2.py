# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

l = [1, 2, 3, 4, 5]

# # 正常写法
# l2 = []
# for i in l:
#     l2.append(i + 1)
# print l2
#
# l2 = [i + 1 for i in l]  # 推导式
# print l2
#
# l2 = map(lambda a: a + 1, l)  # 工厂函数
# print l2

# d = {i + 1: i for i in l}
# print d, type(d)
#
# d_str = json.dumps(d, indent=4)
# print d_str, type(d_str)


# 元组
l = (1, 2, 3)
n = [1, 2, 3]
# print l
# print n
# n[1] = 100
# print n
# l[1] = 100
# print l

# 元组与数组的转换
# print type(l)
# print type(n)
# x = list(l)
# print type(x)
# y = tuple(n)
# print type(y)

# 元组与数组只有一项
# a = [1]
# print type(a)
# b = (1,)
# print type(b)

# map filter reduce 和 sorted
# d = [
#     {
#         'a': 100,
#         'b': 99,
#         'c': 90
#     },
#     {
#         'a': 101,
#         'b': 103,
#         'c': 92
#     },
#     {
#         'a': 102,
#         'b': 101,
#         'c': 91
#     }
# ]
# l = map(lambda a: a['b'], d)
# print l
#
# l2 = filter(lambda a: a['b'] > 100, d)
# print l2
#
# w = [2, 3, 4, 5, 6]
# l3 = reduce(lambda a, b: a * b, w)
# print l3
#
# sorted_val = sorted(d, key=lambda item: item['b'])
# print sorted_val
#
# sorted_val = sorted(d, key=lambda item: item['b'], reverse=True)
# print sorted_val
#
# sorted_val = sorted(d, key=lambda item: -item['b'])
# print sorted_val

# # lambda 和 def函数
# x = lambda a: a + 1
# print x(1)
#
# def x(a):
#     return a + 1


d = {
    'a': 101,
    'b': 103,
    'c': 92
}

print d.keys()
print d.values()
for k, v in d.items():
    print k, v

keys = d.keys()
values = d.values()
items = zip(keys, values)
d = dict(items)
print d


for index, item in enumerate(['a', 'b', 'c']):
    print index, item

print dict(enumerate(['a', 'b', 'c']))  # [(k1, v1), ...]
