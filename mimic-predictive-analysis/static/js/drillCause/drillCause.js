
// This here is for cleaning up numbers to display better in the metadata panel, it adds commas
// to the resulting numbers to make them easier to read
var nf = new Intl.NumberFormat();

// Use D3 to select the hidden html element containing the desired state to display first
var initialStartYear = d3.select("#hiddenDrillStart").attr("value");
var initialEndYear = d3.select("#hiddenDrillEnd").attr("value");
var initialCause = d3.select("#hiddenDrillCause").attr("value");

var selectorStartYear = d3.select("#selStartYear");
var selectorEndYear = d3.select("#selEndYear");
var selectorCause = d3.select("#selCause");

// Create a set of variables to hold the start year, end year and state variables on changes to dropdowns

var currentStartYear = initialStartYear;
var currentEndYear = initialEndYear;
var currentCause = initialCause;

// Create the functions to run if the dropdown menus are changed in order to build the URL for changing
// the year range or state

selectorStartYear.on("change", function() {
    var value = d3.event.target.value;
    currentStartYear = value;
    console.log(currentStartYear);
});

selectorEndYear.on("change", function() {
    var value = d3.event.target.value;
    currentEndYear = value;
    console.log(currentEndYear);
});

selectorCause.on("change", function() {
    var value = d3.event.target.value;
    currentCause = value;
    console.log(currentCause);
});

// Create a click function that builds a page url and then refreshes the page to that url

function refreshDrillPage() {
    if (parseInt(currentEndYear) < parseInt(currentStartYear)) {
        alert("Error: Start / End year range is invalid, please ensure that the starting year is less than " +
        "the ending year.")
    }
    else {
    var queryURL = `https://leading-causes-of-death.herokuapp.com/drillCause/start=${currentStartYear}/end=${currentEndYear}/cause=${currentCause}`;
    window.location.assign(queryURL);
    }
};

// Create a function that dynamically adds all years and states to the three dropdown selectors so that 
// users can filter between start dates, end dates and states

function drillOptionSelector() {

    // Select all three selector elements so they can be referenced
    var startSelector = d3.select("#selStartYear");
    var endSelector = d3.select("#selEndYear");
    var causeSelector = d3.select("#selCause");

    // Populate both year selectors with the full range of available dates
    var yearArray = [];
    for (var i = 1999; i <= 2016; i++) {
        yearArray.push(i);
    }

    yearArray.forEach(year => {
        if (year === parseInt(initialStartYear)) {
            startSelector.append("option")
                .attr("value",`${year}`)
                .property("selected",true)
                .text(`${year}`);
        }
        else {
            startSelector.append("option")
                .attr("value",`${year}`)
                .text(`${year}`);
        }

        if (year === parseInt(initialEndYear)) {
            endSelector.append("option")
                .attr("value",`${year}`)
                .property("selected",true)
                .text(`${year}`);
        }
        else {
            endSelector.append("option")
                .attr("value",`${year}`)
                .text(`${year}`);
        }
    });

    // Use array of states as strings to loop through and populate the state selector dropdown

    var causeArray = [
        {cause:"Alzheimer's disease", name:"Alzheimer's"},
        {cause:"Cancer", name:"Cancer"},
        {cause:"CLRD", name:"CLRD"},
        {cause:"Diabetes", name:"Diabetes"},
        {cause:"Heart disease", name:"Heart Disease"},
        {cause:"Influenza and pneumonia", name:"Influenza"},
        {cause:"Kidney disease", name:"Kidney Disease"},
        {cause:"Stroke", name:"Stroke"},
        {cause:"Suicide", name:"Suicide"},
        {cause:"Unintentional injuries", name:"Accidents"}
    ];

    causeArray.forEach(object => {
        var addedCause = causeSelector.append("option")
            .attr("value",`${object.cause}`)
            .text(`${object.name}`)
        
        if(object.cause === initialCause) {
            addedCause.property("selected",true);
        }
    });

};


// Create a predifined boolean array for detecting which traces in the line plotly should be generated

