/* jshint node: true */
'use strict';

var bodyParser = require('body-parser'),
  express = require('express'),
  http = require('http'),
  fs = require('fs'),
  Path = require('path');

// Our server start function
module.exports = function startServer(port, path, callback) {
  var app = express();
  var server = http.createServer(app);

  // We’ll just store entries sent through REST in-memory here
  var items = [];

  // Basic middlewares: static files, logs, form fields
  app.use(express.static(Path.join(__dirname, path)));
  app.use(bodyParser.urlencoded({ extended: true }));

  // GET `/items` -> JSON for the entries array
  app.get('/items', function(req, res) {
    res.json(items);
  });

  app.get('/patient_info.php', function(req, res) {
    res.json([{ "userId": "1", "gender": "1", "dateOfBirth": "1930-01-28", "diagnosis": "Juven.osteochond.-arm\/hand NOS" }, { "userId": "2", "gender": "0", "dateOfBirth": "1930-01-30", "diagnosis": "Exten contracture of toe IPJ" }, { "userId": "3", "gender": "1", "dateOfBirth": "1930-03-09", "diagnosis": "Juvenile apophysitis NOS" }, { "userId": "4", "gender": "0", "dateOfBirth": "1930-04-23", "diagnosis": "Haemarthrosis of elbow" }, { "userId": "5", "gender": "1", "dateOfBirth": "1930-05-03", "diagnosis": "Osteophyte" }, { "userId": "6", "gender": "0", "dateOfBirth": "1930-09-10", "diagnosis": "Biceps tendinitis" }, { "userId": "7", "gender": "1", "dateOfBirth": "1930-11-16", "diagnosis": "Flexion contracture-toe joint" }, { "userId": "8", "gender": "0", "dateOfBirth": "1930-12-05", "diagnosis": "Generalised arthritis" }, { "userId": "9", "gender": "0", "dateOfBirth": "1930-12-14", "diagnosis": "OA NOS-sternoclavicular joint" }, { "userId": "10", "gender": "0", "dateOfBirth": "1931-01-06", "diagnosis": "Unsp.osteomyelitis-forearm" }, { "userId": "11", "gender": "1", "dateOfBirth": "1931-01-11", "diagnosis": "Other joint sympt.-hand" }, { "userId": "12", "gender": "1", "dateOfBirth": "1931-03-31", "diagnosis": "Juvenile apophysitis NOS" }, { "userId": "13", "gender": "1", "dateOfBirth": "1931-04-09", "diagnosis": "Osteoradionecrosis" }, { "userId": "14", "gender": "1", "dateOfBirth": "1931-06-06", "diagnosis": "Dissuse osteoporosis" }, { "userId": "15", "gender": "0", "dateOfBirth": "1931-06-25", "diagnosis": "Arthr.+mycoses-hand" }, { "userId": "16", "gender": "0", "dateOfBirth": "1931-07-14", "diagnosis": "Haemarthrosis of elbow" }, { "userId": "17", "gender": "1", "dateOfBirth": "1931-07-16", "diagnosis": "Other thoracic disc disorders" }, { "userId": "18", "gender": "1", "dateOfBirth": "1931-08-01", "diagnosis": "[X]Other secondary gout" }, { "userId": "19", "gender": "0", "dateOfBirth": "1931-09-10", "diagnosis": "Biceps tendinitis" }, { "userId": "20", "gender": "0", "dateOfBirth": "1931-10-27", "diagnosis": "Infective myositis" }, { "userId": "21", "gender": "0", "dateOfBirth": "1931-11-14", "diagnosis": "Osteophyte" }, { "userId": "22", "gender": "1", "dateOfBirth": "1931-11-15", "diagnosis": "Infective myositis" }, { "userId": "23", "gender": "1", "dateOfBirth": "1931-11-24", "diagnosis": "Arthralgia of elbow" }, { "userId": "24", "gender": "1", "dateOfBirth": "1931-12-23", "diagnosis": "Stiff joint NEC-other specif." }, { "userId": "25", "gender": "1", "dateOfBirth": "1932-01-11", "diagnosis": "Generalised arthritis" }, { "userId": "26", "gender": "1", "dateOfBirth": "1932-01-16", "diagnosis": "Bankart lesion" }, { "userId": "27", "gender": "0", "dateOfBirth": "1932-01-21", "diagnosis": "Arth+oth.inf\/para-other specif" }, { "userId": "28", "gender": "1", "dateOfBirth": "1932-02-04", "diagnosis": "[X]Oth specified dorsopathies" }, { "userId": "29", "gender": "1", "dateOfBirth": "1932-06-04", "diagnosis": "Unsp.osteomyelitis-forearm" }, { "userId": "30", "gender": "0", "dateOfBirth": "1932-06-23", "diagnosis": "Other thoracic disc disorders" }, { "userId": "31", "gender": "1", "dateOfBirth": "1932-07-04", "diagnosis": "Haemarthrosis of elbow" }, { "userId": "32", "gender": "0", "dateOfBirth": "1932-08-11", "diagnosis": "[X]O chr h'matogens osteomylit" }, { "userId": "33", "gender": "1", "dateOfBirth": "1932-08-23", "diagnosis": "OA NOS-sternoclavicular joint" }, { "userId": "34", "gender": "1", "dateOfBirth": "1932-08-30", "diagnosis": "Local.primary OA-hand" }, { "userId": "35", "gender": "1", "dateOfBirth": "1932-10-16", "diagnosis": "Osteophyte" }, { "userId": "36", "gender": "1", "dateOfBirth": "1932-11-18", "diagnosis": "Dissuse osteoporosis" }, { "userId": "37", "gender": "1", "dateOfBirth": "1932-12-03", "diagnosis": "Generalised arthritis" }, { "userId": "38", "gender": "0", "dateOfBirth": "1932-12-04", "diagnosis": "Algodystrophy of knee" }, { "userId": "39", "gender": "0", "dateOfBirth": "1932-12-17", "diagnosis": "Generalised arthritis" }, { "userId": "40", "gender": "0", "dateOfBirth": "1933-01-11", "diagnosis": "[X]O spcf intrvrtbrl disc diso" }, { "userId": "41", "gender": "1", "dateOfBirth": "1933-01-14", "diagnosis": "Flexion contracture-toe joint" }, { "userId": "42", "gender": "0", "dateOfBirth": "1933-02-21", "diagnosis": "Joint derangement NOS" }, { "userId": "43", "gender": "1", "dateOfBirth": "1933-04-02", "diagnosis": "Oth.inf.+bone dis-shoulder" }, { "userId": "44", "gender": "1", "dateOfBirth": "1933-04-28", "diagnosis": "Other thoracic disc disorders" }, { "userId": "45", "gender": "1", "dateOfBirth": "1933-05-17", "diagnosis": "Oth.inf.+bone dis-shoulder" }, { "userId": "46", "gender": "0", "dateOfBirth": "1933-06-18", "diagnosis": "Rheumatoid arthritis of hip" }, { "userId": "47", "gender": "1", "dateOfBirth": "1933-07-14", "diagnosis": "Abscess of tendon-arm" }, { "userId": "48", "gender": "0", "dateOfBirth": "1933-08-31", "diagnosis": "Other spondyloses\/allied dis." }, { "userId": "49", "gender": "0", "dateOfBirth": "1933-10-30", "diagnosis": "Arthralgia of wrist" }, { "userId": "50", "gender": "0", "dateOfBirth": "1933-11-01", "diagnosis": "Arthropathy NOS-site unspecif." }, { "userId": "51", "gender": "0", "dateOfBirth": "1934-01-11", "diagnosis": "Dissuse osteoporosis" }, { "userId": "52", "gender": "1", "dateOfBirth": "1934-02-08", "diagnosis": "Haemarthrosis of elbow" }, { "userId": "53", "gender": "0", "dateOfBirth": "1934-02-27", "diagnosis": "Infective myositis" }, { "userId": "54", "gender": "1", "dateOfBirth": "1934-02-28", "diagnosis": "Arthr.+mycoses-hand" }, { "userId": "55", "gender": "0", "dateOfBirth": "1934-06-20", "diagnosis": "Dissuse osteoporosis" }, { "userId": "56", "gender": "1", "dateOfBirth": "1934-07-19", "diagnosis": "Osteoradionecrosis" }, { "userId": "57", "gender": "1", "dateOfBirth": "1934-09-06", "diagnosis": "Acquired deformity of nose" }, { "userId": "58", "gender": "0", "dateOfBirth": "1934-09-08", "diagnosis": "Chondroc.-pyrophos.-shoulder" }, { "userId": "59", "gender": "1", "dateOfBirth": "1934-12-17", "diagnosis": "Flexion contracture-toe joint" }, { "userId": "60", "gender": "1", "dateOfBirth": "1934-12-30", "diagnosis": "Other symptoms - distal RUJ" }, { "userId": "61", "gender": "0", "dateOfBirth": "1935-02-14", "diagnosis": "Juven.osteochond.-arm\/hand NOS" }, { "userId": "62", "gender": "0", "dateOfBirth": "1935-02-16", "diagnosis": "Abscess of tendon-arm" }, { "userId": "63", "gender": "1", "dateOfBirth": "1935-04-13", "diagnosis": "OA NOS-sternoclavicular joint" }, { "userId": "64", "gender": "1", "dateOfBirth": "1935-05-01", "diagnosis": "Unsp.osteomyelitis-forearm" }, { "userId": "65", "gender": "1", "dateOfBirth": "1935-05-01", "diagnosis": "Oth.inf.+bone dis-shoulder" }, { "userId": "66", "gender": "0", "dateOfBirth": "1935-05-31", "diagnosis": "OA NOS-sternoclavicular joint" }, { "userId": "67", "gender": "1", "dateOfBirth": "1935-07-11", "diagnosis": "Other joint sympt.-hand" }, { "userId": "68", "gender": "1", "dateOfBirth": "1935-07-17", "diagnosis": "[X]O chr h'matogens osteomylit" }, { "userId": "69", "gender": "1", "dateOfBirth": "1935-07-23", "diagnosis": "Transient arthrop-talonav jnt" }, { "userId": "70", "gender": "1", "dateOfBirth": "1935-08-16", "diagnosis": "Joint derangement NOS" }, { "userId": "71", "gender": "0", "dateOfBirth": "1935-08-24", "diagnosis": "Arthralgia of wrist" }, { "userId": "72", "gender": "0", "dateOfBirth": "1935-10-05", "diagnosis": "Juvenile apophysitis NOS" }, { "userId": "73", "gender": "1", "dateOfBirth": "1935-11-11", "diagnosis": "Arthralgia of wrist" }, { "userId": "74", "gender": "1", "dateOfBirth": "1935-11-27", "diagnosis": "Oth.inf.+bone dis-shoulder" }, { "userId": "75", "gender": "1", "dateOfBirth": "1935-12-22", "diagnosis": "Other symptoms - distal RUJ" }, { "userId": "76", "gender": "1", "dateOfBirth": "1936-01-10", "diagnosis": "Acquired deformity of nose" }, { "userId": "77", "gender": "1", "dateOfBirth": "1936-02-02", "diagnosis": "2 lev lumbsac spond+radiculop" }, { "userId": "78", "gender": "0", "dateOfBirth": "1936-02-23", "diagnosis": "Juvenile osteochondrosis NOS" }, { "userId": "79", "gender": "1", "dateOfBirth": "1936-02-28", "diagnosis": "Chondroc.-pyrophos.-shoulder" }, { "userId": "80", "gender": "0", "dateOfBirth": "1936-03-02", "diagnosis": "Rheumatoid arthritis of hip" }, { "userId": "81", "gender": "0", "dateOfBirth": "1936-04-10", "diagnosis": "Biceps tendinitis" }, { "userId": "82", "gender": "1", "dateOfBirth": "1936-08-13", "diagnosis": "Reactive arthropathy of elbow" }, { "userId": "83", "gender": "1", "dateOfBirth": "1936-11-19", "diagnosis": "Joint derangement NOS" }, { "userId": "84", "gender": "0", "dateOfBirth": "1936-12-09", "diagnosis": "Other joint sympt.-hand" }, { "userId": "85", "gender": "0", "dateOfBirth": "1936-12-14", "diagnosis": "OA NOS-sternoclavicular joint" }, { "userId": "86", "gender": "0", "dateOfBirth": "1937-01-22", "diagnosis": "Avasc.necr.-med.femoral condyl" }, { "userId": "87", "gender": "0", "dateOfBirth": "1937-01-25", "diagnosis": "[X]O spcf intrvrtbrl disc diso" }, { "userId": "88", "gender": "0", "dateOfBirth": "1937-03-03", "diagnosis": "Arthralgia of wrist" }, { "userId": "89", "gender": "0", "dateOfBirth": "1937-04-02", "diagnosis": "Juven.osteochond.-arm\/hand NOS" }, { "userId": "90", "gender": "0", "dateOfBirth": "1937-05-15", "diagnosis": "Algodystrophy of knee" }, { "userId": "91", "gender": "1", "dateOfBirth": "1937-07-02", "diagnosis": "Other spondyloses\/allied dis." }, { "userId": "92", "gender": "0", "dateOfBirth": "1937-07-16", "diagnosis": "Biceps tendinitis" }, { "userId": "93", "gender": "0", "dateOfBirth": "1937-08-08", "diagnosis": "Arthropathy NOS-site unspecif." }, { "userId": "94", "gender": "1", "dateOfBirth": "1937-08-08", "diagnosis": "Acquired deformity of nose" }, { "userId": "95", "gender": "0", "dateOfBirth": "1937-08-17", "diagnosis": "Other thoracic disc disorders" }, { "userId": "96", "gender": "1", "dateOfBirth": "1937-09-01", "diagnosis": "Arthropathy NOS-site unspecif." }, { "userId": "97", "gender": "0", "dateOfBirth": "1937-09-19", "diagnosis": "Algodystrophy of knee" }, { "userId": "98", "gender": "1", "dateOfBirth": "1937-10-01", "diagnosis": "Avasc.necr.-med.femoral condyl" }, { "userId": "99", "gender": "0", "dateOfBirth": "1937-11-17", "diagnosis": "Transient arthrop-talonav jnt" }]);
  });

  app.get('/counts.php', function(req, res) {
    res.json([{ "name": "2 lev lumbsac spond+radiculop", "count": "18" }, { "name": "Abscess of tendon-arm", "count": "14" }, { "name": "Acquired deformity of nose", "count": "16" }, { "name": "Acute osteomyelitis-carp bone", "count": "26" }, { "name": "Adhesions of knee joint", "count": "18" }, { "name": "Algodystrophy of knee", "count": "20" }, { "name": "Arth+oth.inf\/para-other specif", "count": "20" }, { "name": "Arthr.+mycoses-hand", "count": "17" }, { "name": "Arthr.+oth.bact.dis-site unsp.", "count": "19" }, { "name": "Arthralgia of elbow", "count": "17" }, { "name": "Arthralgia of wrist", "count": "25" }, { "name": "Arthropathy NOS-site unspecif.", "count": "31" }, { "name": "Avasc.necr.-med.femoral condyl", "count": "17" }, { "name": "Bankart lesion", "count": "19" }, { "name": "Biceps tendinitis", "count": "18" }, { "name": "Chondroc.-pyrophos.-shoulder", "count": "21" }, { "name": "Contracture-tibialis anterior", "count": "18" }, { "name": "Deformity of metacarpal", "count": "17" }, { "name": "Dissuse osteoporosis", "count": "22" }, { "name": "Exten contracture of toe IPJ", "count": "20" }, { "name": "Flexion contracture-toe joint", "count": "16" }, { "name": "Generalised arthritis", "count": "25" }, { "name": "Haemarthrosis of elbow", "count": "16" }, { "name": "Infective myositis", "count": "23" }, { "name": "Joint derangement NOS", "count": "20" }, { "name": "Juv arthritis in psoriasis", "count": "20" }, { "name": "Juven.osteochond.-arm\/hand NOS", "count": "26" }, { "name": "Juvenile apophysitis NOS", "count": "17" }, { "name": "Juvenile osteochondrosis NOS", "count": "21" }, { "name": "Local.primary OA-hand", "count": "19" }, { "name": "OA NOS-sternoclavicular joint", "count": "22" }, { "name": "Osteophyte", "count": "18" }, { "name": "Osteoradionecrosis", "count": "17" }, { "name": "Oth.inf.+bone dis-shoulder", "count": "23" }, { "name": "Other joint sympt.-hand", "count": "20" }, { "name": "Other spondyloses\/allied dis.", "count": "18" }, { "name": "Other symptoms - distal RUJ", "count": "18" }, { "name": "Other thoracic disc disorders", "count": "18" }, { "name": "Reactive arthropathy of elbow", "count": "25" }, { "name": "Rheumatoid arthritis of hip", "count": "17" }, { "name": "Rheumatoid lung disease", "count": "22" }, { "name": "Stiff joint NEC-other specif.", "count": "17" }, { "name": "Synov osteochondromat st-cla j", "count": "29" }, { "name": "Transient arthrop-talonav jnt", "count": "17" }, { "name": "Unsp.osteomyelitis-forearm", "count": "22" }, { "name": "Vertebral column disorders OS", "count": "22" }, { "name": "[X]O chr h'matogens osteomylit", "count": "16" }, { "name": "[X]O spcf intrvrtbrl disc diso", "count": "20" }, { "name": "[X]Oth specified dorsopathies", "count": "21" }, { "name": "[X]Other secondary gout", "count": "22" }]);
  });

  app.get('/diagnosis.php', function(req, res) {
    res.json([{"id":"1","name":"Juv arthritis in psoriasis"},{"id":"2","name":"Exten contracture of toe IPJ"},{"id":"3","name":"Joint derangement NOS"},{"id":"4","name":"[X]Other secondary gout"},{"id":"5","name":"Osteoradionecrosis"},{"id":"6","name":"Bankart lesion"},{"id":"7","name":"Rheumatoid arthritis of hip"},{"id":"8","name":"Rheumatoid lung disease"},{"id":"9","name":"Juvenile osteochondrosis NOS"},{"id":"10","name":"Generalised arthritis"},{"id":"11","name":"Biceps tendinitis"},{"id":"12","name":"Haemarthrosis of elbow"},{"id":"13","name":"Juven.osteochond.-arm\/hand NOS"},{"id":"14","name":"Other thoracic disc disorders"},{"id":"15","name":"Abscess of tendon-arm"},{"id":"16","name":"Flexion contracture-toe joint"},{"id":"17","name":"OA NOS-sternoclavicular joint"},{"id":"18","name":"Avasc.necr.-med.femoral condyl"},{"id":"19","name":"Acquired deformity of nose"},{"id":"20","name":"Reactive arthropathy of elbow"},{"id":"21","name":"Oth.inf.+bone dis-shoulder"},{"id":"22","name":"Dissuse osteoporosis"},{"id":"23","name":"Infective myositis"},{"id":"24","name":"2 lev lumbsac spond+radiculop"},{"id":"25","name":"Other symptoms - distal RUJ"},{"id":"26","name":"Algodystrophy of knee"},{"id":"27","name":"Deformity of metacarpal"},{"id":"28","name":"Stiff joint NEC-other specif."},{"id":"29","name":"Juvenile apophysitis NOS"},{"id":"30","name":"Arthr.+oth.bact.dis-site unsp."},{"id":"31","name":"Arthralgia of elbow"},{"id":"32","name":"Osteophyte"},{"id":"33","name":"Unsp.osteomyelitis-forearm"},{"id":"34","name":"Arthropathy NOS-site unspecif."},{"id":"35","name":"Local.primary OA-hand"},{"id":"36","name":"Arth+oth.inf\/para-other specif"},{"id":"37","name":"Arthr.+mycoses-hand"},{"id":"38","name":"Chondroc.-pyrophos.-shoulder"},{"id":"39","name":"[X]O spcf intrvrtbrl disc diso"},{"id":"40","name":"Other spondyloses\/allied dis."},{"id":"41","name":"Synov osteochondromat st-cla j"},{"id":"42","name":"[X]Oth specified dorsopathies"},{"id":"43","name":"Transient arthrop-talonav jnt"},{"id":"44","name":"Vertebral column disorders OS"},{"id":"45","name":"[X]O chr h'matogens osteomylit"},{"id":"46","name":"Contracture-tibialis anterior"},{"id":"47","name":"Acute osteomyelitis-carp bone"},{"id":"48","name":"Other joint sympt.-hand"},{"id":"49","name":"Adhesions of knee joint"},{"id":"50","name":"Arthralgia of wrist"}]);
  });

  app.get('/occupations.php', function(req, res) {
    res.json([{"id":"1","name":"Hairdressers\/beauticians"},{"id":"2","name":"Machine metal engraver"},{"id":"3","name":"Foreman - gardeners\/groundsmen"},{"id":"4","name":"Winder"},{"id":"5","name":"Investment advisor"},{"id":"6","name":"Staff midwife"},{"id":"7","name":"Therapeutic radiographer"},{"id":"8","name":"Repetitive assembler -minerals"},{"id":"9","name":"Secretary - trade association"},{"id":"10","name":"Ship master"},{"id":"11","name":"Bargeman\/tugman"},{"id":"12","name":"Other materials processor NOS"},{"id":"13","name":"Filing clerk"},{"id":"14","name":"Shotgun merchant"},{"id":"15","name":"Lab.tech.- equipment operation"},{"id":"16","name":"Occupational analyst"},{"id":"17","name":"Glazier"},{"id":"18","name":"Textile finisher"},{"id":"19","name":"Woodcutting machine setter"},{"id":"20","name":"Trainee artist"},{"id":"21","name":"Nursing admin.-profession.body"},{"id":"22","name":"Printing machine operator"},{"id":"23","name":"Fishermen"},{"id":"24","name":"Schedule clerk"},{"id":"25","name":"Electr.engineer - manager"}]);
  });

  app.get('/public/*', function(req, res) {
    res.redirect(req.originalUrl.split("?").shift().replace(/public\//,""));
  });

  app.get('/cohort_summary.php', function(req, res) {

    var exec = require('child_process').execSync;
    var oo = exec('Rscript.exe cohort_summary.R', {
      cwd: './server/R/',
      env: {
        R_LIBS:"./test"
      }
    });
	var filePath = Path.join(__dirname, './server/R/ROutput/_cohort_summary.html');
	var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });

  // POST `/items` -> Add an entry using the `title` field
  app.post('/items', function(req, res) {
    var item = (req.body.title || '').trim();
    if (!item) {
      return res.status(400).end('Nope!');
    }

    items.push(item);
    res.status(201).end('Created!');
  });

  // Listen on the right port, and notify Brunch once ready through `callback`.
  server.listen(port, callback);
};