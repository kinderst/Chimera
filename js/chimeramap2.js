/*NOTES
Checking iconScales and Tooltip location
*/

(function() {

    $(document).ready(function() {
      /*
      OVERWRITE CSS IN HOME PAGE. DOING THIS BECAUSE DID NOT WANT TO
      MAKE SEPARATE JS FILE
      */
      //Overwrite the !important css for mobile on banner image
      //descriptions
      //for the banner, had to do because line-height is !important
      //on squarespace
      $('.meta-description p:nth-child(2)').each(function () {
        this.style.setProperty( 'line-height', '1', 'important' );
        this.style.setProperty('font-size', '4vw', 'important');
      });
      //should make the non-background for img desc for carousel here
      var i = 0;
      $('.meta-description p:nth-child(2)').each(function () {
        if (i === 1) {
          this.style.setProperty( 'line-height', '1', 'important' );
          this.style.setProperty('font-size', '4vw', 'important');
        }
        i++;
      });


      //Have nav bar fade to red when done scrolling over
      //banner image
      var bannerHeight = $('#promotedGalleryWrapper').height();
      //console.log(bannerHeight);
      $(window).scroll(function() {
        if ($(this).scrollTop() < (bannerHeight - 100)) {
          $("#header").css("background-color", "transparent");
          } else if ($(this).scrollTop() < bannerHeight) {
          var bgOpacity = ($(this).scrollTop() - (bannerHeight - 100)) / 100;
          //console.log(bgOpacity);
            $("#header").css("background-color", "rgb(250, 0, 32, " + bgOpacity + ")");
        } else {
            $("#header").css("background-color", "rgb(250, 0, 32)");
        }
        //console.log($(this).scrollTop());
      });

      /*
      END JS/CSS FOR HOME PAGE
      */

      //Set the width and height of the entire map,
      //the icon image width size, and the default 
      //transition time, and active item to null
      //var width = 700,
      var width = 600,
          //height = 500,
          height = 400,
          imgWidth = 40,
          transitionTime = 750,
          iconScale = d3.scaleLinear().domain([1, 8]).range([23, 24]),
          active = d3.select(null);

      //Define projection type, initial zoom size and
      //centering location
      var projection = d3.geoModifiedStereographicLee() // updated for d3 v4
          .scale(300)
          //.translate([width / 2, height / 2])
          .translate([(width / 2) + 300, (height / 2) + 125]);

      //Set the zoom variable to allow for click
      //to zoom functionality
      var zoom = d3.zoom()
          // no longer in d3 v4 - zoom initialises with zoomIdentity, so it's already at origin
          // .translate([0, 0]) 
          // .scale(1) 
          .scaleExtent([1, 8])
          .on("zoom", zoomed);

      //Set the path variable to draw the paths
      //of the countries (based on the projection)
      var path = d3.geoPath() // updated for d3 v4
          .projection(projection);

      //Initialize entire svg with proper size
      var svg = d3.select("#maparea").append("svg")
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 600 400")
          .classed("svg-content-responsive", true)
          .on("click", stopped, true);

      //Append a background to the landscape
      svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height)
          .on("click", reset);

      //Append the notorious "g"
      var g = svg.append("g");

      //Initialize tooltip, which is initially invisible
      var tooltip = d3.select("#maparea").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      //Initialize overlay for initial click icon modal
      var overlay = d3.select("#maparea").append("div")
        .attr("class", "iconoverlay")
        .attr("width", width)
        .attr("height", height)
        .style("opacity", 0.9)
        .html("<h1>Click icons to display info</h1><h2>(Click to dismiss)</h2><img class='overlayimg' src='/Chimera/images/chimera-logo-nobg-arrow.png' />");

      //Allow for free zooming
      svg
          .call(zoom); // delete this line to disable free zooming
          // .call(zoom.event); // not in d3 v4

      // //Read in the world geography data about country shapes
      // d3.json("world.json", function(error, world) {
      //   if (error) throw error;

        //Append the countries to the landscape
        g.selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
          .enter().append("path")
            .attr("d", path)
            .attr("class", "feature")
            .on("click", clicked);

        //Append the mesh
        g.append("path")
            .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "mesh")
            .attr("d", path);

        //give the location as it if were csv
        //note western hemisphere coordinates must be negative
        //add images
        var loc = [
          //{location:"China",locid:156,lat:26.65,lon:106.63,name:"Pork Belly Bao",imgsrc:"porkbellybao.jpg",desc:"fresh house-made organic ramen noodle, house broth, pork belly, enoki, sprout, seaweed, soft egg"},
          //{location:"Tokyo, Japan",locid:392,lat:32.15,lon:130.88,name:"Hamachi Sashimi",imgsrc:"crudo-opt-tiny.jpg",desc:"yuzu, tobiko, ponzu, jalapeño"},
          //{location:"Taiwan",locid:158,lat:23.70,lon:120.96,name:"Shanghai Xiao Long Bao",imgsrc:"xlb-opt-tiny.jpg",desc:"handmade soup dumpling with crabmeat, pork"},
          //{location:"Shanghai, China",locid:156,lat:39.90,lon:116.41,name:"Everybody Chow Fun",imgsrc:"chow-fun-opt-tiny.jpg",desc:"Redbird Farm chicken, rice ribbon noodle, baby Shanghai bok choy, sprout, oyster sauce, soy sauce, fish sauce, chili paste, ginger, garlic, scallion, sub vegan +0 sub shrimp +3"},
          {location:"Japan",locid:392,lat:43.06,lon:141.35,name:"Chimera Ramen",imgsrc:"ramen-opt-tiny.jpg",desc:"fresh house-made organic ramen noodle, house broth, pork belly, enoki, sprout, seaweed, soft egg"},
          //{location:"South Korea",locid:410,lat:36.51,lon:127.17,name:"Seafood Soon Dubu",imgsrc:"soon-dubu-opt-tiny.jpg",desc:"SPICY Korean hotpot of prawn, clam, mussel, squid, silken tofu, enoki mushroom, kimchi, onion, poached egg, fish stock, banchan trio rice"}
          //Bulgogi Korea BBQ (Image from insta)
          {location:"South Korea",locid:410,lat:35.90,lon:127.76,name:"Bulgogi Korean BBQ",imgsrc:"bulgogi-korean-bbq.jpg",desc:"fresh house-made organic ramen noodle, house broth, pork belly, enoki, sprout, seaweed, soft egg"},
          //Thai Curry (Thailand) (Curry with the shrimp, images in email curry w/shrimp)
          {location:"Thailand",locid:764,lat:15.90,lon:100.76,name:"Shrimp with Thai Curry",imgsrc:"shrimp-curry.jpg",desc:"Green coconut curry, shrimp, rice, mixed vegetables, cilantro, lime"},
          //Duck Dumpling (China Lower Coastal (Bangkok), email of pic with dumplings and purple flower/sauce)
          {location:"China",locid:156,lat:22.32,lon:114.16,name:"Duck Dumpling (4)",imgsrc:"duck-dumplings.jpg",desc:""},
          //*Spicy Green Papaya Salad with grilled shrimp (Southern (Ho Chi Mihn) Vietnam)
          {location:"Ho Chi Minh, Vietnam",locid:704,lat:10.82,lon:106.63,name:"*Spicy Green Papaya Salad <i>with Grilled Shrimp</i>",imgsrc:"spicy-green-papaya-salad.jpg",desc:"Papaya, long bean, carrot, mint, basil, peanuts, shrimp with a Thai chili-lime dressing"}
        ];
        //Append the location items
        //d3.csv("locationsmall.csv", function(error, loc) {
          g.selectAll("location")
             .data(loc)
             .enter()
             .append("svg:image")
             .attr("x", function(d) {
                return projection([+d.lon, +d.lat])[0];
             })
             .attr("y", function(d) {
                return projection([+d.lon, +d.lat])[1];
             })
             /*
             .attr("width", imgWidth)
             .attr("height", imgWidth)
             .attr("width", Math.log(3 * (1 + 1)) * 10)
             .attr("height", Math.log(3 * (1 + 1)) * 10)
             */
             .attr("width", iconScale(1))
             .attr("height", iconScale(1))
             .style("opacity", 1)
             .attr("class", "location")
             .attr("xlink:href", function(d) {
                /*
                if (d.name == "Chashu Ramen") {
                  return "/s/ramen.png";
                } else if (d.name == "Everybody Chow Fun") {
                  return "/s/chow-fun.JPG";
                */
                return "/Chimera/images/chimera-logo-nobg-arrow.png";
             })
             .on("click", clickedIcon);
        //});
      // });

      //When a country is clicked, zoom into the country
      //and turn the country red
      function clicked(d) {
        //if we already had the country selected
        if (active.node() === this) return reset();
        //Make this item be the active item
        active.classed("active", false);
        /*
        active = d3.select(this).classed("active", true);
        active.style("opacity", function(d) {
          console.log(d);
          return 0.8;
        });
        */
        var countryId = 0;
        active = d3.select(this).classed("active", function(d) {
          countryId = +d.id;
          //console.log(countryId);
          return true;
        });

        //Calculate the scale and the translation
        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        /*
        //Get all the food items that come from the clicked
        //country id into html format
        var theHtml = "";
        for (var i = 0; i < loc.length; i++) {
          if (+loc[i].locid === +countryId) {
            theHtml += "<div class='ttrow'><h1>" + loc[i].name + "</h1><h2>" + loc[i].location + "</h2></div><div class='ttitem'><img src='/s/ramen.png' /></div>"
          }
        }
        */

        //Update tooltip
        //Check if screen width < 650px
        //If so, display tooltip below map since you don't have
        //much width but extra height for the tooltip
        var windowWidth = $(window).width();
        if (windowWidth < 450) {
          //Get all the food items that come from the clicked
          //country id into html format
          //Creates a row with two columns, the info and a pic
          var theHtml = "";
          for (var i = 0; i < loc.length; i++) {
            if (+loc[i].locid === +countryId) {
              theHtml += "<div class='ttrow'><div class='ttcol'><img src='/Chimera/images/" + loc[i].imgsrc + "' /></div><div class='ttcol text-align-left'><h1>" + loc[i].name + "</h1><h2>" + loc[i].location + "</h2><p>" + loc[i].desc + "</p></div></div>"
            }
          }

          tooltip.style("position", "relative")
            .style("display", "block")
            .style("width", "100%")
            .style("right", 0 + "px")
            .html(theHtml);
        } else {
          //If not, display tooltip inside map since you do
          //have enough space in map probably
          //Creates rows of image, then info, etc.
          var theHtml = "";
          for (var i = 0; i < loc.length; i++) {
            if (+loc[i].locid === +countryId) {
              theHtml += "<div class='ttrowblock'><div><img src='/Chimera/images/" + loc[i].imgsrc + "' /></div><div><h1>" + loc[i].name + "</h1><h2>" + loc[i].location + "</h2><p>" + loc[i].desc + "</p></div></div>"
              if (windowWidth < 625) {
                //If in landscape mobile, exit loop once one is found
                i += 100;
              }
            }
          }


          var tooltipWidth = Math.min((windowWidth / 4.5), 150);
          tooltip.style("position", "absolute")
            .style("display", "inline")
            .style("right", 30 + "px")
            .style("top", 0 + "px")
            .style("width", tooltipWidth + "px")
            .html(theHtml);
        }

        //Fade tooltip and new html in
        tooltip.transition()
            .duration(transitionTime)
            .style("opacity", 1);

        //Transition the view
        svg.transition()
            .duration(transitionTime)
            // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
            .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
      }

      function clickedIcon(d) {
        //If clicking the same active location icon
        if (active.node() === this) return reset();
        //Update active item
        active.classed("active", false);
        active = d3.select(this).classed("active", true);
        //Reset all location items to original opacity
        g.selectAll(".location")  
          .style("opacity", 1);
        //Set this location item to opaque
        d3.select(this).style("opacity", 1);

        //Get the bounding box coordinates of this icon
        //Then calculate scale and translation
        var bbox = this.getBBox();
            bounds = [[bbox.x, bbox.y], [bbox.x + bbox.width, bbox.y + bbox.height]],
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        //Update tooltip
        //Check if screen width < 650px
        //If so, display tooltip below map since you don't have
        //much width but extra height for the tooltip
        var windowWidth = $(window).width();
        if (windowWidth < 450) {
          //add the html and update it
          var theHtml = "<div class='ttrow'><div class='ttcol'><img src='/Chimera/images/" + d.imgsrc + "' /></div><div class='ttcol text-align-left'><h1>" + d.name + "</h1><h2>" + d.location + "</h2><p>" + d.desc + "</p></div></div>";
          /*
          tooltip.style("position", "relative")
            .style("display", "block")
            .style("width", "100%")
            .style("right", 0 + "px")
            .html(theHtml);
          */
          tooltip.style("position", "relative")
            .style("display", "flex")
            .style("justify-content", "center")
            .style("width", "100%")
            .style("right", 0 + "px")
            .html(theHtml);
        } else {
          //If not, display tooltip inside map since you do
          //have enough space in map probably

          var theHtml = "<div class='ttrowblock'><div><img src='/Chimera/images/" + d.imgsrc + "' /></div><div><h1>" + d.name + "</h1><h2>" + d.location + "</h2><p>" + d.desc + "</p></div></div>"

          var tooltipWidth = Math.min((windowWidth / 4.5), 150);
          tooltip.style("position", "absolute")
            .style("display", "inline")
            .style("right", 30 + "px")
            .style("top", 0 + "px")
            .style("width", tooltipWidth + "px")
            .html(theHtml);
        }

        //.html("<h1>" + d.name + "</h1><h2>" + d.location + "</h2><p>" + d.desc + "</p><img src='/s/chow-fun.JPG' />");
        
        //Fade tooltip in
        tooltip.transition()
            .duration(transitionTime)
            .style("opacity", 1);

        //Transition the view
        svg.transition()
            .duration(transitionTime)
            //.call(zoom.translate(translate).scale(scale).event);
            .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );
      }
      
      //Reset the screen back to original settings
      function reset() {
        //Reset the active class
        active.classed("active", false);
        active = d3.select(null);

        //Reset all "location" icons, in case one
        //was clicked
        g.selectAll(".location")  
          .style("opacity", 1);

        //Transition the tooltip back to invisible
        tooltip.transition()
            .duration(transitionTime)
            .style("opacity", 0);
        //If width is less than 650,
        //set HTML of tooltip to none so it doesn't take up space
        //but still has fade if width > 650
        if ($(window).width() < 450) {
          tooltip.html("");
        }

        svg.transition()
            .duration(transitionTime)
            // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
            .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
      }

      //Update the elements when the screen is zoomed
      function zoomed() {
        g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
        // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
        g.attr("transform", d3.event.transform); // updated for d3 v4
        g.selectAll(".location")
          .attr("width", iconScale(d3.event.transform.k))
          //.attr("width", Math.log(iconScale(d3.event.transform.k)))
          .attr("height", iconScale(d3.event.transform.k));
          /*
          .attr("width", Math.log(3 * (1 + d3.event.transform.k)) * 10)
          .attr("height", Math.log(3 * (1 + d3.event.transform.k)) * 10);
          .attr("width", 40 / d3.event.transform.k)
          .attr("height", 40 / d3.event.transform.k);
          */
      }

      // If the drag behavior prevents the default click,
      // also stop propagation so we don’t click-to-zoom.
      function stopped() {
        if (d3.event.defaultPrevented) d3.event.stopPropagation();
        overlay.transition()
          .duration(transitionTime)
          .style("opacity", 0);

        /*
        Scroll page into view
        */
        console.log("Scrolling into view");
        //$("#maparea")[0].scrollIntoView();
        //document.body.scrollTop -= 200;
        /*
        $("#maparea")[0].scrollIntoView({
            behavior: "smooth" // or "auto" or "instant"
            //block: "start" // or "end"
        });
        */
        //el.scrollIntoView(true);
        //if on mobile (landscape or portrait)
        if ($(window).width() < 650) {
          //WORKS FOR MOBILE
          $("#maparea")[0].scrollIntoView();
          window.scrollBy(0, -55);
        } else {
          //WORKS FOR DESKTOP
          $("#maparea")[0].scrollIntoView();
          window.scrollBy(0, -105);
        }
      }

      /*
      //disables the overlay
      function disableOverlay() {
        //console.log("hey");
        //overlay.attr("pointer-events", "none");
        overlay.transition()
          .duration(transitionTime)
          .style("opacity", 0);
          //.attr("display", "none");
      }
      */
    });
})();