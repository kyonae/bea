$(document).ready(function(){
//	$(function(){
//	    $('.fadein img:gt(0)').hide();
//	    
//	    $('.fadein :first-child').slideUp(800).delay(800);
//	});
	$('div').hide();
	$( "div.first" ).fadeIn( 400 ).delay(1000).slideUp(300);
	$('div.second').delay(1700).animate( { height: "toggle" }, 2000, "easeOutBounce" );
});