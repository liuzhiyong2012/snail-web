
export default class AudioUtils{
	private audioEle:any;
	private vueCtx:any;
	
	private eventList:string[]=[
		'loadstart',	//浏览器开始在网上寻找媒体数据
		'progress',	//浏览器正在获取媒体数据
		'suspend',	//浏览器暂停获取媒体数据，但是下载过程并没有正常结束
		'abort',	//浏览器下载完全部媒体数据之前中止获取媒体数据，但并不是下载错误引起的
		'error',	//获取媒体数据的过程中出错
		'stalled',	//浏览器尝试获取数据失败
		'play',	//将开始播放，当执行了play方法时触发，或数据下载后元素被设置为autoplay属性
		'pause',	//播放暂停，当执行了pause方法时触发
		'loadedmetadata',	//浏览器获取完媒体的时长和字节数
		'loadeddata',	//浏览器已加载完当前播放位置的媒体数据，准备播放
		'waiting',	//播放过程由于得不到下一帧而暂停播放（如下一帧尚未加载完），但很快就能够得到下一帧
		'playing',	//正在播放
		'canplay',	//浏览器能够播放媒体，但估计以当前播放速率不能直接将媒体播放完，播放期间需要缓冲
		'canplaythrough',	//浏览器可以播放媒体，而且以当前播放速率能够将媒体播放完，不再需要进行缓冲
		'seeking',	//seeking属性变为true,表明浏览器正在请求数据
		'seeked',	//eeking属性变为false,表示浏览器停止请求数据
		'timeupdate',	//当前播放位置发生改变，可能是播放过程中的自然改变，也可能是人为的改变，或由于播放不能连续而发生的跳变
		'ended',	//播放结束后停止播放
		'ratechange',	//defaulplaybackRate属性（默认播放速率）或playbackRate属性（当前播放速率）发生改变
		'durationchange',	//播放时长发生改变
		'volumechange'	//volume属性（音量）发生改变或muted属性（静音状态）发生改变 
	];
	
	constructor(vueCtx){
		this.vueCtx = vueCtx;
	}
	
	public init():void{
		this.audioEle = new Audio();
		this.listenEvent();
	}
	
	
	public listenEvent():void{
		this.eventList.forEach((event,index)=>{
			this.audioEle.addEventListener(event,(e)=>{
				console.log('audio触发:' + event);
			});
		});
	}
	
	public unlistenEvent():void{
		this.eventList.for((event,index)=>{
			this.audioEle.removeEventListener(event);
		});
	}
	
	public play(url):void{
		this.audioEle.src = url;
		this.audioEle.play();
	}
	
}

/* 
属性
audioTracks	返回表示可用音频轨道的 AudioTrackList 对象。
autoplay	设置或返回是否在就绪（加载完成）后随即播放音频。
buffered	返回表示音频已缓冲部分的 TimeRanges 对象。
controller	返回表示音频当前媒体控制器的 MediaController 对象。
controls	设置或返回音频是否应该显示控件（比如播放/暂停等）。
crossOrigin	设置或返回音频的 CORS 设置。
currentSrc	返回当前音频的 URL。
currentTime	设置或返回音频中的当前播放位置（以秒计）。
defaultMuted	设置或返回音频默认是否静音。
defaultPlaybackRate	设置或返回音频的默认播放速度。
duration	返回音频的长度（以秒计）。
ended	返回音频的播放是否已结束。
error	返回表示音频错误状态的 MediaError 对象。
loop	设置或返回音频是否应在结束时再次播放。
mediaGroup	设置或返回音频所属媒介组合的名称。
muted	设置或返回是否关闭声音。
networkState	返回音频的当前网络状态。
paused	设置或返回音频是否暂停。
playbackRate	设置或返回音频播放的速度。
played	返回表示音频已播放部分的 TimeRanges 对象。
preload	设置或返回音频的 preload 属性的值。
readyState	返回音频当前的就绪状态。
seekable	返回表示音频可寻址部分的 TimeRanges 对象。
seeking	返回用户当前是否正在音频中进行查找。
src	设置或返回音频的 src 属性的值。
textTracks	返回表示可用文本轨道的 TextTrackList 对象。
volume	设置或返回音频的音量。

//方法
addTextTrack()	向音频添加新的文本轨道。
canPlayType()	检查浏览器是否能够播放指定的音频类型。
fastSeek()	在音频播放器中指定播放时间。
getStartDate()	返回新的 Date 对象，表示当前时间线偏移量。
load()	重新加载音频元素。
play()	开始播放音频。
pause()

事件
loadstart	浏览器开始在网上寻找媒体数据
progress	浏览器正在获取媒体数据
suspend	浏览器暂停获取媒体数据，但是下载过程并没有正常结束
abort	浏览器下载完全部媒体数据之前中止获取媒体数据，但并不是下载错误引起的
error	获取媒体数据的过程中出错
stalled	浏览器尝试获取数据失败
play	即将开始播放，当执行了play方法时触发，或数据下载后元素被设置为autoplay属性
pause	播放暂停，当执行了pause方法时触发
loadedmetadata	浏览器获取完媒体的时长和字节数
loadeddata	浏览器已加载完当前播放位置的媒体数据，准备播放
waiting	播放过程由于得不到下一帧而暂停播放（如下一帧尚未加载完），但很快就能够得到下一帧
playing	正在播放
canplay	浏览器能够播放媒体，但估计以当前播放速率不能直接将媒体播放完，播放期间需要缓冲
canplaythrough	浏览器可以播放媒体，而且以当前播放速率能够将媒体播放完，不再需要进行缓冲
seeking	seeking属性变为true,表明浏览器正在请求数据
seeked	seeking属性变为false,表示浏览器停止请求数据
timeupdate	当前播放位置发生改变，可能是播放过程中的自然改变，也可能是人为的改变，或由于播放不能连续而发生的跳变
ended	播放结束后停止播放
ratechange	defaulplaybackRate属性（默认播放速率）或playbackRate属性（当前播放速率）发生改变
durationchange	播放时长发生改变
volumechange	volume属性（音量）发生改变或muted属性（静音状态）发生改变
*/

