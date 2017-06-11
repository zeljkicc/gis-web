
var fromProjection = new OpenLayers.Projection("EPSG:4326"); // WGS 1984
var toProjection = new OpenLayers.Projection("EPSG:900913"); // Spherical Mercator Projection

var map =  new OpenLayers.Map("map", {

		projection: new OpenLayers.Projection("EPSG:900913"),
                displayProjection: new OpenLayers.Projection("EPSG:4326"),
                
	   controls: [
	      new OpenLayers.Control.Navigation(),
	      new OpenLayers.Control.PanZoomBar(),
	      new OpenLayers.Control.LayerSwitcher({'ascending':false}),
	      new OpenLayers.Control.Permalink(),
	      new OpenLayers.Control.ScaleLine(),
	      new OpenLayers.Control.Permalink('permalink'),
	      new OpenLayers.Control.MousePosition(),
	      new OpenLayers.Control.OverviewMap(),
	      new OpenLayers.Control.KeyboardDefaults()
	   ],
	   numZoomLevels: 20
	   
	}
);

var osmLayer = new OpenLayers.Layer.OSM("OpenStreetMapCycle", "http://a.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png");

var r = 0.00899323529;

var layerRoads = new OpenLayers.Layer.WMS( "Roads (wms)",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_roads_free_1',
		transparent: true
	},
  {
    	isBaseLayer: false,
    	opacity: 0.4
  });

var layerRailways = new OpenLayers.Layer.WMS( "Railways (wms)",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_railways_free_1',
		transparent: true
	},
  {
    isBaseLayer: false,
    opacity: 0.4
  });

var layerBuildings = new OpenLayers.Layer.WMS( "Buildings (wms)",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_buildings_a_free_1',
		transparent: true
	},
  {
    isBaseLayer: false,
    opacity: 0.4
  });


var layerLanduse = new OpenLayers.Layer.WMS( "Landuse (wms)",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_landuse_a_free_1',
		transparent: true
	},
    {
    	isBaseLayer: false,
    	opacity: 0.4
  	});	


var layerPois = new OpenLayers.Layer.WMS( "POIS (wms)",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_pois_free_1',
		transparent: true
	},
  {
    isBaseLayer: false,
    opacity: 0.4
  });



var layerPois2 = new OpenLayers.Layer.WMS( "POIS - poly (wms)",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_pois_a_free_1',
		transparent: true
	},
  {
    isBaseLayer: false,
    opacity: 0.4
  });


 map.addLayer(new OpenLayers.Layer.OSM("CartoDB positron",                                                   
                                           ["http://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
                                            "http://b.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
                                            "http://c.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png",
                                            "http://d.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>" }));

map.addLayer(osmLayer);

map.addLayer(layerRoads);

map.addLayer(layerRailways);

map.addLayer(layerBuildings);

map.addLayer(layerLanduse);

map.addLayer(layerPois); 

map.addLayer(layerPois2); 

var osmLayer2 = new OpenLayers.Layer.OSM("OpenStreetMap");
map.addLayer(osmLayer2);

