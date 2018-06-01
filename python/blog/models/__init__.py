from mongoengine import connect,Document,StringField,IntField,DateTimeField
from datetime import  datetime
import time
from random import randint


class BaseModel(Document):
    id = StringField()
    created_time = DateTimeField()
    updated_time = DateTimeField()
    deleted_time = DateTimeField()

    @classmethod
    def pre_save(cls):
        ##  基类表中的创建和更新时间关系
        now= datetime.now()
        cls.updated_time = now
        if cls.id:
            cls.created_time = '{0}{1}'.format(int(time()), randint(1000, 9999))
