const images_src = [
						{
							src_name: "images/blue_spotter.png",
							points: 2, 
							message: "You Spotted the blue spotter. you get 2 points", 
							fgcolor: "rgb(0,0,200)"
						},
						{
							src_name: "images/green_spotter.png",
							points: 4, 
							message: "You Spotted the green spotter. you get 4 points", 
							fgcolor: "rgb(0,200,0)"
						},
						{
							src_name: "images/red_spotter.png",
							points: 3, 
							message: "You Spotted the red spotter. you get 3 points", 
							fgcolor: "rgb(200,0,0)"
						},
						{
							src_name: "images/orange_spotter.png",
							points: 1, 
							message: "You Spotted the orange spotter. you get 1 point", 
							fgcolor: "orange"
						}
					];
const extra_properties = [
							{
								src_name: "images/oneExtra.png",
								extraLives: 1,
								message: "You get 1 extra attempts", 
								fgcolor: "rgb(0,150,0)"
							},
							{
								src_name: "images/twoExtra.png",
								extraLives: 2,
								message: "You get 2 extra attempts", 
								fgcolor: "rgb(0,150,0)"
							},
							{
								src_name: "images/oneMinus.png",
								extraLives: -1,
								message: "You have lost 1 attempt", 
								fgcolor: "rgb(200,0,0)"
							},
							{
								src_name: "images/loseAll.png",
								extraLives: 0,
								message: "Sorry, all your attempts have been depleted", 
								fgcolor: "rgb(200,0,0)"
							}
						];
const lose_icon = "images/loseIcon.png";
const assign_status_obj = {
								setInnerHtml: "innerHtml",
								setImgSrc: "imgSrc"
							};
var game_elements = [
						{
							game_element_name: "num_lives_id",
							game_element_value: 10
						},
						{
							game_element_name: "num_points_id",
							game_element_value: 0
						}
					]
let setHighScore = 0;
var unique_random_values = [];
var default_message = {
						message: "Can you spot the spotter?", 
						fgcolor: "rgb(0,0,250)"
					  }
var setTileClicked = true;
function startup(){
	for(let i = 0 ; i < game_elements.length;i++){
		generate_inner_html(game_elements[i].game_element_name,game_elements[i].game_element_value,assign_status_obj.setInnerHtml);
	}
	generateNewGame();
	generateHighScore();
	console.log(generateUniqueRandomNumbers(4));
	//generateTiles();
}

function generate_inner_html(div_id,div_content,assignStatus){
	switch(assignStatus){
		case assign_status_obj.setInnerHtml:{
			document.getElementById(div_id).innerHTML = div_content;
		}break;
		
		case assign_status_obj.setImgSrc:{
			document.getElementById(div_id).src = div_content;
		}break;
	}
}

function generateHighScore(){
	generate_inner_html("high_Score_id","High Score: "+setHighScore,assign_status_obj.setInnerHtml);
}

function generateUniqueRandomNumbers(number_of_values){
	unique_random_values = [];
	while(unique_random_values.length < number_of_values){
		let unique_random_number = Math.floor(Math.random() * number_of_values) + 1;
		if(unique_random_values.indexOf(unique_random_number) === -1) 
			unique_random_values.push(unique_random_number);
	}
	return unique_random_values;
	
}


function generateNewGame(){
	
	// default tiles
	generateDefaultTiles();
	// default scores
	game_elements[0].game_element_value = 10;
	game_elements[1].game_element_value = 0;
	generate_inner_html(game_elements[0].game_element_name,game_elements[0].game_element_value,assign_status_obj.setInnerHtml);
	generate_inner_html(game_elements[1].game_element_name,game_elements[1].game_element_value,assign_status_obj.setInnerHtml);
	
	generate_message("spotter_inner_wrapper_section_message",default_message.message,default_message.fgcolor)
}

function generateDefaultTiles(){
	for(let i = 0 ; i < 4; i++){
		generate_inner_html("tile_"+(i+1),"images/question_mark_icon.png",assign_status_obj.setImgSrc);
	}
	modalSetting("close","","");
	setTileClicked = true;
}





function generate_message(div_id,message,fgcolor){
	generate_inner_html(div_id,message,assign_status_obj.setInnerHtml);
	document.getElementById(div_id).style.color = fgcolor;
}

 function modalSetting(setOpenStatus,msg,fgcolor){
	switch(setOpenStatus){
		case "close":{
			
			document.getElementById("modal_wrapper_container").style.display = "none";
			
		
		}break;

		case "open":{
			document.getElementById("modal_wrapper_container").style.display = "block";
			generate_message("setMessage",msg,fgcolor);
			if(game_elements[0].game_element_value <= 0){
				generate_inner_html("btn_label_id","Play again",assign_status_obj.setInnerHtml);
			}
			else{
				generate_inner_html("btn_label_id","Continue",assign_status_obj.setInnerHtml);
			}
		}break;
	}
}
function generateRandomNumber(minVal,maxVal){
	return Math.floor(Math.random() * (maxVal-minVal+1) + minVal);
}




