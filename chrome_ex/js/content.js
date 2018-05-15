/**
 * Kyiyo Bangla Dictionary for Chrome extenstion
 */

var html ; 

function getSelected() {
    if (window.getSelection) {
    	return window.getSelection().toString();   
    }
    else if (document.getSelection) {
      	return document.getSelection();
    }
    else {
        var selection = document.selection && document.selection.createRange();
        if (selection.text) {
            return selection.text;
        }
        return false;
    }
    return false;
}




function notifyJquery(msg, delay) {

      $("#right_title_khiyo").html("Khyio Dictionary");
      $("#right_message_khiyo").html(msg);
      html.animate({
            width: 'toggle'
      }).delay(delay).animate({
            width: 'toggle'
      }).delay(delay);
      
      //html.fadeIn(400).delay(delay).fadeOut(400);
      
}


jQuery(document).ready(function($) {
	
	//askPermission();
	//notifyMe();
  html = $("<div id='notification_khiyo'>")
  html.css({
            'display': 'none',
            'position': 'fixed',
            'bottom': '10px',
            'background-color' : '#455A64',
            'right': '10px',
            'height': '95px',
            'width': '319px',  
            'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', 
            'z-index' : '999' 
  });

  html.append("<div id='left_logo_khiyo'>");
  html.append("<div id='right_message_khiyo'>");
  html.append("<div id='right_title_khiyo'>");
  $("body").append(html);
	$('body').dblclick(function() {

	    var selection = getSelected();
      $.get('https://hidden-beyond-74018.herokuapp.com/dict/'+selection, function(data) {
      	if(data.word){
      		//notifyMe(data.word);
          notifyJquery(data.word, 3000);
      	} else {
          notifyJquery("জানি না", 3000);
      	}
      });   
	});

  

});
