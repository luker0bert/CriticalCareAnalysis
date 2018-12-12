
// This here is for cleaning up numbers to display better in the metadata panel, it adds commas
// to the resulting numbers to make them easier to read
var nf = new Intl.NumberFormat();

// Use D3 to select the hidden html element containing the desired state to display first
var initialStartYear = d3.select("#hiddenDrillStart").attr("value");
var initialEndYear = d3.select("#hiddenDrillEnd").attr("value");
var initialState = d3.select("#hiddenDrillState").attr("value");

var selectorStartYear = d3.select("#selStartYear");
var selectorEndYear = d3.select("#selEndYear");
var selectorState = d3.select("#selState");

// Create a set of variables to hold the start year, end year and state variables on changes to dropdowns

var currentStartYear = initialStartYear;
var currentEndYear = initialEndYear;
var currentState = initialState;

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

selectorState.on("change", function() {
    var value = d3.event.target.value;
    currentState = value;
    console.log(currentState);
});

// Create a click function that builds a page url and then refreshes the page to that url

function refreshDrillPage() {
    if (parseInt(currentEndYear) < parseInt(currentStartYear)) {
        alert("Error: Start / End year range is invalid, please ensure that the starting year is less than " +
        "the ending year.")
    }
    else {
    var queryURL = `https://leading-causes-of-death.herokuapp.com/drill/start=${currentStartYear}/end=${currentEndYear}/state=${currentState}`;
    window.location.assign(queryURL);
    }
};

// Set function to populate the metadata section with relevant information

function buildMeta(sample, startYear, endYear, state) {

    var metaPanel = d3.select("#sample-metadata");

    metaPanel.html("");

    // Variables to hold each individual cause of death category so that it can be averaged for
    // display in the metadata table
    var all_causes = sample.filter(item => item.cause === "All causes");
    var alzheimer = sample.filter(item => item.cause === "Alzheimer's disease");
    var cancer = sample.filter(item => item.cause === "Cancer");
    var CLRD = sample.filter(item => item.cause === "CLRD");
    var diabetes = sample.filter(item => item.cause === "Diabetes");
    var heart_disease = sample.filter(item => item.cause === "Heart disease");
    var influenza = sample.filter(item => item.cause === "Influenza and pneumonia");
    var kidney_disease = sample.filter(item => item.cause === "Kidney disease");
    var stroke = sample.filter(item => item.cause === "Stroke");
    var suicide = sample.filter(item => item.cause === "Suicide");
    var accidents = sample.filter(item => item.cause === "Unintentional injuries");

    // Array containing all of the above so it can be quickly appended in the HTML
    var all_causes = [all_causes,alzheimer,cancer,CLRD,diabetes,heart_disease,influenza,
    kidney_disease,stroke,suicide,accidents];

    // Append paragraph items that display the state, start year and end year of the data; unless
    // there is only one year, in which case it displays the single year

    metaPanel.append("p")
        .html(`<strong>State:</strong> ${state}`)
        
    if (startYear === endYear) {
        metaPanel.append("p")
        .html(`<strong>Year:</strong> ${endYear}`)
    }
    else {
        metaPanel.append("p")
        .html(`<strong>Year Range:</strong> ${startYear} - ${endYear}`)
    }

    // Loop through the array, average the number of deaths and then append a paragraph tag to
    // the metadata panel

    all_causes.forEach((cause) => {

        var deaths = cause.map(year => year.deaths);

        var average = Math.round(math.mean(deaths));

        var clean_avg = nf.format(average);

        metaPanel.append("p")
            .html(`<strong>${cause[0].cause}:</strong> ${clean_avg}`);

    });

};

// Create a function that dynamically adds all years and states to the three dropdown selectors so that 
// users can filter between start dates, end dates and states

function drillOptionSelector() {

    // Select all three selector elements so they can be referenced
    var startSelector = d3.select("#selStartYear");
    var endSelector = d3.select("#selEndYear");
    var stateSelector = d3.select("#selState");

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

    var stateArray = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    stateArray.forEach(state => {
        if (state === "District of Columbia") {
            var addedState = stateSelector.append("option")
                .attr("value",`${state}`)
                .attr("onchange","newState(this.value)")
                .text("Wash. D.C.")
        }
        else {
            var addedState = stateSelector.append("option")
                .attr("value",`${state}`)
                .attr("onchange","newState(this.value)")
                .text(`${state}`);
        }
        if(state === initialState) {
            addedState.property("selected",true);
        }
    });

};


// Create a predifined boolean array for detecting which traces in the line plotly should be generated
var boolArray = [
    {bool: true, cause:"alzheimer"},
    {bool: true, cause:"cancer"},
    {bool: true, cause:"CLRD"},
    {bool: true, cause:"diabetes"},
    {bool: true, cause:"heart_disease"},
    {bool: true, cause:"influenza"},
    {bool: true, cause:"kidney_disease"},
    {bool: true, cause:"stroke"},
    {bool: true, cause:"suicide"},
    {bool: true, cause:"accidents"},];

var sampleHolder;

// Create initializer function that takes the previous functions and the plotly functions and inputs
// the desired Flask route call to retrieve all data to be injected into the functions
function initializer(startYear = "1999", endYear = "2016", state = "Alabama") {

    d3.json(`https://leading-causes-of-death.herokuapp.com/data/start=${startYear}/end=${endYear}/state=${state}`).then(sample => {

        // Populate the selectors for the drill page with the years and states
        drillOptionSelector();

        // Build the metadata table here
        buildMeta(sample, startYear, endYear, state);

        // Add Plotly function that takes in above sample data and generates a scatterplot chart
        buildLine(sample, boolArray);

        // @TODO:
        // Add the Tree Map function, using whatever library we intend to that generates the tree map
        // plantTree(sample, startYear, endYear, state);
        drawChart(sample, function() {console.log('finished callback')});
        // Populate the tree map selector with all years returned

        // Save sample outside of the json call

        sampleHolder = sample;

    });
};

function onCheckboxer(object) {
    boolArray.forEach(item => {
        if(item.cause === object.value) {
            item.bool = object.checked;
        }
    })
    buildLine(sampleHolder, boolArray);
};

function removeChecks() {
    d3.selectAll('input').property('checked',false);
    boolArray.forEach(item => {
        item.bool = false;
    })
    buildLine(sampleHolder, boolArray);
}

function returnChecks() {
    d3.selectAll('input').property('checked',true);
    boolArray.forEach(item => {
        item.bool = true;
    })
    buildLine(sampleHolder, boolArray);
}

initializer(initialStartYear,initialEndYear,initialState);