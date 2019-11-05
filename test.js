//comment at the beginning 1
function hslToRgb (h, s, l) {
  if (s === 0) return [l, l, l] /* multiple lines at random place */
  h /= 360

  var q = l < 0.5 ? l * (1 + s) : l + s - l * s
  var p = 2 * l - q
 /* multiple
	lines
		comment */
  return [
    Math.round(hueToRgb(p, q, h + 1/3) * 255), 
    Math.round(hueToRgb(p, q, h) * 255), 
    /* multiple lines comment without multiple lines*/
    Math.round(hueToRgb(p, q, h - 1/3) * 255) //comment at random place 
  ]
}

           //test comment whitespaces


           /*test comment whitespaces*/

//test comment whitespaces
//test
/*test comment whitespaces*/
//comment at the beginning 1
//test comment whitespaces
function hueToRgb (p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1/6) return p + (q - p) * 6 * t
  if (t < 1/2) return q
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
  return p;
}

var string = '/*Hello World!*/'; // comment inside string (should not be removed)
var string = "/*Hello World!*/"; 
var regex_1 = "/*b", regex_2 = /.*/g; // comment inside regex (same story)
var https = 'https://urls.are.preserved.for.you';
//var really_hard_regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
var really_hard_regex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
var variable/with/mistake/parser/would/be/broken/on/this;