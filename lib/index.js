/**
* Copyright 2015 Matthias Ludwig
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/
'use strict';

var Promise = require("bluebird");
var exec = Promise.promisify(require('child_process').exec);
var os = require('os');
var util = require('util');
var _ = require('lodash');

var DockerMachine = function (opts) {
  if (!(this instanceof DockerMachine)) {
    return new DockerMachine(opts);
  }

  _.merge(this, opts); 
};

DockerMachine.prototype.command = function (command, callback) {
  var self = this;
  var exec_command = 'docker-machine ';

  return Promise.resolve().then(function () {
    var params = _.reduce(self.driver, function (result, value, key) {
      result += util.format('--%s %s ', key, value);
      return result;
    }, '');

    exec_command += command + ' ' + params;
    //console.log('exec_command =', exec_command);

    var exec_options = {
      env: {
        HOME: process.env.HOME,
        PATH: process.env.PATH,
        DEBUG: ''
      }
    };
    if (self.cwd) {
      exec_options.cwd = self.cwd;
    }
    //console.log('exec options =', exec_options);

    return exec(exec_command, exec_options);

  }).then(function (data) {

    var result = {
      command: exec_command,
      raw: JSON.stringify(data)
    };
    return extractResult(result);

  }).nodeify(callback);
};

module.exports = DockerMachine;

var extractResult = function (result) {

  var extracterArray = [
  {
    re: / ls /,
    run: function (resultp) {
      var obj = JSON.parse(resultp.raw);
      var lines = obj[0].split(os.EOL);

      return (resultp.machineList = cliTable2Json(lines));
    }
  },
  {
    re: / config /,
    run: function (resultp) {
      var obj = JSON.parse(resultp.raw);
      var str = obj[0];

      var extractValue = function (strp, name, rep) {
        var re = rep || new RegExp("--" + name + "=\"([\\S]*)\"", 'i');
        var m;

        if ((m = re.exec(strp)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
        }

        return (m && m[1]) ? m[1] : null;
      };

      resultp.machine = {
        tlsverify: function (strp) {
          var re = /--tlsverify/;
          var m;

          if ((m = re.exec(strp)) !== null) {
            if (m.index === re.lastIndex) {
              re.lastIndex++;
            }
          }
          return (m && m[0] && m[0] === '--tlsverify') || false;
        }(str),
        tlscacert: extractValue(str, 'tlscacert'),
        tlscert: extractValue(str, 'tlscert'),
        tlskey: extractValue(str, 'tlskey'),
        host: extractValue(str, null, /-H=tcp:\/\/(.*):/),
        port: extractValue(str, null, /-H=tcp:\/\/.*:(\d*)/)
      };

      return resultp;
    }
  },
  {
    re: / inspect /,
    run: function (resultp) {
      var obj = JSON.parse(resultp.raw);
      resultp.machine = JSON.parse(obj[0]);

      return resultp;
    }
  },


  ];

  extracterArray.forEach(function (extracter) {
    var re = extracter.re;
    var str = result.command;
    var m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });

  return result;
};

var cliTable2Json = function (lines) {
  lines[0] = lines[0].toLowerCase();
  var headerline = lines[0];
  var result = [];

  var column_headers = headerline.split(/ [ ]+/);

  var next_index = 1;
  var locations = _.reduce(column_headers, function (result2, title) {
    result2[title] = { 
      start: headerline.indexOf(title),
      end: next_index < column_headers.length ? headerline.indexOf(column_headers[next_index++]) : headerline.indexOf(title) + 1000
    };
    return result2;
  }, {});

  lines.slice(1).forEach(function (line) {
    if (line.trim().length === 0) {
      return;
    }

    var item = {};
    result.push(item);
    _.forEach(locations, function (position, title) {
      //console.log('position', title, 'position = ', position);
      item[title] = line.substring(position.start, position.end).trim();
    });
  });

  return result;
};
