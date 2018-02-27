$(document).ready(function(){
	var defaultHtm = 'data/home.htm';
	loadHtm(2500,defaultHtm);
    
    $( "[go-to]" ).each(function() {
    		var refer = $(this).attr( "go-to" );
    		$( this ).load('../img/svg/'+ refer +'.svg');
		});
    $("[go-to]").click(function(){
    	$( "[go-to]" ).each(function() {
    		var ref = $(this).attr( "go-to" );
  			$( this ).css({height: '60px'});
  			$( this ).removeClass();
		});
		$(this).animate({height: '80px'},100);
		$(this).addClass("active");
    	var htmName = $(this).attr( "go-to" );
    	var name = htmName;
    	if (htmName == "quick") {
     		name = 'Quick Modes';
     	};
    	var htm = 'data/' + htmName + ".htm";
    	$(".header").html(name);
    	loadHtm(1500,htm,2);

	});
     $("[open-this]").click(function(){
     	var htMName = $(this).attr("open-this");
		var htM = 'data/' + htMName + ".htm";
		$('#controllerContent').load(htM,openController);
     });

     $("#downIcon").click(function(){
     	
     });
});

function loadHtm(time,htm,z) {
	if (z === undefined || z == null || z.length <= 0) {
		z = 4;
	};
	$(".loader-container").css({display: 'block',zIndex: z});
	$('#content').load(htm);
	setTimeout(function(){
		$(".loader-container").fadeOut("slow",displayNone);
  		
	}, time);
}

function displayNone() {
	$(this).css('display','none');
}

function openController() {
	$(".controller-section").animate({top: '0px'},750);
}
function closeController() {
	$(".controller-section").animate({top: '100vh'},750);
}

function hideHeader() {
	$("#closeController").animate({top:'-60px'});
}

function showHeader() {
	$("#closeController").animate({top:'0'});
}