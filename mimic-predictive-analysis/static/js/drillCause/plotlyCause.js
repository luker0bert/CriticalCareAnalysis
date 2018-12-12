
// PURPOSE:
// 1 function to create a scatterplot with 10 traces (one for each cause of death) over time
// 2 function to handle changes
// 3 this might be in jc's js: function to initialize on load?
// 4 this might be in jc's js: function to resize on window change?

// BACKEND TO-DO
// build route of all causes for dropdown for scatter
// build data/<cause> route for query on dropdown selection

// 1 line graph
function buildLine(sample, activeStates, boolArray) {

    console.log(boolArray);

    var state0 = sample.filter(item => item.state === activeStates[0]);
    var state1 = sample.filter(item => item.state === activeStates[1]);
    var state2 = sample.filter(item => item.state === activeStates[2]);
    var state3 = sample.filter(item => item.state === activeStates[3]);
    var state4 = sample.filter(item => item.state === activeStates[4]);
    var state5 = sample.filter(item => item.state === activeStates[5]);
    var state6 = sample.filter(item => item.state === activeStates[6]);
    var state7 = sample.filter(item => item.state === activeStates[7]);
    var state8 = sample.filter(item => item.state === activeStates[8]);
    var state9 = sample.filter(item => item.state === activeStates[9]);

    var all_states = [state0,state1,state2,state3,state4,state5,
        state6,state7,state8,state9];

    var valsForTrace = [
        {color:"#2ac4c4", name:activeStates[0]},
        {color:"#808080", name:activeStates[1]},
        {color:"#19a140", name:activeStates[2]},
        {color:"#0a4b82", name:activeStates[3]},
        {color:"#a9424a", name:activeStates[4]},
        {color:"#e89066", name:activeStates[5]},
        {color:"#afb507", name:activeStates[6]},
        {color:"#EE82EE", name:activeStates[7]},
        {color:"#BC8F8F", name:activeStates[8]},
        {color:"#846ac8", name:activeStates[9]}
    ];

    used_states = [];

    for(i = 0; i < all_states.length; i++) {
        if(boolArray[i] === true) {
            used_states.push(all_states[i]);
        }
    };

    // log input data in the console

    var data = [];

    used_states.forEach(loopdata => {

        var yearList = [];
        var deathList = [];

        loopdata.sort((a, b) => a.year - b.year);

        var color;
        var name;

        loopdata.forEach(object => {
            yearList.push(object.year);
            deathList.push(object.death_rate);
            valsForTrace.forEach(val_item => {
                if(val_item.name === object.state) {
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
            yaxis: {title: 'Death Rate'}
        };

    // insert the HTML ID
    Plotly.newPlot('linechart', data, layout);
};
