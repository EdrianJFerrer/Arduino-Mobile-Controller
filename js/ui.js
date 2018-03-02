

$( ".active-bar > a:eq(2)" ).click(function() {
        $("[go-to=connect]").click();
    });
$( "[go-to=connect]" ).click(function() {
  setTimeout(function(){
   app.initialize();  
  }, 1000);
         
    });

$( "[open-this=terminal],[data-link=terminal]" ).click(function() {
  setTimeout(function(){
   terminal.bindEvents();  
  }, 1000);
         
    });

$( ".prlist" ).click(function() {
  setTimeout(function(){
   prbutton.bindEvents();  
  }, 1000);
         
    });

$(".prlist").click(function(){
        $( ".active-bar > a:eq(1)" ).html(prname);
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
function connectNow() {
    closeController();
    $("[go-to=connect]").click();
}
function hideHeader() {
	$("#closeController").animate({top:'-60px'});
}

function showHeader() {
	$("#closeController").animate({top:'0'});
}


var typingTimer;                //timer identifier
var doneTypingInterval = 2000;  //time in ms, 5 second for example


//on keyup, start the countdown
function notTyping() {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
};

//on keydown, clear the countdown 
function typing() {
  clearTimeout(typingTimer);
  $(".typing").css("opacity","1");
  $(".typing").removeClass("terminal-received");
  $(".typing").addClass("terminal-sent");
};

//user is "finished typing," do something
function doneTyping () {
  $(".typing").removeClass("terminal-sent");
  $(".typing").addClass("terminal-received");
   $(".typing").css("opacity","0");
  
}


//for filter bluetooth devices
function searchBT() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchBT');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listBT");
    li = ul.getElementsByClassName('BTlist');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function browseProjects() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('browsePr');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listPr");
    li = ul.getElementsByClassName('prlist');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
$(document).ready(function(){
  var defaultHtm = 'data/home.htm';
  loadHtm(2500,defaultHtm);
    
    $( "[go-to]" ).each(function() {
        var refer = $(this).attr( "go-to" );
        $( this ).load('img/svg/'+ refer +'.svg');
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

     
});