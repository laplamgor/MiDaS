const fs = require('fs');
const http = require('http');
const { exec } = require('child_process');


function createKey(t) {
  var e = 0;
  if (null != t && "" != t)
    for (var i = 0; i < t.length; i++) {
      e += t.charCodeAt(i);
    }
  return e;
};
function create(e, i) {
  var n = {
    resource: [6657, 5699, 3371, 8909, 7719, 6229, 5449, 8561,
      2987, 5501, 3127, 9319, 4365, 9811, 9927, 2423, 3439, 1865, 5925,
      4409, 5509, 1517, 9695, 9255, 5325, 3691, 5519, 6949, 5607, 9539,
      4133, 7795, 5465, 2659, 6381, 6875, 4019, 9195, 5645, 2887, 1213,
      1815, 8671, 3015, 3147, 2991, 7977, 7045, 1619, 7909, 4451, 6573,
      4545, 8251, 5983, 2849, 7249, 7449, 9477, 5963, 2711, 9019, 7375,
      2201, 5631, 4893, 7653, 3719, 8819, 5839, 1853, 9843, 9119, 7023,
      5681, 2345, 9873, 6349, 9315, 3795, 9737, 4633, 4173, 7549, 7171,
      6147, 4723, 5039, 2723, 7815, 6201, 5999, 5339, 4431, 2911, 4435,
      3611, 4423, 9517, 3243],
  };

  var o = e.toString().match(/\d+/);
  if (null == o || 0 == o.length) return "";
  var r = parseInt(o[0]);
  var s = createKey(i);
  var a = null == i || 0 == i.length ? 1 : i.length;
  return (17 * (r + 7) * n.resource[(s + r * a) % 100] % 8973 + 1e3).toString();
};
function zeroPadding(t, e) {
  var i = t >= 0 ? "" : "-";
  t = Math.abs(t);
  for (var n = t > 0 ? Math.floor(Math.log(t) * Math.LOG10E + 1) : 1, o = "", r = 0, s = e - n; r < s; r++) {
    o += "0";
  }
  return i + o + t
};

function getShip(t, e, i) {
  // "album_status" == i ? e = !1 : 1 == o.ShipUtil.isEnemy(t) && (e = !1);
  var _ = i + (e ? "_dmg" : "")
  var u = "ship_" + _;
  var l = create(t, u);
  var c = zeroPadding(t, 4);
  return c + "_" + l;// + a.VersionUtil.getResourceVersion(0, parseInt(c));
};

// fs.writeFile(
//   'test.txt', 
//   'This is the content for the file', 
//   (error, data) => {
//     if (error) {
//       console.log(error);
//     }

//     console.log('File written successfully');
//   }
// );

let server = 'http://ooi.moe/';


let folderName = 'cache-2022-12-27';
let rawdata = fs.readFileSync(folderName + '/cache/cached.json');
let js = JSON.parse(rawdata);

const ignoredIds = [3, 4, 5, 8, 315, 333, 335, 336, 337, 338, 339, 340, 341, 342, 482];






fs.mkdirSync('./input', { recursive: true });
Object.keys(js).forEach(function (key) {

  if (key.startsWith('/kcs2/resources/ship/full')) {
    let verStr = js[key]['version'];
    verStr = "_v" + verStr.replace('?version=', '') + ".png";



    let apiId = parseInt(key.replace('/kcs2/resources/ship/full/', '').replace('/kcs2/resources/ship/full_dmg/', '').substring(0,4));
    if (apiId < 1500 && !ignoredIds.includes(apiId)) {
      
      let destFileName = './input/' + key.replace('/kcs2/resources/ship/full/', '').replace('/kcs2/resources/ship/full_dmg/', '').replace('.png', verStr);
      let srcFileName = "./" + folderName + "/cache" + key;

      if (!fs.existsSync(destFileName)) {
        fs.copyFile(srcFileName, destFileName, (err) => {
          if (err) throw err;

          console.log(srcFileName);
          console.log(destFileName);
          console.log(' -- image was copied to destination');
        });
      }
    }

  }

});
