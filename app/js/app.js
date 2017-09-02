$(document).ready(function(){
	$("#StartSelection").on("click", onStartSelection);
	$("#Hat").on("click", onStartHouseholdSelection);
});

var Households = { 
"numberSorcerer":0 
,"maxPerHouse":0 
,"nbSwitch":0 
,"nextHouse":"Gryffindor" 
,"selectedHouse":"Gryffindor" 
,"Gryffindor":0 
,"Hufflepuff":0 
,"Ravenclaw":0 
,"Slytherin":0 
};

var timerSwitchSelection = null;

function onStartSelection(){
	$("#AppSetup").addClass("hidden");
	$("#SorcererSelector").removeClass("hidden");

	var valNumberSorcerer = $("#NumberSorcerer").val();
	var numberSorcerer = parseFloat(valNumberSorcerer);
	Households["numberSorcerer"] = numberSorcerer;

	var maxPerHouse = Math.ceil(numberSorcerer / 4.0);
	Households["maxPerHouse"] = maxPerHouse;
}

function onStartHouseholdSelection(){
	$("#Hat").effect( "bounce", {times:3}, 300 );
	timerSwitchSelection = window.setInterval(switchSelectedHousehold, 500);
}

function switchSelectedHousehold(){
	unselectCurrentHousehold();

	var selectedHouse = Households["selectedHouse"];
	var nextHouse = getNexthousehold(selectedHouse);
	Households["nbSwitch"] += 1;
	selectHousehold(nextHouse);

	var nbSwitch = Households["nbSwitch"];
	if(nbSwitch == 5){
		window.clearInterval(timerSwitchSelection);
		selectNextHousehold();
	}
}

function selectHousehold(HouseholdName){
	$("#" + HouseholdName).addClass("selected");
	Households["selectedHouse"] = HouseholdName;
}

function unselectCurrentHousehold(){
	var selectedHouse = Households["selectedHouse"];
	$("#" + selectedHouse).removeClass("selected");
}

function selectNextHousehold(){
	unselectCurrentHousehold();
	Households["nbSwitch"] = 0;
	var isHouseSelected = false;
	while(!isHouseSelected){
		var selected = Math.floor((Math.random() * 4));
		var household = getCorrespondingHousehold(selected);
		if(!isHouseholdFull(household)){
			Households[household] += 1;
			selectHousehold(household);
			isHouseSelected = true;
		}
	}

}

function getCorrespondingHousehold(index){
	if(index == 0) return "Gryffindor";
	else if(index == 1) return "Hufflepuff";
	else if(index == 2) return "Ravenclaw";
	else if(index == 3) return "Slytherin";
	else return "Gryffindor";
}

function getNexthousehold(HouseholdName){
	if(HouseholdName == "Gryffindor") return "Hufflepuff";
	else if(HouseholdName == "Hufflepuff") return "Ravenclaw";
	else if(HouseholdName == "Ravenclaw") return "Slytherin";
	else if(HouseholdName == "Slytherin") return "Gryffindor";
}

function isHouseholdFull(HouseholdName){
	var maxPerHouse = Households["maxPerHouse"];
	var nbPlaced = Households[HouseholdName];

	if(nbPlaced < maxPerHouse) return false;
	return true;
}
