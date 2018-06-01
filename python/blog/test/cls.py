#!/usr/bin/python
# -*- coding: utf-8 -*-


class Person(object):
    count = 0

    @classmethod
    def say(cls, sth):
        print sth+cls.count

    def __init__(self, name, gender, birth, score, job='loser'):
        Person.count = Person.count + 1
        self.name = name
        self.gender = gender
        self.birth = birth
        self.__score = score
        self.job = job



print Person.count
lk = Person('like', 'Male', '1990-1-1', 20000, job='Student')
print lk.name
print lk.job

# print lk.__score  属性限制  AttributeError:'Person' object has no attribute 'score'

# 类属性，实例和类都可以调用
print lk.count
print Person.count

lk.say(2)
