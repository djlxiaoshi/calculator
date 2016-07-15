var params={
		opFlag:false,
		dotAdmit:false,
		pause:false
	}
	
	function idDom(id){
		return document.getElementById(id);
	}

	// 得到显示窗口
	var showResult=idDom("result");

	function inputNum(num){
		if (params.pause){
			clearZero();
			params.pause=false;
		}
		showResult.innerText+=num;		
		params.flag=true;
		params.dotAdmit=true;

		play(num);
	}

	function operate(operator){
		if(params.pause)params.pause=false;
		if (params.flag) {
			showResult.innerText+=operator;
			params.flag=false;
			params.dotAdmit=false;
			play("operate");
		}else{
			return 
		}
	}

	function clearZero(){
		showResult.innerText="";
		play("delete");
	}

	function del(){
		var resultLen=showResult.innerText.length;
		showResult.innerText=showResult.innerText.slice(0,-1);
		play("delete");
	}

	function equal(){
		var result='';
		try{
			result=eval(showResult.innerText)
		}catch (error){
			showResult.innerText="error! please input correctly again"
			return
		}

		if (result==="undefined") return;  //不输出  比如什么都不按直接按下等于号
		showResult.innerText=result;
		params.pause=true;
		params.dotAdmit=false;//禁止继续输入小数点

		play("operate");

	}

	function dot(){
		
		var regExp=/[0-9]*\.[0-9]*\./g;

		if (params.dotAdmit) {
			if(regExp.test(showResult.innerText+"."))return
			showResult.innerText+=".";
			params.flag=false;
			params.dotAdmit=false;

			play("delete");
		}else{
			return
		}
	}

	function play(index){
		var audioDom=document.createElement("audio");
		audioDom.src="music/"+index+".wav";

		audioDom.oncanplaythrough=function(){
			audioDom.play();
		}
	}
