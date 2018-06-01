from flask import Blueprint,jsonify
article_blue = Blueprint('blue_article')


@article_blue.before_request
def before_request():
    print 'article_blue pre_check'


@article_blue.route('index',methods=['GET', 'POST'])
def get_articles():
    return jsonify({
        'title': '',
        'content': ''
    })
