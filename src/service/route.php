<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;
use think\Request;

//定时同步数据
Route::get(':version/api/timer/sync_user', 'api/:version.app.timer/sync_user');//同步用户数据
Route::get(':version/api/timer/sync_order', 'api/:version.app.timer/sync_order');//同步订单数据
Route::get(':version/api/timer/flight_sync', 'api/:version.app.timer/flight_sync');//同步飞行数据
Route::get(':version/api/timer/test', 'api/:version.app.timer/test');//Ceshi
//登录
Route::post(':version/Token', 'api/:version.app.Token/Token');//登录
Route::post(':version/Register', 'api/:version.app.Token/register');//注册
Route::get(':version/clientToken', 'api/:version.app.Token/clientToken');//获取token
Route::get(':version/api/Qiniu/video_type', 'api/:version.app.Qiniu/video_type');//添加video头部
Route::get(':version/api/Game/List', 'api/:version.app.Game/index');//游戏列表
Route::resource(':version/api/Today', 'api/:version.app.Today');//今日资讯

//音乐管理
Route::get(':version/api/Music/Banners', 'api/:version.app.Music/Banners');//音乐轮播图
Route::get(':version/api/Music/Playlist/Hot', 'api/:version.app.Music/Hot');//热门歌单
Route::get(':version/api/Music/Playlist/:id', 'api/:version.app.Music/detail');//歌单详情
Route::post(':version/api/Music/Song/Subscribe/:id', 'api/:version.app.Music/subscribe');//收藏歌曲
Route::post(':version/api/Music/Song/UnSubscribe/:id', 'api/:version.app.Music/un_subscribe');//取消收藏歌曲
Route::get(':version/api/Music/Song/Subscribe/List', 'api/:version.app.Music/index');//我收藏的歌曲列表
Route::get(':version/api/Music/Song/Subscribe/Playlist', 'api/:version.app.Music/play_list');//我收藏的歌曲列表(歌单对象)
Route::get(':version/api/Music/FM', 'api/:version.app.Music/fm');//空中FM
Route::get(':version/api/Music/Top', 'api/:version.app.Music/top');//榜单

//视频管理
Route::get(':version/api/Video/Comments/List', 'api/:version.app.VideoComment/index');//获取评论列表
Route::get(':version/api/Video/IsLike/:id', 'api/:version.app.VideoComment/is_like');//是否已点赞
Route::get(':version/api/Video/List', 'api/:version.app.Video/index');//推荐视频
Route::get(':version/api/Video/:id', 'api/:version.app.Video/detail');//根据Id获取Video
Route::post(':version/api/Video/Comments', 'api/:version.app.Video/comments');//评论视频
Route::delete(':version/api/Video/Comments/:id', 'api/:version.app.VideoComment/del');//删除评论
Route::post(':version/api/Video/Like/:id', 'api/:version.app.VideoComment/like');//点赞视频
Route::post(':version/api/Video/UnLike/:id', 'api/:version.app.VideoComment/un_like');//取消视频点赞

//新闻管理
Route::get(':version/api/News/Recommended', 'api/:version.app.News/Recommended');//推荐新闻
Route::get(':version/api/News/List', 'api/:version.app.News/index');//新闻列表
Route::resource(':version/api/News', 'api/:version.app.News');


Route::get(':version/api/FlightInfo', 'api/:version.app.flight/FlightInfo');//飞行资讯


Route::get(':version/api/User/Me', 'api/:version.app.User/Me');//用户详情

//菜单管理
Route::get(':version/api/Dishes/Recommended', 'api/:version.app.Dishes/Recommended');//推荐菜品
Route::get(':version/api/Dishes/Statistics', 'api/:version.app.Dishes/Statistics');//统计

Route::get(':version/api/Dishes/List', 'api/:version.app.Dishes/index');//菜单列表

Route::get(':version/api/Dishes/MyOrders', 'api/:version.app.Dishes/MyOrders');//我的订单
Route::post(':version/api/Dishes/PlaceOrder', 'api/:version.app.Dishes/PlaceOrder');//下单
Route::get(':version/api/Dishes/UndoneOrders', 'api/:version.app.Dishes/UndoneOrders');//未完成订单
Route::get(':version/api/Dishes/DoneOrders', 'api/:version.app.Dishes/DoneOrders');//已完成订单
Route::put(':version/api/Dishes/OrdersStatus', 'api/:version.app.Dishes/OrdersStatus');//已完成订单
Route::resource(':version/api/Dishes', 'api/:version.app.Dishes');


Route::miss('Error/index');
$request = Request::instance();
if ($request->method() === "OPTIONS") {
    exit (json_encode(array('error' => 200, 'message' => 'Options Success.')));
}

return [
    '__pattern__' => [
        'name' => '\w+',
    ],
];
