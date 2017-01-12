<script>
     export default {
        props: {
            show: {
                type: Boolean,
                twoWay: true,
                default: false
            },
            title: {
                type: String,
                default: '标题'
            },
            //Invalid default value for prop "popstyle": Props with type Object/Array must use a factory function to return the default value.
            popStyle:{
                type: Object,
                default:function(){return {'width':'500px','height':'auto',position:'fixed'}}
            },
            bodyStyle:{
                type: Object,
                default:function(){return {'max-height':'600px','overflow-y': 'scroll'}}
            },
            // 为true时无法通过点击遮罩层关闭modal
            force: {
                type: Boolean,
                default: false
            },
            // 自定义组件transition
            transition: {
                type: String,
                default: 'modal'
            },
            // 确认按钮text
            okText: {
                type: String,
                default: '确定'
            },
            // 取消按钮text
            cancelText: {
                type: String,
                default: '取消'
            },
            // 确认按钮className
            okClass: {
                type: String,
                default: 'btn btn-primary'
            },
            // 取消按钮className
            cancelClass: {
                type: String,
                default: 'btn btn-default'
            },
            // 点击确定时关闭Modal
            // 默认为false，由父组件控制prop.show来关闭
            closeWhenOK: {
                type: Boolean,
                default: false
            },
            dragable:{
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                duration: null
            };
        },
        computed: {
            modalClass () {
                //弹框首次加载执行
            }
        },
        created () {
            if (this.show) {
                document.body.className += ' modal-open';
            }
        },
        mounted(){
            if (this.show) {
                debugger
                // var startPositionX = 0, 
                //     startPositionY = 0,
                //     target=document.querySelector(".modal-content");
                //     //this.addEvt(target,'mousedown',this.targetMouseDown);
                }
        },
        beforeDestroy () {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
        },
        watch: {
            show (value) {
               /*
               弹框首次加载不执行，弹框上任意操作会触发
               */
               
                // 在显示时去掉body滚动条，防止出现双滚动条
                if (value) {
                    document.body.className += ' modal-open';
                }
                // 在modal动画结束后再加上body滚动条
                else {
                     debugger
                    if (!this.duration) {
                        this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                    }
                    window.setTimeout(() => {
                        document.body.className = document.body.className.replace(/\s?modal-open/, '');
                    }, this.duration || 0);
                }
            }
        },
        methods: {
            getCSS:function(o,key){
                return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];   
            },
            //节点逐层递归向上来相加offsetTop来获得绝对偏移 元素相对于整个页面的偏移
            getOffset:function (Node, offset) {
                if (!offset) {
                    offset = {};
                    offset.top = 0;
                    offset.left = 0;
                }
                if (Node == document.body) {//当该节点为body节点时，结束递归
                    return offset;
                }
                offset.top += Node.offsetTop;
                offset.left += Node.offsetLeft;
                return this.getOffset(Node.parentNode, offset);//向上累加offset里的值
            },
            //封装添加事件
            addEvt:function (obj, ev, handler){ 
                if(window.attachEvent){ 
                    obj.attachEvent("on" + ev, handler); 
                }else if(window.addEventListener){ 
                    obj.addEventListener(ev, handler, false); 
                } 
            } ,
            //封装解绑事件
            removeEvt :function(elem, type, handler) { 
                if (window.removeEventListener) {
                    // 标准浏览器 
                    elem.removeEventListener(type, handler, false);                  
                } 
                else if (window.detachEvent) {
                    // IE浏览器 
                    elem.detachEvent("on" + type, handler);               
                }        
            },
            //鼠标点下
            targetMouseDown:function (ev) {

                var doc = document.documentElement,
                    body = document.body,
                    target= document.querySelector(".modal-content");
                var pageX=ev.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                var pageY = ev.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );

                //ev,$对象不需要做兼容
                //$中pageX（在document）和js中cleintX(可视区域)
                //js中cleintX+scrollleft+scrollright的两边=$中pageX
                var startPositionX = pageX - this.getOffset(target).left;
                var startPositionY = pageY - this.getOffset(target).top;

                //向document注册，不管如何移动，不会脱离鼠标。.div1会冒泡到。一直在触发，里面的函数一直在走。
                var mouseMove=function (ev) {
                    target.style.left =  ev.pageX - startPositionX+'px';
                    target.style.top =  ev.pageY - startPositionY+'px';
                }
                var mouseUp=function (ev) {
                     this.removeEvt(document,'mousemove',mouseMove);
                }
                this.addEvt(document,'mousemove',mouseMove)
                
                //thisdocument.onmousemove=mouseMove;
                this.addEvt(document,'mouseup',mouseUp)
                return false;//最好阻止.div1的mousedown冒泡和默认。
            },
            ok () {
                this.$emit('ok');
                if (this.closeWhenOK) {
                    this.show = false;
                }
            },
            cancel () {
                debugger
                this.$emit('cancel');
                //Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. 
                //Instead, use a data or computed property based on the prop's value. Prop being mutated: "show"
                //this.show = false;

            },
            // 点击遮罩层
            clickMask () {
                debugger
                if (!this.force) {
                    this.cancel();
                }
            }
        }
     };
</script>
<!--:style="outerStyle"-->
<template>
    <div v-show="show">
        <div class="modal flex-center" @click.self="clickMask">
            <div class="modal-dialog tp100"  :class="modalClass" ref:dialog>
                <div class="modal-content" :style="popStyle" @mousedown.stop="targetMouseDown">
                    <!--头部-->
                    <div class="modal-header">
                        <div name="header">
                            <a type="button" class="close" @click="cancel">x</a>
                            <h4 class="modal-title">
                                <slot name="title">
                                    {{title}}
                                </slot>
                            </h4>
                        </div>
                    </div>
                    <!--内容(父组件传来的自动分配到此处)-->
                    <div class="modal-body" :style="bodyStyle">
                        <!-- <slot name="body"></slot> -->
                        <slot></slot>
                    </div>
                    <!--底部-->
                    <div class="modal-footer">
                        <slot name="footer">
                        <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                        <button type="button" :class="okClass" @click="ok">{{okText}}</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media (min-width: 768px)
    .tp100{
        top:-100px;
    }
</style>