function generateTiles(tile_num){
		let position_of_tile_num = 0;
		if(setTileClicked === true){
			console.log(generateUniqueRandomNumbers(4));
			console.log(setTileClicked);
			
			for(let i = 0 ; i < unique_random_values.length;i++){
				if(unique_random_values[i] === tile_num){
					position_of_tile_num = i;
					break;
				}
			}
		}
		switch(position_of_tile_num){
			case 0:{
				if(setTileClicked === true){
					setTileClicked = false;
					generate_inner_html(("tile_"+tile_num),lose_icon,assign_status_obj.setImgSrc);
					game_elements[0].game_element_value--;
					generate_inner_html(game_elements[0].game_element_name,game_elements[0].game_element_value,assign_status_obj.setInnerHtml);
					if(game_elements[0].game_element_value <= 0){
						modalSetting("open","Sorry, all your attempts have been depleted","rgb(200,0,0)");
						checkModalButtonTitle();
						if(setHighScore < document.getElementById("num_points_id").innerHTML){
							setHighScore = document.getElementById("num_points_id").innerHTML;
						}
						
						setTimeout(startup,20000);
					}
					else{
						modalSetting("open","You missed the spotter. try again","rgb(200,0,0)");
						setTimeout(generateDefaultTiles,2000);
						
						
					}
				}
			}break;
				
			case 1:{
				if(setTileClicked === true){
					setTileClicked = false;
					generate_inner_html(("tile_"+tile_num),lose_icon,assign_status_obj.setImgSrc);
					game_elements[0].game_element_value--;
					generate_inner_html(game_elements[0].game_element_name,game_elements[0].game_element_value,assign_status_obj.setInnerHtml);
					if(game_elements[0].game_element_value <= 0){
						modalSetting("open","Sorry, all your attempts have been depleted","rgb(200,0,0)");
						checkModalButtonTitle();
						if(setHighScore < document.getElementById("num_points_id").innerHTML){
							setHighScore = document.getElementById("num_points_id").innerHTML;
						}
						setTimeout(startup,20000);
					}
					else{
						modalSetting("open","You missed the spotter. try again","rgb(200,0,0)");
						setTimeout(generateDefaultTiles,2000);
						
						
					}
				
				}
			}break;
				
			case 2:{
				if(setTileClicked === true){
					setTileClicked = false;
					let element_index = generateRandomNumber(0,100); 
					if((element_index > 0) && (element_index < 50)){
						let property_index = generateRandomNumber(0,(extra_properties.length-1)); 
						generate_inner_html(("tile_"+tile_num),extra_properties[property_index].src_name,assign_status_obj.setImgSrc);
						if(extra_properties[property_index].extraLives === 0){
							game_elements[0].game_element_value = 0;
							generate_inner_html(game_elements[0].game_element_name,game_elements[0].game_element_value,assign_status_obj.setInnerHtml);
							modalSetting("open",extra_properties[property_index].message,extra_properties[property_index].fgcolor);
							checkModalButtonTitle();
							if(setHighScore < document.getElementById("num_points_id").innerHTML){
								setHighScore = document.getElementById("num_points_id").innerHTML;
							}
							setTimeout(startup,20000);
						}
						else{
							game_elements[0].game_element_value += extra_properties[property_index].extraLives;
							generate_inner_html(game_elements[0].game_element_name,game_elements[0].game_element_value,assign_status_obj.setInnerHtml);
							modalSetting("open",extra_properties[property_index].message,extra_properties[property_index].fgcolor);
							setTimeout(generateDefaultTiles,2000);
						}
					}
					
					else{
						let spotter_index = generateRandomNumber(0,(images_src.length-1)); 
						generate_inner_html(("tile_"+tile_num),images_src[spotter_index].src_name,assign_status_obj.setImgSrc);
						game_elements[1].game_element_value += images_src[spotter_index].points;
						generate_inner_html(game_elements[1].game_element_name,game_elements[1].game_element_value,assign_status_obj.setInnerHtml);
						modalSetting("open",images_src[spotter_index].message,images_src[spotter_index].fgcolor);
						setTimeout(generateDefaultTiles,2000);
					}
				}
			}break;
			
			case 3:{
				if(setTileClicked === true){
					setTileClicked = false;
					let element_index = generateRandomNumber(0,100); 
					if((element_index <= 100) && (element_index >= 50)){
						let property_index = generateRandomNumber(0,(extra_properties.length-1)); 
						generate_inner_html(("tile_"+tile_num),extra_properties[property_index].src_name,assign_status_obj.setImgSrc);
						if(extra_properties[property_index].extraLives === 0){
							game_elements[0].game_element_value = 0;
							generate_inner_html(game_elements[0].game_element_name,game_elements[0].game_element_value,assign_status_obj.setInnerHtml);
							modalSetting("open",extra_properties[property_index].message,extra_properties[property_index].fgcolor);
							checkModalButtonTitle();
							if(setHighScore < document.getElementById("num_points_id").innerHTML){
								setHighScore = document.getElementById("num_points_id").innerHTML;
							}
							setTimeout(startup,20000);
							
							
						}
						else{
							game_elements[0].game_element_value += extra_properties[property_index].extraLives;
							modalSetting("open",extra_properties[property_index].message,extra_properties[property_index].fgcolor);
							setTimeout(generateDefaultTiles,2000);
						}
					}
					else{
						let spotter_index = generateRandomNumber(0,(images_src.length-1)); 
						generate_inner_html(("tile_"+tile_num),images_src[spotter_index].src_name,assign_status_obj.setImgSrc);
						game_elements[1].game_element_value += images_src[spotter_index].points;
						generate_inner_html(game_elements[1].game_element_name,game_elements[1].game_element_value,assign_status_obj.setInnerHtml);
						modalSetting("open",images_src[spotter_index].message,images_src[spotter_index].fgcolor);
						setTimeout(generateDefaultTiles,2000);
					}
				}
			}break;
		}
	
}

function checkModalButtonTitle(){
	if (document.getElementById("btn_label_id").innerHTML == "Play again"){
		document.getElementById("btn_label_id").onclick = startup
	}
}


