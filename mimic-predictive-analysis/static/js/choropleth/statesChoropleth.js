// Add the tile layer
  var mapLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var d3CraftedURL = `https://leading-causes-of-death.herokuapp.com/map/year=1999`;

  function updateURL(value) {
    d3CraftedURL = `https://leading-causes-of-death.herokuapp.com/map/year=${value}`;
    console.log(d3CraftedURL);
  };

  function refreshPage() {
    window.location.assign(d3CraftedURL);
  }

  function getColor(mag) {
    var color = "";

    if (mag >= 5) {
      color = "#b10026"; // light yellowish down to... 
    }
    else if (mag >= 4) {
      color = "#c23845";
    }
    else if (mag >= 3) {
      color = "#d37164";
    }
    else if (mag >= 2) {
      color = "#e5aa83";
    }
    else if (mag >= 1) {
      color = "#edc692";
    }
    else {
      color = "#f6e2a2"; // light redish...?colorblind 
    }
    return color;
  }

  var legendTitles = [
    {title:"Lowest Death Rate in the Country"},
    {title:"In the lowest quartile (<25%)"},
    {title:"In the lower quartile (25% to 50%)"},
    {title:"In the higher quartile (50% to 75%)"},
    {title:"In the highest quartile (>75%)"},
  ];

  var colorSet = ["black","black","black","white","white"];

  // Use D3 to select the hidden element in the choropleth html to find the specific year we want to plug
  // Into the choropleth

  var specificYear = d3.select("#hiddenEl").attr("value");
  
  var overlayMaps = {}

  var item1 = choroplethGenerator(specificYear,"All causes").then((result) => {overlayMaps.All_Causes=result});
  var item2 = choroplethGenerator(specificYear,"Alzheimer's disease").then((result) => {overlayMaps.Alzheimers=result});
  var item3 = choroplethGenerator(specificYear,"Cancer").then((result) => {overlayMaps.Cancer=result});
  var item4 = choroplethGenerator(specificYear,"CLRD").then((result) => {overlayMaps.CLRD=result});
  var item5 = choroplethGenerator(specificYear,"Diabetes").then((result) => {overlayMaps.Diabetes=result});
  var item6 = choroplethGenerator(specificYear,"Heart disease").then((result) => {overlayMaps.Heart_Disease=result});
  var item7 = choroplethGenerator(specificYear,"Influenza and pneumonia").then((result) => {overlayMaps.Influenza_and_Pneumonia=result});
  var item8 = choroplethGenerator(specificYear,"Kidney disease").then((result) => {overlayMaps.Kidney_Disease=result});
  var item9 = choroplethGenerator(specificYear,"Stroke").then((result) => {overlayMaps.Stroke=result});
  var item10 = choroplethGenerator(specificYear,"Suicide").then((result) => {overlayMaps.Suicide=result});
  var item11 = choroplethGenerator(specificYear,"Unintentional injuries").then((result) => {overlayMaps.Accidents=result});

Promise.all([item1,item2,item3,item4,item5,item6,item7,item8,item9,item10,item11]).then(function() {
  var myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4,
    layers: [mapLayer, overlayMaps.All_Causes]
  });
    // Control is added, with only overlayMaps as its base layer to ensure that only one choropleth
  // can be selected at a time
  L.control.layers(overlayMaps,null,{collapsed:false}).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "topleft" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      categories = [0, 1, 2, 3, 4, 5];
      labels = [];
  
      var menuInfo = "<form action='/'>" + "<input type=submit class='homeBtn' value='Return to Homepage'> </form>"
      + `<p>Current Year: ${specificYear}</p>`
      + "<p>See Data For a Different Year:</p>"
      + "<select id='yearSelector' class='homeSelector' onchange='updateURL(this.value)'>" +
      "<option value='1999'>1999</option>" +
      "<option value='2000'>2000</option>" +
      "<option value='2001'>2001</option>" +
      "<option value='2002'>2002</option>" +
      "<option value='2003'>2003</option>" +
      "<option value='2004'>2004</option>" +
      "<option value='2005'>2005</option>" +
      "<option value='2006'>2006</option>" +
      "<option value='2007'>2007</option>" +
      "<option value='2008'>2008</option>" +
      "<option value='2009'>2009</option>" +
      "<option value='2010'>2010</option>" +
      "<option value='2011'>2011</option>" +
      "<option value='2012'>2012</option>" +
      "<option value='2013'>2013</option>" +
      "<option value='2014'>2014</option>" +
      "<option value='2015'>2015</option>" +
      "<option value='2016'>2016</option>" + "</select>" +
      "<br><br><input type=submit class='homeBtn' value='Select New Year' onclick=refreshPage()><br><br><hr><br>"
      + "<h3>Map Legend:</h3>";
      labels.push(menuInfo);

      for (var i = 0; i < categories.length-1; i++) {
        var legendInfo = `<i style="background: ${getColor(categories[i])}; color:${colorSet[i]}; ">${legendTitles[i].title}</i>`;
        labels.push(legendInfo);
        };
      labels.push(`<i style="background: ${getColor(5)}; color:white ">Highest Death Rate in the Country</i>`);
      //console.log(labels);
  
      div.innerHTML = labels.join("<br>");
      
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);

}).catch(console.error);