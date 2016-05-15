---
layout: project-page
title: "Odd Lots: Queens 1974-2016 and Brooklyn 2016"
linkname: eichner_oddlots
author: "Sara Eichner"
tagline: "Interactive map of Gordon Matta-Clark's Fake Estate projects from 1974 and a look at odd tax lots in Brooklyn, 2016"
location:
    - place: Brooklyn, NY, USA
project-link: 
    - href: http://eichners.github.io/FinalProject_oddlots/StoryMap/StoryMap_oddlots.html
tags: land use, tax lots
thumbnail-path: img/eichner_oddlots/openingpage.png
img-folder: ../../img/eichner_oddlots/
timestamp: 12/21/2015 21:35:15
---

While working on another project with PLUTO tax lot data I started noticing these little slices of land that were too small for buildings. I also noticed that NYC has official designations and classifications for these lots that affect what can be built there, on the neighboring lots, and taxes that are collected by the city. The designations must also impact urban planning and development. I thought of Gordon Matta-Clark's Fake Estate project from the 70's and looked to see if this project had been mapped digitally. Finding it hadn't I decided to map them online and to explore the same sort of tax lot in Brooklyn in 2016. 

<iframe width="100%" height="500" src="http://eichners.github.io/FinalProject_oddlots/StoryMap/StoryMap_oddlots.html">
</iframe>

I collected data about the Matta-Clark project from a book (Cabinet Magaine Books: "Odd Lots, Revisiting Gordon Matta-Clark's Fake Estates". Edited by Jeffrey Kastner, Sina Najafi, Frances Richard. ©2005.) and I also researched each lot on NYC Oasis and Acris to find more about the property ownership history and how they came to be in the first place. Some data was easy to find and some was more difficult because a few of the lots no longer exist. In those circumstances I found the address of the former lot and looked up an existing one next door. I then looked up the 1965 tax lot maps on ACRIS and was able to get some imformation about what happened there. 

I used the PLUTO data for the map polygons and for context. In order to use this large dataset for Brooklyn and Queens I decided to make the map in Cartodb, store the datat there, and use the cartodb.jsVis map form so that the PLUTO data would be manageable.Because this data is the primary context for the project and because I love the regularities and irregularities of this urban grid, I wanted to eliminate all other visual information in the map. I did this by creating a simple basemap in Mapbox. I discovered many classification errors in the PLUTO dataset. I updated many of the lot designations to a new dataset, but that process is incomplete and many misclassified lots are still present on the Brooklyn map.

I used the StoryMap jQuery plugin to create a narrative that ties to the geography of each lot from the Fake Estates project. I found the code and instructions online at: https://github.com/atlefren/storymap
This plug in was created for a leaflet map and I used a cartodb.jsVis map for the story map so some changes to the javascript file were made so that the cartodb map is created before the plugin runs. Variables were created outside of the .done function so that the data is loaded before the function is called.

I then restyled the story map and added documents found on ACRIS showing city foreclosure documents, photos, deeds, and historic tax lots. 

![]({{ page.img-folder }}GMCoddlots_deedtransfer.png)
Image: screen shot of Queens Odd Lots Map showing property transfer deed from Gordon Matta-Clark's purchase

After covering the Matta-Clark project, I used the data to calculate some statistics about the same sort of tax lots in Brooklyn. I used various SQL queries and will do a few more to show the total area of unaccessible lots and to show the smallest and narrowest lots in the database. 

![]({{ page.img-folder }}taxlottaxonomyexample.png)
Screen shot showing a submerged lot in Brooklyn and the statistics on left

Then the map links to a full screen map of Brooklyn where one can explore the different categories of unusual or unusable tax lots in Brooklyn.

![]({{ page.img-folder }}BrooklynOddlots2016.png)
Screen shot of Brooklyn Odd Lots 2016

<iframe width="100%" height="500" src="http://eichners.github.io/FinalProject_oddlots/StoryMap/StoryMap_oddlots.html">
</iframe>

I also created a map that uses an api to get a street view of each lot address-- this map is kind of a placeholder for now. I used another project and got it as far as getting the code to work. However, a better way to see what is going on on these lots would be to link each lot to an aerial view. I'd like to do this by creating a linked inset map that shows a satelite view. A plugin for this leaflet minimap can be found at: https://github.com/Norkart/Leaflet-MiniMap. I am not yet sure if I'll be able to use this within the cartodb.vis context but will try outside of the class. 

![]({{ page.img-folder }}streetview.png)

That map is [here](http://eichners.github.io/FinalProject_oddlots/StoryMap/streetView_oddLots/streetView_oddlots.html), and the code is on [GitHub](https://github.com/eichners/FINAL_PROJECT.git).
