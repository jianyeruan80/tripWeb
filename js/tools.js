

var vList = ['https://s3-us-west-2.amazonaws.com/coverr/mp4/Hey-World.mp4', 'https://s3-us-west-2.amazonaws.com/coverr/mp4/Hey-World.mp4']; // ��ʼ�������б�
var vLen = vList.length; // �����б�ĳ���

var n = 0; // ��ǰ���ŵ���Ƶ

function init() {
    document._video = document.getElementById("video");
}
document.addEventListener("DOMContentLoaded", init, false);




function play() {

    if(n>=vLen)n=0;
    document._video.src = vList[n];
    document._video.load(); // ����̵Ļ������Լ������֮���ٲ��ţ����� canplaythrough �¼�����
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

var vList = ['��Ƶ��ַurl1', 'url2', '...']; // ��ʼ�������б�
var vLen = vList.length; // �����б�ĳ���

var curr = 0; // ��ǰ���ŵ���Ƶ
var video = new Video();
video.addEventListener('end', play);
play();

function play(e) {
    video.src = vList[curr];
    video.load(); // ����̵Ļ������Լ������֮���ٲ��ţ����� canplaythrough �¼�����
    video.play();

    curr++;
    if (curr >= vLen) curr = 0; // �������ˣ����²���
}
*/