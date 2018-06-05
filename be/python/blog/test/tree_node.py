# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from bson import ObjectId
from mongoengine import connect, Document, StringField, IntField, ObjectIdField

connect('like', 'like')


class TreeNode(Document):
    name = StringField(required=True)
    parent_id = ObjectIdField()  # 父节点ID
    level = IntField()  # 节点层级

    meta = {
        'collection': 'tree_node',
        'db_alias': 'like',
        'strict': False
    }

    def as_dict(self):
        return {
            'id': unicode(self.id),
            'name': self.name,
            'parent_id': unicode(self.parent_id),
            'level': self.level
        }

    def __unicode__(self):
        return '<{0}>'.format(self.name)

    @property
    def parent(self):
        return self.__class__.objects(id=self.parent_id).first() if self.parent_id else None

    @property
    def children(self):
        return self.__class__.objects(parent_id=self.id)#[:100]

    @property
    def has_child(self):
        return len(self.children) != 0

    def get_ancestors(self, d=None):
        if d is None:
            d = []

        if not self.parent:
            return d

        d.append(self.parent)
        return self.parent.get_ancestors(d)

    @property
    def full_name(self):
        ancestors = self.get_ancestors()
        ancestors = [ans.name for ans in sorted(ancestors, key=lambda a: a.level)]
        we = ancestors + [self.name]
        return self.join_list(we)

    @staticmethod
    def join_list(we):
        return '-'.join(we)

        # ancestors = []
        # for ans in sorted(lambda a: a.level, ancestors):
        #     ancestors.append(ans)

    @classmethod
    def get_by_id(cls, _id):
        return cls.objects(id=_id).first()

    @classmethod
    def get_by_name(cls, name):
        print cls.join_list(['1', '2', '3'])
        return cls.objects(name=name).first()


# 插入树结构
# a = TreeNode(name='root', level=1)
# a.save()
#
# b = TreeNode(name='b', parent_id=a.id, level=2)
# b.save()
#
# c = TreeNode(name='c', parent_id=a.id, level=2)
# c.save()
#
# d = TreeNode(name='d', parent_id=b.id, level=3)
# d.save()
#
# e = TreeNode(name='e', parent_id=b.id, level=3)
# e.save()
#
# f = TreeNode(name='f', parent_id=c.id, level=3)
# f.save()
#
# g = TreeNode(name='g', parent_id=c.id, level=3)
# g.save()


# for tree_node in TreeNode.objects():
#     print tree_node.as_dict()


# for tree_node in TreeNode.objects(name='g'):
#     print tree_node.as_dict()
#     print tree_node.parent.name
#     print tree_node.parent.as_dict()


# for tree_node in TreeNode.objects(name='root'):
#     print tree_node.as_dict()
#     for child in tree_node.children:
#         print child.as_dict()


# for tree_node in TreeNode.objects(name='g'):
#     print tree_node.as_dict()
#     for ancestor in tree_node.get_ancestors():
#         print ancestor.as_dict()
#     print tree_node.full_name


# t = TreeNode.get_by_id(ObjectId('5b0e94a2c3666e5356db7efe'))
# print t.as_dict()
# t = TreeNode.get_by_name('c')
# print t.as_dict()
# print t.parent.name