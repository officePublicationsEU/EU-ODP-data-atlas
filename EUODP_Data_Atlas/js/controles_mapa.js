// EUPL license v1.2 applies
/*
document.getElementById("back_atlas").addEventListener("click", function ()
{   
   document.getElementById("iframe").style.visibility="hidden";
   document.getElementById("back_atlas").style.visibility="hidden";
   document.getElementById("cb3").checked = false;
});
*/
document.getElementById("full_screen").addEventListener("click", function ()
{ 
    map.fullscreen();
    toggleFullScreen(document.body);
});             

document.getElementById("home").addEventListener("click", function ()
{
    map.setView([57, 5], 4);
});

document.getElementById("zoomIn").addEventListener("click",function ()
{
    map.setZoom(map.getZoom() + 1);
});

document.getElementById("zoomOut").addEventListener("click", function ()
{
    map.setZoom(map.getZoom() - 1);
});

document.getElementById("b_layers").addEventListener("click", function ()
{
    if(document.getElementById(this.id).checked)
	{
        if (this.id=="b_layers")
		{
            document.getElementById("legend").style.display="block";
            document.getElementById("menu_der").style.right="230px";
        }
    }
	else
	{
            document.getElementById("legend").style.display="none";
            document.getElementById("menu_der").style.right="";
    }
});

if (!String.prototype.startsWith)
{
	String.prototype.startsWith = function(searchString, position)
	{
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

var class_names= document.getElementsByClassName("cb");

for (var i = 0; i < class_names.length; i++)
{
    class_names[i].addEventListener('click', function()
	{
        var cb_id=this.id;
        if(document.getElementById(cb_id).checked)
		{
            /*else if (cb_id.startsWith("cb1"))
			{
				configParams = getConfigParams('EIOPAInsuranceStatisticsSoloQuarterly.csv', 'EIOPA - Insurance Statistics - Solo Quarterly', 'Insurance statistics in euros', 'European Insurance and Occupational Pensions Authority');
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb2"))
			{
				configParams = getConfigParams('AMECO10.TXT.csv', 'AMECO_10: Balances with the Rest of the World (National Accounts)', 'Commerce balance in percentage', 'Directorate-General for Economic and Financial Affairs');
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb3"))
			{
				configParams = getConfigParams('digital-agenda-scoreboard-key-indicators.csv.csv', 'Average Revenue per User (ARPU) in the Retail Mobile Market (CSV)', 'Revenue in percentage', 'Directorate-General for Communications Networks, Content and Technology');
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb4"))
			{
				configParams = getConfigParams('AverageRevenueperUserARPUintheRetailMobileMarketSPARQL.csv', 'Average Revenue per User (ARPU) in the Retail Mobile Market (SPARQL)', 'Revenue in percentage', 'Directorate-General for Communications Networks, Content and Technology');
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb5"))
			{
				getConfigParamsJSON('dgGeojson.json', 'Safe and secure truck parking data according to Commission delegated Regulation (EU) No 885/2013');
            }*/
            if (cb_id.startsWith("cb10"))
			{
				getConfigParamsJSON('dgGeojson.json', 'Safe and secure truck parking data according to Commission delegated Regulation (EU) No 885/2013', 'Directorate-General for Mobility and Transport');
            }
            else if (cb_id.startsWith("cb11"))
			{
				configParams = getConfigParams('2017PREDICTDataset.csv', '2017 PREDICT Dataset', 'Investment in ICT R&D', 'Joint Research Centre', 3);
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb12"))
			{
				configParams = getConfigParams('LF_211_NUTSMix.csv', 'LF211 - Recreation potential maps (LUISA Platform REF2014)', 'Recreation potential in Europe', 'Joint Research Centre', 3);
                map.chorojson.add(configParams);
            }
			else if (cb_id.startsWith("cb6"))
			{
				configParams = getConfigParams('EIOPAInsuranceStatisticsSoloQuarterly.csv', 'EIOPA - Insurance Statistics - Solo Quarterly',  'Insurance statistics in euros', 'European Insurance and Occupational Pensions Authority', 5);
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb7"))
			{
				configParams = getConfigParams('AMECO10.TXT.csv', 'AMECO_10: Balances with the Rest of the World (National Accounts)',  'Commerce balance in percentage', 'Directorate-General for Economic and Financial Affairs', 4);
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb8"))
			{
				configParams = getConfigParams('digital-agenda-scoreboard-key-indicators.csv.csv', 'Average Revenue per User (ARPU) in the Retail Mobile Market (CSV)', 'Revenue in percentage', 'Directorate-General for Communications Networks, Content and Technology', 3);
                map.chorojson.add(configParams);
            }
            else if (cb_id.startsWith("cb9"))
			{
				configParams = getConfigParams('AverageRevenueperUserARPUintheRetailMobileMarketSPARQL.csv', 'Average Revenue per User (ARPU) in the Retail Mobile Market (SPARQL)', 'Revenue in percentage', 'Directorate-General for Communications Networks, Content and Technology', 5);
                map.chorojson.add(configParams);
			}
            else if (cb_id.startsWith("cb13"))
			{
				configParams = getConfigParams('Prejudiciaryquestionsfromnationalcourts.csv', 'Prejudiciary questions from national courts', 'Total number of international agreements per country', 'EUR-LEX', 5);
                map.chorojson.add(configParams);
            }
			/*if (cb_id.startsWith("cb10"))
			{
				getConfigParamsJSON('cities-europe.json', 'JSON (geoSON) sample', 'Council of the European Union');
            }*/
			/*if (cb_id.startsWith("cb10"))
			{
				getConfigParamsJSON('dgGeojson.json', 'Safe and secure truck parking data according to Commission delegated Regulation (EU) No 885/2013', '', 'Directorate-General for Mobility and Transport');
            }
            if (cb_id.startsWith("cb11"))
			{
				configParams = getConfigParams('2017PREDICTDataset.csv', '2017 PREDICT Dataset', 'Joint Research Centre');
                map.chorojson.add(configParams);
            }*/
        }
		else
		{
            if (cb_id.startsWith("cb1"))
			{
				clearMarkers();
                map.chorojson.remove();
            }
            else if (cb_id.startsWith("cb2"))
			{    
            }
            else if (cb_id.startsWith("cb3"))
			{                   
            }
            else if (cb_id.startsWith("cb5"))
			{
				clearMarkers();
                map.chorojson.remove();
            }            
        }
    });
}

function setSubMap()
{
	if($("#filter-years").length)
	{
		var subMap = $("#filter-years").val();
		if(subMap == '2017')
		{
			configParams = getConfigParams('EUODP_Data_Atlasdigital-agenda-scoreboard-key-indicatorsAverageRevenueperUserARPUintheRetailMobileMarketCSV_2016.csv', 'Average Revenue per User (ARPU) in the Retail Mobile Market (CSV), 2017', 'Revenue in percentage, 2017', 'Directorate-General for Communications Networks, Content and Technology', 2);
			map.chorojson.add(configParams);
		}
		else
		{
			configParams = getConfigParams('EUODP_Data_Atlasdigital-agenda-scoreboard-key-indicatorsAverageRevenueperUserARPUintheRetailMobileMarketCSV_2017_.csv', 'Average Revenue per User (ARPU) in the Retail Mobile Market (CSV), 2016', 'Revenue in percentage, 2016', 'Directorate-General for Communications Networks, Content and Technology', 2);
			map.chorojson.add(configParams);
		}
	}
}


 /*$("body").click(function ()
 {
	if ($("#overlay").length > 0) {
		removeOverlay();
	} else {
		displayOverlay("Loading...");
	}
});*/
