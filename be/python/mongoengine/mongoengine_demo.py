# -*- coding: utf-8 -*-
"""
# mongo 请看mongo文件夹
# pip install mongoengine
# 设置配置文件->解析器路径（例mongoengine下载安装读位置）
"""

from mongoengine import connect, Document, StringField, IntField

connect('db_like', 'demo', host='127.0.0.1', port=27017)


class User(Document):
    name = StringField(required=True)
    age = IntField()
    meta = {
        'collection': 'collection_user',
        'db_alias': 'demo',
        'strict': False
    }


# 写
user = User()
user.name = 'like'
user.age = 27
user.save()
# show dbs
# use db_like
# > db.collection_user.find()
# { "_id" : ObjectId("5b0bf0e0cd56783dc91cc09f"), "name" : "like", "age" : 27 }

# 读 查询
for user in User.objects(name='like'):
    print user.name, user.age
