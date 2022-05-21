// // Packages:
// import { Component, createSignal, createEffect, Show, onMount } from 'solid-js'
// import { select } from 'd3-selection'
// import { geoGraticule10, geoOrthographic, geoPath, GeoContext } from 'd3-geo'
// import { now as d3Now } from 'd3-timer'


// // Functions:
// const Globe = () => {
//   // Constants:
//   var rotationDelay = 3000
//   // scale of the globe (not the canvas element)
//   var scaleFactor = 0.9
//   // autorotation speed
//   var degPerSec = 6
//   // start angles
//   var angles = { x: -20, y: 40, z: 0}
//   // colors
//   var colorWater = '#fff'
//   var colorLand = '#111'
//   var colorGraticule = '#ccc'
//   var colorCountry = '#a00'

//   // Variables:
//   var current = select('#current')
//   var canvas = select<HTMLCanvasElement, null>('#globe')
//   var context = canvas.node()?.getContext('2d') as GeoContext
//   var water = {type: 'Sphere'}
//   var projection = geoOrthographic().precision(10)
//   var graticule = geoGraticule10()
//   var path = geoPath(projection).context(context)
//   var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
//   var r0 // Projection rotation as Esuler angles at start.
//   var q0 // Projection rotation as versor at start.
//   var lastTime = d3Now()
//   var degPerMs = degPerSec / 1000
//   var width, height
//   var land
//   var autorotate, now, diff, roation

//   // Functions:
//   function setAngles() {
//     var rotation = projection.rotate()
//     rotation[0] = angles.y
//     rotation[1] = angles.x
//     rotation[2] = angles.z
//     projection.rotate(rotation)
//   }
  
//   function scale() {
//     width = document.documentElement.clientWidth
//     height = document.documentElement.clientHeight
//     canvas.attr('width', width).attr('height', height)
//     projection
//       .scale((scaleFactor * Math.min(width, height)) / 2)
//       .translate([width / 2, height / 2])
//     render()
//   }
  
//   function startRotation(delay) {
//     autorotate.restart(rotate, delay || 0)
//   }
  
//   function stopRotation() {
//     autorotate.stop()
//   }
  
//   function dragstarted() {
//     v0 = versor.cartesian(projection.invert(d3.mouse(this)))
//     r0 = projection.rotate()
//     q0 = versor(r0)
//     stopRotation()
//   }
  
//   function dragged() {
//     var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
//     var q1 = versor.multiply(q0, versor.delta(v0, v1))
//     var r1 = versor.rotation(q1)
//     projection.rotate(r1)
//     render()
//   }
  
//   function dragended() {
//     startRotation(rotationDelay)
//   }
  
//   function render() {
//     context.clearRect(0, 0, width, height)
//     fill(water, colorWater)
//     stroke(graticule, colorGraticule)
//     fill(land, colorLand)
//   }
  
//   function fill(obj, color) {
//     context.beginPath()
//     path(obj)
//     context.fillStyle = color
//     context.fill()
//   }
  
//   function stroke(obj, color) {
//     context.beginPath()
//     path(obj)
//     context.strokeStyle = color
//     context.stroke()
//   }
  
//   function rotate(elapsed) {
//     now = d3.now()
//     diff = now - lastTime
//     if (diff < elapsed) {
//       rotation = projection.rotate()
//       rotation[0] += diff * degPerMs
//       projection.rotate(rotation)
//       render()
//     }
//     lastTime = now
//   }
  
//   function loadData(cb) {
//     d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
//       if (error) throw error
//       d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
//         if (error) throw error
//         cb(world, countries)
//       })
//     })
//   }

//
// Configuration
//

// // ms to wait after dragging before auto-rotating
// var rotationDelay = 3000
// // scale of the globe (not the canvas element)
// var scaleFactor = 0.9
// // autorotation speed
// var degPerSec = 6
// // start angles
// var angles = { x: -20, y: 40, z: 0}
// // colors
// var colorWater = '#fff'
// var colorLand = '#111'
// var colorGraticule = '#ccc'
// var colorCountry = '#a00'

