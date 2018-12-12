var mapObject;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();

}

function resetHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#fff',
        fillOpacity: 0.8
    });
}

async function choroplethGenerator(year,cause) {

var result = await d3.json(`https://leading-causes-of-death.herokuapp.com/data/year=${year}`).then(function(response) {

    // Log the data key of the response so that it can be examined if desired
  
    // For loop that loops through everything returned by the JSON
    for(var i = 0; i < response.length; i++) {
          // specify the desired metrics using an if statement
          if(response[i].cause === cause && response[i].state != "United States") {
            // Once desired objects are found, loop through the geoJSON and compare the state name in
            // response to the state name in the geoJSON
              for(var j = 0; j < statesData.features.length; j++) {
                  if(statesData.features[j].properties.name === response[i].state) {
                    // Set the desired value to the density property in the geoJSON, be sure to parse string
                    // to integer considering that the response JSON returns a string initially
                        statesData.features[j].properties.density = parseInt(response[i].death_rate);
                        break;
              }
          }
      }
  }

// set the Choropleth map layer
mapObject = L.choropleth(statesData, {

    // Use the density property, as it holds the death rate data from above
    valueProperty: "density",
    
    // Set color scale
    scale: ["#ffffb2", "#b10026"],
    
    // Use 10 steps, as a good general step count
    steps: 10,
    
    // Use mode "q"
    mode: "q",
    style: {
        // Set the border color and variables
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
    },

    onEachFeature: function(feature, layer) {
        layer.bindPopup(`<strong>Death Rate for ${feature.properties.name}:</strong> ${feature.properties.density} deaths per 100,000<br>` + 
            `To see in-depth analytics of this state <a href=https://leading-causes-of-death.herokuapp.com/drill/start=1999/end=2016/state=${feature.properties.name}>click here</a><br>`);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
      }

    });

  });
  
    return mapObject;

};