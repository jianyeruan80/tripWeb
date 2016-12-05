

var vList = ['https://s3-us-west-2.amazonaws.com/coverr/mp4/Hey-World.mp4', 'https://s3-us-west-2.amazonaws.com/coverr/mp4/Hey-World.mp4']; // 初始化播放列表
var vLen = vList.length; // 播放列表的长度

var n = 0; // 当前播放的视频

function init() {
    document._video = document.getElementById("video");
}
document.addEventListener("DOMContentLoaded", init, false);




function play() {

    if(n>=vLen)n=0;
    document._video.src = vList[n];
    document._video.load(); // 如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
    document._video.play();
	n++;

	//play(n);
    
}
window.setTimeout(function(){
play(0)
},0);


document.getElementById("video").addEventListener("ended", myFc3);
function myFc3() {
	play();
}
/*


//switching videos (playlist)
var videos = 
[
 [
	//"http://media.w3.org/2010/05/sintel/poster.png",
	"./js/IG.mp4",
	//"http://media.w3.org/2010/05/sintel/trailer.webm"
 ],
 [
	//"http://media.w3.org/2010/05/bunny/poster.png",
	"./js/Xiaowen.mp4"
 ]
 ];
function switchVideo(n) {
	 alert(n);
	if (n >= videos.length) n = 0;

	var mp4 = document.getElementById("mp4");
	var parent = mp4.parentNode;

	//document._video.setAttribute("poster", videos[n][0]);
	mp4.setAttribute("src", videos[n][0]);
    document._video.load();
	document._video.play();
}

document._video.addEventListener('end', switchVideo);
/*window.setTimeout(function(){
switchVideo(0)
},10);
/*An example of all the options of the media API in HTML5
More info here: http://www.w3.org/2010/05/video/mediaevents.html

Buttons styled with RGBA, more info here:
http://zurb.com/article/266/super-awesome-buttons-with-css3-and-rgba

var vList = ['视频地址url1', 'url2', '...']; // 初始化播放列表
var vLen = vList.length; // 播放列表的长度

var curr = 0; // 当前播放的视频
var video = new Video();
video.addEventListener('end', play);
play();

function play(e) {
    video.src = vList[curr];
    video.load(); // 如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
    video.play();

    curr++;
    if (curr >= vLen) curr = 0; // 播放完了，重新播放
}
*/