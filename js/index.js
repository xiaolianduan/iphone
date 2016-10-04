$(function () {
    // 去除浏览器默认行为
    document.onmousedown=function (e) {
        var ev=e||window.event;
        ev.preventDefault()
        document.onmousemove=function (e) {
            var ev=e||window.event;
            ev.preventDefault()
        }
    };

    // 手机下拉菜单实现
    var flag=true;
    $(".movie").click(function () {
        if(flag){
            flag=false;
            $(".denghao").eq(0).css({
                transform:"translateY(3px) rotate(45deg)"
            }).end().eq(1).css({
                transform:"translateY(-3px) rotate(-45deg)"
            })
            $(".two-list").slideDown(1000)
            $(".topnavbox").css({
                background:"rgba(0,0,0,1)"
            })
            $(".nav li:last-child").css({
                marginRight:"-400px"
            })
            $("body").css({
                overflow:"hidden"
            })
        }else{
            $(".denghao").eq(0).css({
                transform:"rotate(0deg)"
            }).end().eq(1).css({
                transform:"rotate(0deg)"
            })
            $(".two-list").slideUp(1000);
            $(".topnavbox").css({
                background:"rgba(0,0,0,0.8)"
            })
            flag=true;
            $(".nav li:last-child").animate({
                marginRight:0
            })
            $("body").css({
                overflow:"auto"
            })
        }
    });

    // 轮播图

    var banners=$(".banner-son");
    var bannerbox=$(".bannerbox");
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    $(window).resize(function () {
        ch=document.documentElement.clientHeight;
        cw=document.documentElement.clientWidth;
        if(ch<740){
            bannerbox.css({
                width:cw,
            })
        }
    })
    var btn=$(".btn");

    var now=0;
    var next=0;
    var btnflag=true;

    // 自动轮播实现
    function moveLeft() {
        next++;
        if(next>banners.length-1){
            next=0
        }
        for(var i=0;i<banners.length;i++){
            if(i!=now){
                banners[i].style.left=cw+"px";
            }
        }
        banners.eq(now).animate({left:-cw});
        banners.eq(next).animate({left:0},function () {
            btnflag=true;
        });

        btn.eq(now).css({background:"white",border:"1px solid #0070C9"});
        btn.eq(next).css({background:"#666",border:"none"});
        now=next;
    }
    var t=setInterval(moveLeft,3000)

    function moveRight() {
        next--;
        if(next<0){
            next=banners.length-1
        }
        for(var i=0;i<banners.length;i++){
            if(i!=now){
                banners[i].style.left=-cw+"px";
            }
        }
        banners.eq(now).animate({left:cw});
        banners.eq(next).animate({left:0},function () {
            btnflag=true;
        });

        btn.eq(now).css({background:"white",border:"1px solid #0070C9"});
        btn.eq(next).css({background:"#666",border:"none"});
        now=next;
    }

    // 左右按钮实现
    $(".left-btn").click(function () {
        if(btnflag){
            btnflag=false;
            clearInterval(t);
            moveRight();
            t=setInterval(moveLeft,3000)
        }
    });

    $(".right-btn").click(function () {
        if(btnflag){
            btnflag =false;
            clearInterval(t);
            moveLeft();
            t = setInterval(moveLeft, 3000)
        }
    });

    //底部按钮实现
    btn.click(function () {
        clearInterval(t);
        var index=$(this).index();
        if(index<now){
            for(var i=0;i<banners.length;i++){
                if(i!=now){
                    banners[i].style.left=-cw+"px";
                }
            }
            banners.eq(now).animate({left:cw});
            banners.eq(index).animate({left:0},function () {
                btnflag=true;
            });
            btn.eq(now).css({background:"white",border:"1px solid #0070C9"});
            btn.eq(index).css({background:"#666",border:"none"});
        }else if(index>now){
            for(var i=0;i<banners.length;i++){
                if(i!=now){
                    banners[i].style.left=cw+"px";
                }
            }
            banners.eq(now).animate({left:-cw});
            banners.eq(index).animate({left:0},function () {
                btnflag=true;
            });

            btn.eq(now).css({background:"white",border:"1px solid #0070C9"});
            btn.eq(index).css({background:"#666",border:"none"});
        }
        now=index;
        next=index;
        t = setInterval(moveLeft, 3000)
    })

    //底部下拉链接

    $(".linkbox  dl").click(function () {
        var num=$(this).children("dd").length;
        if($(this).css("height")=="39px"){
            $(this).css({
                height:num*30+"px"
            })
            $(this).find("span").css({
                transform:"rotate(45deg)"
            })
        }else{
            $(this).css({
                height:"39px"
            })
            $(this).find("span").css({
                transform:"rotate(-45deg)"
            })
        }
    })
});
