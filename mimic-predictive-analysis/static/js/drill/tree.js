    // function treeMap(sample) {
        google.load('visualization', '1.0', {'packages':['treemap']});
    // google.charts.setOnLoadCallback(drawChart);
    function drawChart(sample, callback) {
        console.log(sample);
        var treeData = [['Cause','Parent','Deaths','Death Rate'],
                        ['All Years',null,0,0]];
        var allCauses = sample.filter(item => item.cause == "All causes")
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
        
        var just_causes = [alzheimer,cancer,CLRD,diabetes,heart_disease,influenza,
            kidney_disease,stroke,suicide,accidents];
        
        allCauses.forEach((year) =>{
            treeData.push([year.year, 'All Years',0, 0])
        });

        just_causes.forEach((cause) => {
            console.log(cause);
            // var deaths = cause.map(year => year.deaths);
    
            // const add = (a, b) => a + b
            // var death_sum = deaths.reduce(add)
            cause.forEach((year) =>{
                treeData.push([
                    year.cause+" "+year.year,
                    year.year,
                    year.deaths,
                    year.death_rate
                 ]);

            })

            });




        console.log(treeData);
        var data = google.visualization.arrayToDataTable(treeData);

        tree = new google.visualization.TreeMap(document.getElementById('tree'));

        tree.draw(data, {
            minColor: '#ffff00',
            midColor: '#ff9933',
            maxColor: '#ff0000',        
          headerHeight: 15,
          fontColor: 'black',
          showScale: false,
          generateTooltip: showFullTooltip
        });

        function showFullTooltip(row, size, value) {
            return '<div style="background:#99bbff; padding:10px; border-style:solid">' +
                   '<span style="font-family:Courier"><b>' + data.getValue(row, 0) +
                   '</b>, ' + data.getValue(row, 1) +'</span><br>' +
               data.getColumnLabel(2) +
                   ': ' + size + '<br>' +
               data.getColumnLabel(3) + ': ' + value + ' </div>';
          }
        

        callback();
      };
      
    // };