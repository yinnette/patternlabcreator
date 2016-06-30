var fire = new Firebase("https://patternlabcreator.firebaseio.com/");

$(document).ready(function() {

	

	elementsMenu(),
	canvasDisplay();
	elementActions();
	loadData();

});

function loadData() {
	fire.once("value", function(snapshot) {
	 
		snapshot.forEach(function(child) {

		 	var k = child.key(); 

			child.forEach(function(childSnapshot) {
				
				var key = childSnapshot.key();
				var childData = childSnapshot.val();

				$('#elementsMenu li #'+k+'').append('<li class="element-item element-item-'+k+'" data-parent="'+k+'"><a class="added-element added-element-'+k+'" contenteditable="true">'+childData["name"]+'</a><a data-target=".element-list-item-'+k+'" class="btn-delete"></a></li>'); 

				console.log(childData["name"]);
				$('.added-element').blur(onAddedElementBlur);


			});	
		});
	});
}




function getStyleObject() {
	var dom = this.get(0);
	var style;
	var returns = {};
	if(window.getComputedStyle){
	    var camelize = function(a,b){
	        return b.toUpperCase();
	    }
	    style = window.getComputedStyle(dom, null);
	    for(var i=0;i<style.length;i++){
	        var prop = style[i];
	        var camel = prop.replace(/\-([a-z])/g, camelize);
	        var val = style.getPropertyValue(prop);
	        returns[camel] = val;
	    }
	    return returns;
	}
	if(dom.currentStyle){
	    style = dom.currentStyle;
	    for(var prop in style){
	        returns[prop] = style[prop];
	    }
	    return returns;
	}
	return this.css();
}
    


function elementsMenu() {

	$('#elementsMenu > li').each(function(){

		var option = $(this).children('a');
		var name = option.text().toLowerCase();


		option.attr('href', '#'+name+'');
		$(this).append('<a id="add-'+name+'" for="'+name+'" class="btn-add"></a><ul id="'+name+'"></ul>')

		option.click(function(){
			$(this).parent('li').siblings().children('a').removeClass('active');
			$(this).addClass('active');
		});

	})
}


function canvasDisplay(){
	var item = $(".display-element"),
		canvas = $('.canvas'),
		canvasWidth = canvas.width() / 2,
		canvasHeight = canvas.height() / 2, 
		elementHeight = item.height() / 2, 
		elementWidth = item.width() / 2,
		top = canvasHeight - elementHeight,
		left = canvasWidth - elementWidth;

		item.css('top', ''+top+'px').css('left', ''+left+'px');
}



function elementActions(){

	$('.btn-add').each(function(){
		var list = $(this).next('ul'); 
		var name = $(this).attr('for');
		$(this).click(function(){
			list.append('<li class="element-item element-item-'+name+'" data-parent="'+name+'"><a class="added-element added-element-'+name+'" contenteditable="true">New '+name+'</a><a data-target=".element-list-item-'+name+'" class="btn-delete"></a></li>'); 
			$('.added-element').blur(onAddedElementBlur);
		});
	}); 

	$('.btn-delete').click(function(){
		var e = $(this).attr('data-target'); 

			e.remove();

	}); 


}

function onAddedElementBlur() {
	var name = $(this).parent().attr('data-parent');
	var i = $(this).index() + 1; 
	var data = {}; 

	$('#'+name).children('li').each(function(i) {
		data[name+i] = {
			name : $(this).children('a').text(), 
			color: '#ff0000'
		}
	}); 		

	fire.child(name).update(data);

}




