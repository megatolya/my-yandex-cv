function toCvSize(){
	$('#to-cv').width('50%').css('left',($(document).width()-$('#to-cv').width())/2).css('top',($(document).height()-$('#to-cv').height())/2);
}
function menuResize(){
	var sumWidth=0;
	$('.menu a').each(function(k,obj){
		count=k;
	});
	$('.menu a').css('width',$('.menu').parent().width()/count/2);
}
//
function toCv(time){
	$('#to-cv').animate({
		opacity:0
	},500,function(){
		$('.pre-cv').slideUp(time,function(){
			$('body,html').css('overflow','auto');
			$('.pre-cv').remove();
			$.cookie('start','skip')
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
$(document).ready(function(){

	//меняем цвет букве я
	$('#ya').hover(function(){
		changeColor('#ya');
	});
	setTimeout(function(){
		setInterval(function(){
			changeColor('#ya');

		},5000);
	},10000);

	toCvSize();
	menuResize();
	//toCv(0);
	if($.cookie('start')=='skip'){
		$('body,html').css('overflow','auto');
			$('.pre-cv').remove();
	}

	$('.menu a').click(function(event){
		event.preventDefault();
		$('.menu a').removeClass('active');
		$(this).addClass('active');
	});
});
$(window).resize(function(){
	toCvSize();
	menuResize();
});