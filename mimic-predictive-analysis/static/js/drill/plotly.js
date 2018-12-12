
// PURPOSE:
// 1 function to create a scatterplot with 10 traces (one for each cause of death) over time
// 2 function to handle changes
// 3 this might be in jc's js: function to initialize on load?
// 4 this might be in jc's js: function to resize on window change?

// BACKEND TO-DO
// build route of all causes for dropdown for scatter
// build data/<cause> route for query on dropdown selection


// 1 line graph
function buildLine(sample, boolObjects) {

    var boolArray = boolObjects.map(object => object.bool);

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

    var all_causes = [alzheimer,cancer,CLRD,diabetes,heart_disease,influenza,
        kidney_disease,stroke,suicide,accidents];

    var valsForTrace = [
        {cause:"Alzheimer's disease", color:"#2ac4c4", name:"Alzheimer's Disease"},
        {cause:"Cancer", color:"#808080", name:"Cancer"},
        {cause:"CLRD", color:"#19a140", name:"CLRD"},
        {cause:"Diabetes", color:"#0a4b82", name:"Diabetes"},
        {cause:"Heart disease", color:"#a9424a", name:"Heart Disease"},
        {cause:"Influenza and pneumonia", color:"#e89066", name:"Influenza & Pneumonia"},
        {cause:"Kidney disease", color:"#afb507", name:"Kidney Disease"},
        {cause:"Stroke", color:"#EE82EE", name:"Stroke"},
        {cause:"Suicide", color:"#BC8F8F", name:"Suicide"},
        {cause:"Unintentional injuries", color:"#846ac8", name:"Accidents"}
    ];

    var used_causes = [];

    for(i = 0; i < all_causes.length; i++) {
        if(boolArray[i] === true) {
            used_causes.push(all_causes[i]);
        }
    };

    // log input data in the console

    var data = [];

    used_causes.forEach(loopdata => {

        console.log("this part of the function runs")

        var yearList = [];
        var deathList = [];

        loopdata.sort((a, b) => a.year - b.year);

        var color;
        var name;

        loopdata.forEach(object => {
            yearList.push(object.year);
            deathList.push(object.deaths);
            valsForTrace.forEach(val_item => {
                if(val_item.cause === object.cause) {
                    color = val_item.color;
                    name = val_item.name;
                }
            });
        });

        var trace = {
        x: yearList,
        y: deathList,
        mode: "lines+markers",
        name: name,
        marker: {
            color: color
        },
        label: yearList,
        type: "scatter"
        };

        data.push(trace);
    
    });

        var layout = {
            height: 650,
            width: 950,
            title: 'Cause of Death by Year',
            xaxis: {title: 'Year'},
            yaxis: {title: 'Total Deaths'}
        };

    // insert the HTML ID
    Plotly.newPlot('linechart', data, layout);
};