// //
// // Variables
// //

// var current = d3.select('#current')
// var canvas = d3.select('#globe')
// var context = canvas.node().getContext('2d')
// var water = {type: 'Sphere'}
// var projection = d3.geoOrthographic().precision(10)
// var graticule = d3.geoGraticule10()
// var path = d3.geoPath(projection).context(context)
// var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
// var r0 // Projection rotation as Euler angles at start.
// var q0 // Projection rotation as versor at start.
// var lastTime = d3.now()
// var degPerMs = degPerSec / 1000
// var width, height
// var land
// var autorotate, now, diff, roation

// //
// // Functions
// //

// function setAngles() {
//   var rotation = projection.rotate()
//   rotation[0] = angles.y
//   rotation[1] = angles.x
//   rotation[2] = angles.z
//   projection.rotate(rotation)
// }

// function scale() {
//   width = document.documentElement.clientWidth
//   height = document.documentElement.clientHeight
//   canvas.attr('width', width).attr('height', height)
//   projection
//     .scale((scaleFactor * Math.min(width, height)) / 2)
//     .translate([width / 2, height / 2])
//   render()
// }

// function startRotation(delay) {
//   autorotate.restart(rotate, delay || 0)
// }

// function stopRotation() {
//   autorotate.stop()
// }

// function dragstarted() {
//   v0 = versor.cartesian(projection.invert(d3.mouse(this)))
//   r0 = projection.rotate()
//   q0 = versor(r0)
//   stopRotation()
// }

// function dragged() {
//   var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
//   var q1 = versor.multiply(q0, versor.delta(v0, v1))
//   var r1 = versor.rotation(q1)
//   projection.rotate(r1)
//   render()
// }

// function dragended() {
//   startRotation(rotationDelay)
// }

// function render() {
//   context.clearRect(0, 0, width, height)
//   fill(water, colorWater)
//   stroke(graticule, colorGraticule)
//   fill(land, colorLand)
// }

// function fill(obj, color) {
//   context.beginPath()
//   path(obj)
//   context.fillStyle = color
//   context.fill()
// }

// function stroke(obj, color) {
//   context.beginPath()
//   path(obj)
//   context.strokeStyle = color
//   context.stroke()
// }

// function rotate(elapsed) {
//   now = d3.now()
//   diff = now - lastTime
//   if (diff < elapsed) {
//     rotation = projection.rotate()
//     rotation[0] += diff * degPerMs
//     projection.rotate(rotation)
//     render()
//   }
//   lastTime = now
// }

// function loadData(cb) {
//   d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
//     if (error) throw error
//     d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
//       if (error) throw error
//       cb(world, countries)
//     })
//   })
// }

// // https://github.com/d3/d3-polygon
// function polygonContains(polygon, point) {
//   var n = polygon.length
//   var p = polygon[n - 1]
//   var x = point[0], y = point[1]
//   var x0 = p[0], y0 = p[1]
//   var x1, y1
//   var inside = false
//   for (var i = 0; i < n; ++i) {
//     p = polygon[i], x1 = p[0], y1 = p[1]
//     if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
//     x0 = x1, y0 = y1
//   }
//   return inside
// }


// //
// // Initialization
// //

// setAngles()

// canvas
//   .call(d3.drag()
//     .on('start', dragstarted)
//     .on('drag', dragged)
//     .on('end', dragended)
//    )

// loadData(function(world) {
//   land = topojson.feature(world, world.objects.land)
  
//   window.addEventListener('resize', scale)
//   scale()
//   autorotate = d3.timer(rotate)
// })

//   // Return:
//   return (
//     <div>Globe</div>
//   )
// }


// // Exports:
// export default Globe
export default 1