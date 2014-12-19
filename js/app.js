$(document).ready(function(){

	init();
	$('#photos-container').hide();
	$('#titles').delay(55000).fadeOut();
	$('#intro').delay(55200).slideUp(400,function(){
		$('#photos-container').show();
		//processPhotos();
	});

	//processPhotos();
});

$.fn.extend({
	animateIn: function(randIn){
		var random = randIn || 0;
		var value = random <= 0.333333 ? 0 : random <= 0.666666 ? 1 : 2;
		return this.each(function(){
			return 0 == value ? $(this).fadeIn() : 1 == value ? $(this).slideDown() : $(this).animate( { height: "show" }, 400, 'easeOutQuint' );
		});
	},
	animateOut: function(randOut){
		var random = randOut || 0;
		var value = random <= 0.333333 ? 0 : random <= 0.666666 ? 1 : 2;
		return this.each(function(){
			return 0 == value ? $(this).fadeOut() : 1 == value ? $(this).slideUp() : $(this).animate( { height: "hide" }, 400, 'easeInQuint' );
		});
	}
});

function init(){
	var divWidth = $('#titles').innerWidth();
	$(".intro-image img").load(function() {
		 alert($(this).width());
	});

}

function processPhotos(){
	$.ajax({
		type: 'POST',
		url: 'json/data.json',
		success: function(response){
			insertPhotos(response.images);
			animatePhotos(response.images);
			
		}
	});
}

function insertPhotos(response){
	for (var i = 0; i < response.length; i++) {
		var element = response[i];
		element.id = i+1;
		if (0 == i) 
			element.firstDelay = 0;
		else if (1 == i)
			element.firstDelay = (response[i-1].firstDelay*1 + response[i-1].delay*1 + 400)*1;
		else
			element.firstDelay = (response[i-1].firstDelay*1 + response[i-1].delay*1 + 400*2)*1;
		
		$('<div class="photo" id="photo-' + element.id +'"><img src="' + element.url + '"></div>').appendTo('#photos-container');
	}
}


function animatePhotos(response){
	
	var randOut = Math.random() > 0.5 ? 1 : 0;
	
	for (var i = 0; i < response.length; i++) {
		var randIn = randOut;
		var photo = response[i];
		var element = $('#photo-'+photo.id);
		
		randOut = Math.random();
		
		if (0 == i)
			element.show().delay(photo.delay).animateOut(randOut);
		else if (response.length-1 == i)
			element.delay(photo.firstDelay).animateIn(randIn);	
		else
			element.delay(photo.firstDelay).animateIn(randIn).delay(photo.delay).animateOut(randOut);
		
	}
}