    // function treeMap(sample) {
        google.load('visualization', '1.0', {'packages':['treemap']});
    // google.charts.setOnLoadCallback(drawChart);
    function drawTree(sample, callback) {
        console.log(sample);
        var treeData = [['State','Parent','Deaths'],
                        ['All Years',null,0],
                        ['2016','All Years',0],
                        ['2015','All Years',0],
                        ['2014','All Years',0],
                        ['2013','All Years',0],
                        ['2012','All Years',0],
                        ['2011','All Years',0],
                        ['2010','All Years',0],
                        ['2009','All Years',0],
                        ['2008','All Years',0],
                        ['2007','All Years',0],
                        ['2006','All Years',0],
                        ['2005','All Years',0],
                        ['2004','All Years',0],
                        ['2003','All Years',0],
                        ['2002','All Years',0],
                        ['2001','All Years',0],
                        ['2000','All Years',0],
                        ['1999','All Years',0]
                        ];

        // sample[0].forEach((year) =>{
        //     console.log(year.year)
        // });
        sample.forEach((year) =>{
            if (year.state != 'United States'){
                treeData.push([year.state+" "+year.year, year.year.toString(),year.deaths]);}
        });

        // just_causes.forEach((cause) => {
        //     console.log(cause);
        //     // var deaths = cause.map(year => year.deaths);
    
        //     // const add = (a, b) => a + b
        //     // var death_sum = deaths.reduce(add)
        //     // cause.forEach((year) =>{
        //     //     treeData.push([
        //     //         year.cause+" "+year.year,
        //     //         year.year,
        //     //         year.deaths,
        //     //         year.death_rate
        //     //      ]);

        //     // })

        //     });




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
                   ': ' + size + '<br>';
          }
        

        callback();
      };
      
    // };