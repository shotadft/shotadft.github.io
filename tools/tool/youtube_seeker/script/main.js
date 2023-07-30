window.onload = function () {
const iframeDivided = document.getElementById('movie_frame');
const goButton = document.getElementById('go');
const selectText = document.getElementById('select_text');

goButton.onclick = () => {        
        if (selectText.value === '') 
        {
            alert('URLを入力してください。');
        }
        else
        {
           const ag2getParameterByName = function(name, url) {
                let queryString = url.split('?');
                if(queryString.length >= 2){
                    let paras = queryString[1].split('&');
                for(let i = 0; i < paras.length; i++){
                    let eachPara = paras[i].split('=');
                    if(eachPara[0] == name) return eachPara[1];
                    }
                }
                return null;
            };
            const ag2idToEmbed = function(id) {
                  let ytIframe = '<iframe src="https://www.youtube.com/embed/'+ id +'" width="768" height="432" frameborder="0" allow="accelerometer; encrypted-media; autoplay; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                return ytIframe;
            };
            const ytUrlRegExp = /(?<!=\")\b(?:https?):\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[\w!?/+\-|:=~;.,*&@#$%()'"[\]]+/g;
            const ag2changeToEmbed = function(txt){
            txt = selectText.value;
            //テキスト内からホスト名がyoutubeのURLにマッチする文字列をすべて取得
            let urls = txt.match(ytUrlRegExp);
            //youtubeのURLがあった場合
            if(urls)
	    {
            //すべてのURLをチェックして置換処理
            for(let i = 0; i < urls.length; i++){
            let url = urls[i],
            youTubeId,
            replaceRegExp;
            //URLにクエリがある場合
            if(url.match(/\?/) != null){
                //URLからID(パラメーター名vの値)の部分を抽出
            youTubeId = ag2getParameterByName('v', url) ? ag2getParameterByName('v', url) : false;
            }
            else if(url.match(/(youtube\.com\/watch|youtu\.be)/) != null){
            //URLにクエリが無く、動画のURLかショートコードの場合
            //URLからIDの部分を抽出
            youTubeId = (/(?:https?):\/\/(?:www\.)?(?:youtube\.com\/watch|youtu\.be)\/(.+)/g).exec(url)[1];
            }
                    //テキスト内の該当URLの箇所をiframeのコードに置換
                    if(youTubeId){
                        replaceRegExp = new RegExp('(?<!=\")(?:'+url.replace('.', '\\.').replace('?', '\\?')+')');
                        txt = txt.replace(replaceRegExp, ag2idToEmbed(youTubeId));
                    }
                }
	    }
            	return txt;
            };
            const className = 'movie_frame';
            //置換処理をする要素をクラス名で指定
            const parentEle = document.getElementsByClassName(className),
	        parentEleNum = parentEle.length;
            //指定したクラス名を持つすべての要素で処理
            for(let i = 0; i < parentEleNum; i++){
	           //要素内の全HTMLを取得
	           let originalHtml = parentEle[i].innerHTML;
	           //HTML内にあるyoutubeの動画URLをすべて埋め込みiframeのコードに置換
	           let newHtml = ag2changeToEmbed(originalHtml);
	           //置換処理したHTMLでparentEleの中身を書き換え
	           parentEle[i].innerHTML = newHtml;
            }
        }
    };
};

$(document).on('click', '.pagination a', function() {
　val = $(this).attr("href");
	if (val === 'youtu')
	{
		selectText.value = val;
		goButton.click();	
	}
	else
	{
		console.log('Youtube Please.');
	}
});