var stateDrop0 = d3.select("#stateDrop0");
var stateDrop1 = d3.select("#stateDrop1");
var stateDrop2 = d3.select("#stateDrop2");
var stateDrop3 = d3.select("#stateDrop3");
var stateDrop4 = d3.select("#stateDrop4");
var stateDrop5 = d3.select("#stateDrop5");
var stateDrop6 = d3.select("#stateDrop6");
var stateDrop7 = d3.select("#stateDrop7");
var stateDrop8 = d3.select("#stateDrop8");
var stateDrop9 = d3.select("#stateDrop9");

var allStateSelectors = [stateDrop0,stateDrop1,stateDrop2,stateDrop3,stateDrop4,stateDrop5,stateDrop6,
    stateDrop7,stateDrop8,stateDrop9];

var allStateSelectorStrings = ["stateDrop0","stateDrop1","stateDrop2","stateDrop3","stateDrop4","stateDrop5",
    "stateDrop6","stateDrop7","stateDrop8","stateDrop9"];

var boolArray = [true,true,true,true,true,true,true,true,true,true];

// This array starts empty, being that no options for the selectors exist yet, but it will be populated via
// function
var stateArray = [];

// Function for returning only unique items into an array, to ensure that no states duplicate in randomization
Array.prototype.unique = function() {
    return this.filter(function (value, index, self) { 
      return self.indexOf(value) === index;
    });
  }

// This function populates stateArray with a series of strings to give something to plotly on initialization
function firstStateArray(array) {
    while(stateArray.length < 10) {
        var randNum = Math.floor((Math.random() * 50) + 1);
        stateArray.push(array[randNum]);
        stateArray = stateArray.unique();
    }
};

function allDropdownsPopulator(sample) {
    d3.json(`https://leading-causes-of-death.herokuapp.com/data/allstates`).then(array => {

        firstStateArray(array);

        for (i = 0; i < 10; i++) {
            allStateSelectors[i].append("option")
                .attr("value","noValue")
                .text("No State")
            array.forEach(state => {
                if (state === "District of Columbia") {
                    if (state === stateArray[i]) {
                        allStateSelectors[i].append("option")
                            .attr("Value", `${state}`)
                            .text("Wash. D.C.")
                            .property("selected",true);
                    }
                    else {
                        allStateSelectors[i].append("option")
                            .attr("Value", `${state}`)
                            .text("Wash. D.C.");
                    }
                }
                else{
                if (state === stateArray[i]){
                    allStateSelectors[i].append("option")
                        .attr("Value",`${state}`)
                        .text(`${state}`)
                        .property("selected",true);
                }
                else {
                    allStateSelectors[i].append("option")
                        .attr("Value",`${state}`)
                        .text(`${state}`)
                }
            }
            })
        }

        // For this code, the buildLine function from plotly is run in this function to ensure that
        // the first state array is available for generation
        buildLine(sample, stateArray, boolArray);
    }); // d3.json close
}; // Function close

var sampleHolder;

// Create initializer function that takes the previous functions and the plotly functions and inputs
// the desired Flask route call to retrieve all data to be injected into the functions
function initializer(startYear = "1999", endYear = "2016", cause = "Cancer") {

    d3.json(`https://leading-causes-of-death.herokuapp.com/data/start=${startYear}/end=${endYear}/cause=${cause}`).then(sample => {

        // Populate the selectors for the drill page with the years and states
        drillOptionSelector();

        // Populate the plotly selectors with all states
        allDropdownsPopulator(sample);

        // @TODO:
        // Add the Tree Map function, using whatever library we intend to that generates the tree map
        // plantTree(sample, startYear, endYear, state);
        //drawChart(sample, function() {console.log('finished callback')});
        drawTree(sample, function() {console.log('finished callback')});
        // Save sample outside of the json call

        sampleHolder = sample;

    });
};

function onDropdownChange(object) {
    
    for(i = 0; i < 10; i++) {
        if(object.value != "noValue") {
            if(object.id === allStateSelectorStrings[i]) {
                stateArray[i] = object.value;
            }
            if(object.id === allStateSelectorStrings[i]) {
                boolArray[i] = true;
            }
        }
        else {
            if(object.id === allStateSelectorStrings[i]) {
                boolArray[i] = false;
            }
        }
    }

    buildLine(sampleHolder, stateArray, boolArray);
    
};

initializer(initialStartYear,initialEndYear,initialCause);