map.setCenter(new OpenLayers.LonLat(21.895496, 43.321962).transform(fromProjection,toProjection), 16);
 

   map.addLayer(new OpenLayers.Layer.OSM("CartoDB positron (no labels)",                                                   
                                           ["http://a.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png",
                                            "http://b.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png",
                                            "http://c.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png",
                                            "http://d.basemaps.cartocdn.com/light_nolabels/${z}/${x}/${y}.png"],
                                            {attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>" }));


    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    

var layerWater = new OpenLayers.Layer.Vector("Water (wfs)", {
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: "http://localhost:8080/geoserver/wfs",
                    featureType: "gis.osm_water_a_free_1",
                    featureNS: "http://localhost:8080/geoserver/serbia_new",
                    geometryName: "geom",
                    srsName: "EPSG:900913",
                    version: "1.1.0"
                }),
                styleMap: new OpenLayers.StyleMap({
				     'fillColor': '#0000FF',
             'strokeColor': '#0000AA'
				    }),
                renderers: renderer
            });

map.addLayer(layerWater);

var layerPOWS = new OpenLayers.Layer.Vector("POWS (wfs)", {
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: "http://localhost:8080/geoserver/wfs",
                    featureType: "gis.osm_pofw_free_1",
                    featureNS: "http://localhost:8080/geoserver/serbia_new",
                    geometryName: "geom",
                    srsName: "EPSG:900913",
                    version: "1.1.0"
                }),
                    styleMap: new OpenLayers.StyleMap({
                        fillColor: '#0000FF',
                        fillOpacity: 0.7,
                        strokeColor: '#ADD8E6',
                        pointRadius: 6,
					label: "${name}",                    
			        fontColor: "blue",
			        fontSize: "12px",
			        fontFamily: "Courier New, monospace",
			        fontWeight: "bold",
			        labelAlign: "lc",
			        labelXOffset: "14",
			        labelYOffset: "0",
			        labelOutlineColor: "white",
			        labelOutlineWidth: 3
				    }),
                
                renderers: renderer
            });

map.addLayer(layerPOWS);



   /* var rule = new OpenLayers.Rule({

        symbolizer: {
            fillColor: '#f00',
            strokeColor: '#fcc',
            fillOpacity: '0.5'
        }
    }); */


var layerTransport = new OpenLayers.Layer.Vector("Transport (wfs)", {
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: "http://localhost:8080/geoserver/wfs",
                    featureType: "gis.osm_transport_free_1",
                    featureNS: "http://localhost:8080/geoserver/serbia_new",
                    geometryName: "geom",
                    srsName: "EPSG:900913",
                    version: "1.1.0"
                }),
                   styleMap: new OpenLayers.StyleMap({
                        fillColor: '#BF5FFF',
                        fillOpacity: 0.7,
                        strokeColor: '#9400d3',
                        pointRadius: 6,
          label: "${name}",                    
              fontColor: "purple",
              fontSize: "12px",
              fontFamily: "Courier New, monospace",
              fontWeight: "bold",
              labelXOffset: "0",
              labelYOffset: "14",
              labelOutlineColor: "white",
              labelOutlineWidth: 3 
            }),               
                renderers: renderer
                });
map.addLayer(layerTransport);


$("#one-item-heading").click(function(){
  if(layerDomainData.selectedFeatures.length!==0){
  selectControl.unselect(layerDomainData.selectedFeatures[0]);
}
	$("#one-item").hide(1000);
  $("#display-list").show(1000);
});


