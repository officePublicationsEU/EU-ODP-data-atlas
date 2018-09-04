// EUPL license v1.2 applies
mapconfig = {
	"center": [
		57,
		5
	],
	"zoom": 4,
	"minZoom": 3,
	"maxZoom": 24,
	"height" : 900
};

function getConfigParams(mapDataName, legendTitle, legenddesc, publisher, legendRange)
{	
    map.setView([57, 5], 4);
	clearMarkers(legendTitle);
	var minFromData = 0;	
	var maxFromData = 0;
	$.ajax(
	{
		url: mapDataName, // path to file
		dataType: 'text', // type of file (text, json, xml, etc)
		success: function(data)
		{
			var recoveredValues = new Array();
			var recoveredData = data.split(/\r?\n|\r/);
			for(i = 0; i < recoveredData.length; i ++)
			{
				if(recoveredData[i].length > 0)
				{
					var valueAsNum = Number(recoveredData[i].split(',')[1]);
					if(!isNaN(valueAsNum))
					{
						if(i == 0)
						{
							minFromData = valueAsNum;	
							maxFromData = valueAsNum;
						}
						else
						{
							if(valueAsNum < minFromData)
							{
								minFromData = valueAsNum;
							}
							else if(valueAsNum > maxFromData)
							{
								maxFromData = valueAsNum;
							}
						}
					}
				}
			}
		},
		error: function()
		{
			alert(mapDataName);
		},
        async: false
	});
	
	var stepFromData = Math.round((maxFromData - minFromData)/legendRange);
	var rangeStyles = ['theme_1_20', 'theme_1_40', 'theme_1_60', 'theme_1_80', 'theme_1_100'];
	function dynamicRangesLimits()
	{
		var rangeLimitsArr = new Array();
		for(i = 0; i < legendRange - 1; i++)
		{
			if(i == 0)
			{
				rangeLimitsArr[i] = minFromData + stepFromData;
			}
			else
			{
				rangeLimitsArr[i] = rangeLimitsArr[i - 1] + stepFromData;
			}
		}
		return rangeLimitsArr;
	}
	
	function dynamicRanges()
	{
		rangesAsString = [];
		rangeLimits = dynamicRangesLimits();
		for(i = 0; i < legendRange; i ++)
		{
			if(i == 0)
			{
				rangesAsString[i] = 
				{
					"from": "-", 
					"to": rangeLimits[i].toFixed(0), 
					"legend": "<" + rangeLimits[i].toFixed(0),
					"style": rangeStyles[i]
				}
			}
			else if(i == legendRange - 1)
			{
				rangesAsString[i] = 
				{
					"from": rangeLimits[i - 1].toFixed(0),
					"to": "+",
					"legend": ">" + rangeLimits[i - 1].toFixed(0),
					"style": rangeStyles[i]
				}
			}
			else
			{
				rangesAsString[i] = 
				{
					"from": rangeLimits[i - 1].toFixed(0),
					"to": rangeLimits[i].toFixed(0),
					"legend": rangeLimits[i - 1].toFixed(0) + ' - ' + rangeLimits[i].toFixed(0),
					"style": rangeStyles[i]
				}
			}
		}
		rangesAsString[rangesAsString.length] = 
		{ 
			"style": "na", 
			"legend": "Not available"
		};
		return rangesAsString;
	}
	
	choroconfig = 
	{
		"values": mapDataName, 
		"ranges": dynamicRanges(),
		"legend":
		{
			"header": "<span class='chorojson-legend-header'>" + legendTitle + "</span><span>" + legenddesc + "</span>",
			"footer": "<span class='chorojson-legend-footer'><em>Publisher</em>: " + publisher + "</span>",
			"position": "bottomleft",
			"type": "list",
			"class": "chorojson-legend-container"
		},
		"styles":
		{
			// Actually, pre-defined styles are used.
			// See https://webgate.ec.europa.eu/fpfis/wikis/display/webtools/Map+-+map.chorojson .
		},
		//"values": "data.csv",
		//"values": "digital-agenda-scoreboard-key-indicators.csv",
		"options":
		{
			//"unit": "€",
			"countries":
			{
				"year": 2007
			}
		},
		"events":
		{
			"click": "countryClick"
		},
		"tooltip": "<span class=\"chorojson-tooltip-header\">{countryName}&nbsp;{regionName}&nbsp;{regionId}</span><span class=\"chorojson-tooltip-value\">{value}{unit}</span><span class=\"chorojson-tooltip-text\">{text}</span>"
	};
	
	return choroconfig;
}

function getConfigParamsJSON(mapDataName, legendTitle)
{
    map.setView([57, 5], 4);
	clearMarkers(legendTitle);
	var jsonFile = '';
	$.ajax(
	{
		url: mapDataName, // path to file
		//dataType: 'json', // type of file (text, json, xml, etc)
		dataType: 'text', 
		success: function(data)
		{
			jsonFile = JSON.parse(data);
		},
		error: function(jqXHR, error)
		{
			alert(mapDataName);
			alert(jqXHR);
			alert(error);
		},
        async: false
	});
	L.wt.markers(jsonFile).addTo(map);
}

L.custom = 
{
	init: function(obj)
	{
		// MAP ITSELF
		window.map = L.map(obj, mapconfig);
    
		var OpenStreetMap_Mapnik = L.wt.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
		{
			attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
			maxZoom: 16
		}).addTo(map);    
		map.menu.hide();
		
		/*map.on('zoomend', function()
		{
			alert(map.getZoom());
		});*/
	}
};
 
function countryClick(params)
{
	console.log("Event triggered: countryClick", params);
}

function clearMarkers(legendTitle)
{
	$('.chorojson-legend-container').remove();
	if(legendTitle != null && legendTitle.length > 0)
	{
		$('#dataSetName').text(legendTitle);
	}
	else
	{
		$('#dataSetName').text('');
	}
	map.eachLayer(function (layer)
	{
		if(layer.background == null)
		{
			map.removeLayer(layer);
		}
	});
}
		
