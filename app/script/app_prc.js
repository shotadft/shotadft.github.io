let use_language = window.navigator.language;
var language_money = 'undefined';
var freeprice_text = 'Free';

if (use_language === 'ja-JP' || use_language === 'ja')
{
	language_money = '\xA5';
	freeprice_text = '無料';
}
else if (use_language === 'zh' || use_language === 'zh-Hans' || use_language === 'zh-SG' || use_language === 'zh-CN' || use_language === 'zh-Hant' || use_language === 'zh-HK' || use_language === 'zh-TW' || use_language === 'zh-MO')
{
	language_money = '元';
	freeprice_text = '免费';
}
else
{
	language_money = '\x24';
	freeprice_text = 'Free';
}

export function Price(Divided, Price_n){
	document.addEventListener("DOMContentLoaded", function() {
    	this.Price_n = Price_n;
    	this.Divided = Divided;
    	const replyDivided = document.getElementById(this.Divided);
    
    	var paragraph = document.createElement('p');
	if (this.Price_n === 0) 
	{
    		if (use_language === 'zh' || use_language === 'zh-Hans' || use_language === 'zh-SG' || use_language === 'zh-CN' || use_language === 'zh-Hant' || use_language === 'zh-HK' || use_language === 'zh-TW' || use_language === 'zh-MO')
    		{
			paragraph.innerText = Price_n + '(' + freeprice_text + ')' + language_money;
    		}
    		else
    		{
			paragraph.innerText = language_money + Price_n + '(' + freeprice_text + ')';
    		}
	}
	else{
    		if (use_language === 'zh' || use_language === 'zh-Hans' || use_language === 'zh-SG' || use_language === 'zh-CN' || use_language === 'zh-Hant' || use_language === 'zh-HK' || use_language === 'zh-TW' || use_language === 'zh-MO')
    		{
			paragraph.innerText = Price_n + language_money;
    		}
    		else
    		{
			paragraph.innerText = language_money + Price_n;
    		}
	}
    	replyDivided.appendChild(paragraph);
	});
}