var domainStyle = new OpenLayers.Style({
    graphicWidth: 25,
    graphicHeight: 25,
    graphicYOffset: 0,
    label: "${name}",                    
	fontColor: "purple",
	fontSize: "12px",
	fontFamily: "Courier New, monospace",
	fontWeight: "bold",
	//labelAlign: "lc",
	labelXOffset: "0",
	labelYOffset: "9",
	labelOutlineColor: "white",
	labelOutlineWidth: 3
  },
  {
    rules: [
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "hotel" }),
        symbolizer: {'Point': {externalGraphic: './img/hotel1.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "restaurant" }),
        symbolizer: {'Point': {externalGraphic: './img/restaurant.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "coffeepub" }),
        symbolizer: {'Point': {externalGraphic: './img/coffee.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "cinema" }),
        symbolizer: {'Point': {externalGraphic: './img/cinema.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "culture" }),
        symbolizer: {'Point': {externalGraphic: './img/culture.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "monument" }),
        symbolizer: {'Point': {externalGraphic: './img/monument.png'}}
      })]
  });

var selectedDomainStyle = new OpenLayers.Style({
    graphicWidth: 25,
    graphicHeight: 25,
    graphicYOffset: 0,
    label: "${name}",                    
	fontColor: "purple",
	fontSize: "12px",
	fontFamily: "Courier New, monospace",
	fontWeight: "bold",
	labelXOffset: "0",
	labelYOffset: "9",
	labelOutlineColor: "white",
	labelOutlineWidth: 3
  },
  {
    rules: [
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "hotel" }),
        symbolizer: {'Point': {externalGraphic: './img/hotel1_white.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "restaurant" }),
        symbolizer: {'Point': {externalGraphic: './img/restaurant_white.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "coffeepub" }),
        symbolizer: {'Point': {externalGraphic: './img/coffee_white.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "cinema" }),
        symbolizer: {'Point': {externalGraphic: './img/cinema_white.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "culture" }),
        symbolizer: {'Point': {externalGraphic: './img/culture_white.png'}}
      }),
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'type',
        value: "monument" }),
        symbolizer: {'Point': {externalGraphic: './img/monument_white.png'}}
      })]
  });


var layerDomainData = new OpenLayers.Layer.Vector("Tourist locations (wfs)", {
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: "http://localhost:8080/geoserver/wfs",
                    featureType: "tour_data",
                    featureNS: "http://localhost:8080/geoserver/serbia_new",
                    geometryName: "geom",
                    srsName: "EPSG:900913",
                    version: "1.1.0"
                }),
                    styleMap: new OpenLayers.StyleMap({
                      'default' : domainStyle,
                      'select' : selectedDomainStyle
                    }),
                renderers: renderer             
            });


layerDomainData.events.register("featuresadded", null, function(layer) {
                	console.log(layer)
				  
				  addListItems(layer);
				});


map.addLayer(layerDomainData);

var fromList = false;


function addListItems(layerDomainData){
	$("#display-list").html("");
	var dataArray = layerDomainData.features;
	for(var i =0; i<dataArray.length; i++){

		var a = document.createElement("a");
		$(a).attr("href", "#");
		$(a).attr("class", "list-group-item list-item-click");
		$("#display-list").append(a);

		$(a).attr("id", "feature" + dataArray[i].data.id);

		var img = document.createElement("img");
		$(img).attr("class", "img-circle list-icon");

    switch(dataArray[i].data.type){
      case "hotel":
        $(img).attr("src", "./img/hotel.png");
      break;
      case "coffeepub":
        $(img).attr("src", "./img/coffeepub.svg");
      break;
      case "restaurant":
        $(img).attr("src", "./img/restaurant.ico");
      break;
      case "monument":
        $(img).attr("src", "./img/monument-list-item.png");
      break;
      case "cinema":
        $(img).attr("src", "./img/cinema-list-item.png");
      break;
      case "culture":
        $(img).attr("src", "./img/culture-list-item.png");
      break;
      default:
         $(img).attr("src", "./img/hotel.png");
    }
		
		$(img).attr("width", "50px");

		$(a).append(img);
		$(a).append("<b>" + dataArray[i].data.name  + "</b>");

		var span = document.createElement("span");
		$(span).attr("class", "pull-right glyphicon glyphicon-circle-arrow-right glyph-right");
		$(a).append(span);
		
		a.data = dataArray[i].data;
		a.geometry = dataArray[i].geometry;
    a.feature = dataArray[i];
		$(a).click(function(){  

			$("#one-item-content").html("");

			var h2 = document.createElement("h2");
			$(h2).attr("class", "margin-top-0px");
			$(h2).text(this.data.name);
			$("#one-item-content").append(h2);

			var h3 = document.createElement("h3");
			$(h3).attr("class", "margin-top-0px");
			$(h3).text(this.data.type);
			$(h3).css("font-style", "italic");
			$("#one-item-content").append(h3);

			$("#one-item-content").append("<h5>" + this.data.desc + "</h5>");

			$("#one-item-content").append("<h5>Open from: " + this.data.openfrom + " to: " + this.data.opento  + "</h5>");

			var img = document.createElement("img");
			$(img).attr("class", "img-responsive img-rounded");
			$(img).attr("src", this.data.url);
			$("#one-item-content").append(img);
			$(img).css("margin:auto");

			var a1 = document.createElement("a");
			$(a1).attr("href", this.data.site_url);
			$(a1).text("More information...");
			$("#one-item-content").append(a1);


			$("#display-list").hide(1000);
			$("#one-item").show(1000);

			console.log(a.geometry);

       fromList = true;
      selectControl.select(this.feature);

			map.panTo(new OpenLayers.LonLat(this.geometry.x, this.geometry.y));
		});

	

	}

}


var layerWaterwaysWFS = new OpenLayers.Layer.Vector("Waterways (wfs)", {
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS({
                    url: "http://localhost:8080/geoserver/wfs",
                    featureType: "gis.osm_waterways_free_1",
                    featureNS: "http://localhost:8080/geoserver/serbia_new",
                    geometryName: "geom",
                    srsName: "EPSG:900913",
                    version: "1.1.0"
                }),
              styleMap: new OpenLayers.StyleMap({
			        'default' : new OpenLayers.Style({'strokeColor': '#0000FF'}),
			        'select' : new OpenLayers.Style({'strokeColor': '#00FFFF'})
				    }),
                renderers: renderer
            });

map.addLayer(layerWaterwaysWFS);

 var selectControl = new OpenLayers.Control.SelectFeature([layerDomainData, layerWaterwaysWFS], {
    onSelect: onFeatureSelect,
    onUnselect: onFeatureUnselect
  });

  map.addControl(selectControl);
  selectControl.activate();


  function onFeatureSelect(feature){

				  if(feature.layer.name === "Tourist locations (wfs)"){

            if(fromList == false){
				  	$("#feature" + feature.data.id).click();
          }
          else fromList = false;

				  }
				  else if(feature.layer.name == "Waterways (wfs)"){
          $("#selected_river_span").text(" (" + feature.data.name + ")");

    	console.log(feature);
				  }
				  
  }

  function onFeatureUnselect(feature){



if(feature.layer.name === "Tourist locations (wfs)"){

		$("#one-item").hide(1000);
		$("#display-list").show(1000);
	}
else if(feature.layer.name == "Waterways (wfs)"){
$("#selected_river_span").text("");

				  }

	}


var style = {
    fillColor: '#000',
    fillOpacity: 0.1,
    strokeWidth: 0
};

var vector = new OpenLayers.Layer.Vector('My Location');

var geolocate = new OpenLayers.Control.Geolocate({
    bind: false,
    geolocationOptions: {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: 7000
    }
});

var firstGeolocation = true;
geolocate.events.register("locationupdated",geolocate,function(e) {
    vector.removeAllFeatures();
    var circle = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.Polygon.createRegularPolygon(
            new OpenLayers.Geometry.Point(e.point.x, e.point.y),
            e.position.coords.accuracy/2,
            40,
            0
        ),
        {},
        style
    );
    vector.addFeatures([
        new OpenLayers.Feature.Vector(
            e.point,
            {},
            {
                graphicName: 'circle',
                strokeColor: '#f00',
                strokeWidth: 2,
                fillOpacity: 0,
                pointRadius: 10
            }
        ),
        circle
    ]);
    if (firstGeolocation) {
        map.zoomToExtent(vector.getDataExtent());
        firstGeolocation = false;
        this.bind = true;
    }
});
geolocate.events.register("locationfailed",this,function() {
    OpenLayers.Console.log('Location detection failed');
});


var layerRoadsHighlightedFirstTime = true;
var layerRoadsHighlighted = new OpenLayers.Layer.WMS( "Highlighted Roads",
	"http://localhost:8080/geoserver/serbia_new/wms",
	{
		layers: 'serbia_new:gis.osm_roads_free_1',
		transparent: true
	},
  {
    isBaseLayer: false,
    opacity: 1
  });

$("#button-show-roads").click(function(){
	var r1 = $("#radius").val();
	var selectedArray = layerDomainData.selectedFeatures;
	var x = selectedArray[0].geometry.x;
	var y = selectedArray[0].geometry.y;
	var projWGS84 = new OpenLayers.Projection("EPSG:4326");
	var proj900913 = new OpenLayers.Projection("EPSG:900913");
	var originalPoint = new OpenLayers.Geometry.Point(x, y);
	var transformedPoint = originalPoint.transform(proj900913, projWGS84);
	layerRoadsHighlighted.params["CQL_FILTER"] = "DWITHIN(geom," + transformedPoint +"," + (r1 * r) + ",kilometers)"
	if(layerRoadsHighlightedFirstTime == true){
		map.addLayer(layerRoadsHighlighted);
		layerRoadsHighlightedFirstTime = false;
	}
	else layerRoadsHighlighted.redraw(true);
});


  $("#button-show-places-near-river").click(function(){
  	var r1 = $("#distance-from-river").val();
	var projWGS84 = new OpenLayers.Projection("EPSG:4326");
		var proj900913 = new OpenLayers.Projection("EPSG:900913");
		var arrayOfVertices = layerWaterwaysWFS.selectedFeatures[0].geometry.getVertices();
		var arrayOfPoints = new Array();
		for(var i =0; i< arrayOfVertices.length; i++){
			var originalPoint = new OpenLayers.Geometry.Point(arrayOfVertices[i].x, arrayOfVertices[i].y);
			var transformedPoint = originalPoint.transform(proj900913, projWGS84);
			arrayOfPoints.push(transformedPoint);
		}
		var lineString = new OpenLayers.Geometry.LineString(arrayOfPoints);			

  var format = new OpenLayers.Format.CQL();
  layerDomainData.filter = new OpenLayers.Filter.Spatial({
            type: OpenLayers.Filter.Spatial.DWITHIN,
            property: "geom",
            value: lineString,
            distance: r * r1,
            distanceUnits: "kilometers",
            projection: "EPSG:4326"
        });
  layerDomainData.refresh({force:true});
  });



  $("#button-show-places-in-selected-landuse").click(function(){
  	var bbox = map.getExtent().transform(map.projection, map.displayProjection);
    if($("#landuse_type").val() !== 'all')
  	layerPois.params["CQL_FILTER"] = "INTERSECTS(geom, collectGeometries(queryCollection('serbia_new:gis.osm_landuse_a_free_1', 'geom','BBOX(geom," + bbox.left + "," + bbox.bottom + "," + bbox.right + "," + bbox.top  + ") AND fclass = ''" +  $("#landuse_type").val() + "''')))";
  	else layerPois.params["CQL_FILTER"] = null;
    layerPois.redraw(true);
  });


  $('#places_type').on('change', function() {
    if(this.value !== 'all'){
      layerDomainData.filter =  new OpenLayers.Filter.Comparison({
                              type: OpenLayers.Filter.Comparison.EQUAL_TO,
                              property: "type",
                              value: this.value 
                          });
    }
    else{
      layerDomainData.filter = null;
    }
    layerDomainData.refresh({force: true});
});


var drawings = new OpenLayers.Layer.Vector("Polygon drawing");

var drawControl = new OpenLayers.Control.DrawFeature(drawings, OpenLayers.Handler.Polygon);
map.addControl(drawControl);

drawings.events.on({
    beforefeatureadded: function(event) {
        var geometry = event.feature.geometry;
        var projWGS84 = new OpenLayers.Projection("EPSG:4326");
          var proj900913 = new OpenLayers.Projection("EPSG:900913");

        var arrayOfPoints = new Array();
        for(var i = 0; i < geometry.components[0].components.length; i++){
            var originalPoint = new OpenLayers.Geometry.Point(geometry.components[0].components[i].x, geometry.components[0].components[i].y);
            var transformedPoint = originalPoint.transform(proj900913, projWGS84);

          arrayOfPoints.push(transformedPoint);
        }

        var polygon = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(arrayOfPoints));

        layerRoadsHighlighted.params["CQL_FILTER"] =  "INTERSECTS(geom," + polygon + ")" ; 
       
        if(layerRoadsHighlightedFirstTime == true){
        map.addLayer(layerRoadsHighlighted);
        layerRoadsHighlightedFirstTime = false;
        }
        else layerRoadsHighlighted.redraw(true);  

        return false;
    }
});


$('#draw_polygon_checkbox').on('change', function(){
  if($('#draw_polygon_checkbox').is(':checked')){
      map.addLayer(drawings);
      drawControl.activate();
  }
  else{
    map.removeLayer(drawings);
    if(map.getLayer(layerRoadsHighlighted)!==null){
        map.removeLayer(layerRoadsHighlighted);
    }
    
    layerRoadsHighlightedFirstTime = true;
    drawControl.deactivate();

    //layerRoadsHighlighted.params["CQL_FILTER"] = null;
  }
});

var markers = new OpenLayers.Layer.Markers( "Markers" );

var size = new OpenLayers.Size(21,25);

var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
icon = new OpenLayers.Icon('./img/marker.png', size, offset);

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
                    var lonlat = map.getLonLatFromPixel(e.xy);

                    markers.clearMarkers();

                    markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lonlat.lon, lonlat.lat),icon.clone()));
                }

            });

