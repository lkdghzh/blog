# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from functools import wraps
import time


# def func(a, b, c, *args, **kwargs):
#     print a, b, c
#     print args, type(args)
#     print kwargs, type(kwargs)


# func(1, '2', [1, 2, 3], 1, {'a': 1}, 9, i=1, k=2, u=4)

#
# def func(a, b, c, **kwargs):
#     print a, b, c
#     print kwargs
#
#
# func(c=1, i=2, b=4, d=5, e=6, a=7)
# func(7, 4, 1, i=2, d=5, e=6)
# d = {
#     'a': 1,
#     'b': 2,
#     'c': 3,
#     'd': 4,
#     'e': 5
# }
# func(**d)
#
# a = [2, 3, 4]
# k = {'f': 5, 'g': 6}
# func(*a, **k)


# def func1():
#     return 'func1'
#
#
# def func2(f):
#     print f()


# def func2_decorate(f):
#     @wraps(f)
#     def _decorate(*args, **kwargs):
#         start = time.time()
#         ret = f(*args, **kwargs)
#         end = time.time()
#         print end - start
#         return ret
#     return _decorate
#
#
# @func2_decorate
# def func11(a, b):
#     time.sleep(3)
#     return a * b


# print func11.__name__
# print func11(5, 6)


def decorate(*args1, **kwargs2):
    def _decorate(func):
        @wraps(func)
        def __decorate(*args, **kwargs):
            print args1, kwargs2
            start = time.time()
            ret = func(*args, **kwargs)
            end = time.time()
            print end - start
            return ret
        return __decorate
    return _decorate


@decorate(x=100, y=200)
def func111(a, b):
    time.sleep(3)
    return a * b


print func111(5, 6), func111.__name__


