import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'google-charts-drill-down';

  ngAfterContentInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    //google.load("visualization", "1", {packages:["corechart"]});
    setTimeout(()=>{
      google.charts.setOnLoadCallback(this.drawDrillDown());
    },1000)
    

  }

  drawDrillDown() {
    var d ={
      "data": {
        "cols": [
          {
            "label": "ProductCategoryName",
            "type": "string"
          },
          {
            "label": "No. of open tickets",
            "type": "number"
          }
        ],
        "rows": [
          {
            "c": [
              {
                "v": "Group 1"
              },
              {
                "v": 668
              }
            ]
          },
          {
            "c": [
              {
                "v": "Group 2"
              },
              {
                "v": 719
              }
            ]
          }
        ]
      },
      "Group 1": {
        "data": {
          "cols": [
            {
              "label": "ProductSubCategoryName",
              "type": "string"
            },
            {
              "label": "No. of open tickets",
              "type": "number"
            }
          ],
          "rows": [
            {
              "c": [
                {
                  "v": "assignee 1"
                },
                {
                  "v": 189
                }
              ]
            },
            {
              "c": [
                {
                  "v": "assignee 2"
                },
                {
                  "v": 317
                }
              ]
            },
            {
              "c": [
                {
                  "v": "assignee 3"
                },
                {
                  "v": 161
                }
              ]
            }
          ]
        }
      },
      "Group 2": {
        "data": {
          "cols": [
            {
              "label": "ProductSubCategoryName",
              "type": "string"
            },
            {
              "label": "No. of open tickets",
              "type": "number"
            }
          ],
          "rows": [
            {
              "c": [
                {
                  "v": "assignee 4"
                },
                {
                  "v": 450
                },
                {
                  "v": 11
                }
              ]
            },
            {
              "c": [
                {
                  "v": "assignee 5"
                },
                {
                  "v": 306
                },
                {
                  "v": 118
                }
              ]
            },
            {
              "c": [
                {
                  "v": "assignee 6"
                },
                {
                  "v": 180
                },
                {
                  "v": 14
                }
              ]
            },
            {
              "c": [
                {
                  "v": "assignee 7"
                },
                {
                  "v": 349
                },
                {
                  "v": 87
                }
              ]
            }
          ]
        }
      }
    }

    var options = {'animation': {startup: true,
                      'easing' :'inAndOut',
                      'duration':1000
                      },
                      vAxes: {
                          0: {title:'Number of open tickets',textStyle: {color: 'blue'}, format:'short'},
                        },
                        hAxes:{
                          0: {title:'Groups',textStyle: {color: 'blue'}, format:'short'},
                        },
                        vAxis: {
                          minValue: 0, 
                        },
                      series: {
                      0: {type: 'bars', targetAxisIndex:0},
                      1: {type: 'bars', targetAxisIndex:1}
                      },
                      title:'',
                      height:400
                  };
      var container = "chart_div"
      var currDrillLevel = [];
      currDrillLevel.push(d);
        var displayData = new google.visualization.DataTable(currDrillLevel[currDrillLevel.length-1].data);
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      
    function selectHandler(){
        var selectedItem = chart.getSelection()[0]; 
        if (selectedItem) {
            var item = displayData.getValue(selectedItem.row, 0); 
            var currElement =  currDrillLevel[currDrillLevel.length-1][item];
            if(currElement !== undefined){
              displayData = new google.visualization.DataTable(currElement.data);
              currDrillLevel.push(currDrillLevel[currDrillLevel.length-1][item]); 
              if(options.title === undefined || options.title === "")
                options.title = ""+item;
              else
                options.title += " | " + item;
              chart.draw(displayData,options);
            }
            
          }
      }
      function handler2() {
        $('#chart_div').css('cursor','pointer')
      } 
      function handler3() {
        $('#chart_div').css('cursor','default')
      } 	
        google.visualization.events.addListener(chart, 'select', selectHandler);
        google.visualization.events.addListener(chart, 'onmouseover', handler2);
        google.visualization.events.addListener(chart, 'onmouseout', handler3);
      var button = document.getElementById('backButton');
      button.onclick = function() {
    if(currDrillLevel.length > 1){
      currDrillLevel.pop();
      displayData = new google.visualization.DataTable(currDrillLevel[currDrillLevel.length-1].data);
            var lastIndex = options.title.lastIndexOf(" | ");
            if(lastIndex === -1)
              options.title = "";
            else
              options.title = options.title.substr(0,lastIndex);
            chart.draw(displayData,options);
      }
      }
        chart.draw(displayData,options);
      }
}
