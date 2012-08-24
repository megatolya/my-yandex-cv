//ресайз кнопки на старте
function toCvSize(){
	$('#to-cv').width('50%').css('left',($(window).width()-$('#to-cv').width())/2).css('top',($(window).height()-$('#to-cv').height())/2);
}

//переход от старта к резюме
function toCv(time){
	$('.to-cv-tip').animate({
		left:$(window).width(),
		opacity:0.1,

	},time);
	clearInterval(hiddenPhrase);
	$('#to-cv').animate({
		opacity:0
	},time,function(){
		$('.pre-cv').slideUp(time,function(){
			$('body,html').css('overflow','auto');
			$('.pre-cv').remove();
			$.cookie('start','skip');
			//если не работают куки заносим в хеш
			if($.cookie('start')!='skip'){
				document.location.hash='opened';	
			}
			setInterval(function(){
				changeColor('#ya');
			},5000);
		});	
	});
	
}
//меняет цвет, взяв его из массива
function changeColor(selector){
	var	obj=$(selector), colors=[
									'#f00',
									'#ff0',
									'#f0f',
									'#0f0',
									'yellow',
									'gray'
								];
	obj.css('color',colors[Math.floor(Math.random()*colors.length)]);
}

//меняет таб и контент
function changeContent(obj){
	$('.menu a').removeClass('active');
	$(obj).addClass('active');

	$('.content>div').hide();
	$($(obj).attr('href')).show();
	
}
$(document).keydown(function(e){
	if(e.keyCode==40 || e.keyCode==13){
		toCv(300);
	}
});
$(document).ready(function(){
	
	//по умолчанию вкладка я
	$('.content>div').hide();
	$('#me').show();

	//меню и контент
	$('.menu a').click(function(e){

		e.preventDefault();
		changeContent(this);
	});

	//скрытая фраза вначале
	hiddenPhrase=setInterval(function(){
		$('.pre-cv').prepend('<div class="hidden-phrase">Хочу в Яндекс :-)</div>');
		var left =Math.floor( Math.random()*parseInt($(document).width()) )-$('.hidden-phrase').width();
		var top =Math.floor( Math.random()*parseInt($(document).height()) )-$('.hidden-phrase').height();
		changeColor('.hidden-phrase');
		$('.hidden-phrase').css('left',left).css('top',top);
		setTimeout(function(){
			$('.hidden-phrase').remove();
		},300);
	},1800);

	toCvSize();
	

	//меняем цвет букве я
	$('#ya').hover(function(){
		changeColor('#ya');
	});
	
	//если работают куки, то стартовая кнопка видна только один раз
	if($.cookie('start')=='skip' || document.location.hash=='opened' || document.location.hash=='#opened'){
		setInterval(function(){
				changeColor('#ya');
			},5000);
		clearInterval(hiddenPhrase);
		$('body,html').css('overflow','auto');
			$('.pre-cv').remove();
	}
});
//ресайзы
$(window).resize(function(){
	toCvSize();
	
});