var click = new OpenLayers.Control.Click();                


$("#button-show-transport-near").click(function(){

    var projWGS84 = new OpenLayers.Projection("EPSG:4326");
    var proj900913 = new OpenLayers.Projection("EPSG:900913");

    var originalPoint = new OpenLayers.Geometry.Point(markers.markers[0].lonlat.lon, markers.markers[0].lonlat.lat);
    var transformedPoint = originalPoint.transform(proj900913, projWGS84);

if($("#radius_from_point").val() !== "all"){
    layerTransport.filter = new OpenLayers.Filter.Spatial({
    type: OpenLayers.Filter.Spatial.DWITHIN,
    property: "geom",
    value: transformedPoint,
    distance: r * $("#radius_from_point").val(),
    distanceUnits: "kilometers",
    projection: "EPSG:4326"
});
  }
  else {
    layerTransport.filter = null;
  }
 
 layerTransport.refresh({force: true});
});


$("#draw_marker_checkbox").on('change', function(){
  if($('#draw_marker_checkbox').is(':checked')){
      map.addLayer(markers);
      map.addControl(click);
      click.activate();
      }
      else{
        click.deactivate();
        map.removeControl(click);

        layerTransport.filter = null;
        layerTransport.refresh({force: true});

        markers.clearMarkers();

        map.removeLayer(markers);
      }
});


$("#geolocation_checkbox").on("change", function(){
  if($('#geolocation_checkbox').is(':checked')){
      map.addLayer(vector);
      map.addControl(geolocate);

         vector.removeAllFeatures();
    geolocate.deactivate();
    geolocate.watch = false;
    firstGeolocation = true;
    geolocate.activate(); 

  }
  else{
      vector.removeAllFeatures();
      geolocate.deactivate();

      map.removeLayer(vector);
      map.removeControl(geolocate);
  }
});

$("#button-locate-me").click(function(){
  geolocate.getCurrentLocation();
});


/*layerWaterwaysWFS.setVisibility(false);
layerTransport.setVisibility(false);
layerPOWS.setVisibility(false);
layerWater.setVisibility(false);
layerPois.setVisibility(false);
layerPois2.setVisibility(false);
layerLanduse.setVisibility(false);
layerBuildings.setVisibility(false);
layerRailways.setVisibility(false);
layerRoads.setVisibility(false);*/