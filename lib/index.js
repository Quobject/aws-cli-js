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

var AwsCli = function (opts) {
  if (!(this instanceof AwsCli)) {
    return new AwsCli(opts);
  }

  _.merge(this, opts); 
};

AwsCli.prototype.command = function (command, options, callback) {
  var self = this;
  var exec_command = 'aws ';

  if (!callback) {
    callback = options;
    options = null;
  }

  return Promise.resolve().then(function () {

    var env_vars = ('HOME PATH AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ' +
        'AWS_SESSION_TOKEN AWS_DEFAULT_REGION ' +
        'AWS_DEFAULT_PROFILE AWS_CONFIG_FILE').split(' ');

    //console.log('env_vars =', JSON.stringify(env_vars));


    var env = _.reduce(env_vars, function (result, value) {
      if (process.env[value]) {
        result[value] = process.env[value];
      }
      return result;
    }, {});

    //console.log('env =', env);

    if (self.aws_access_key_id) {
      env.AWS_ACCESS_KEY_ID = self.aws_access_key_id;
    }

    if (self.aws_secret_access_key) {
      env.AWS_SECRET_ACCESS_KEY = self.aws_secret_access_key;
    }


    var params = _.reduce(options, function (result, value, key) {
      result += util.format('--%s %s ', key, value);
      return result;
    }, '');

    exec_command += command + ' ' + params;
    //console.log('exec_command =', exec_command);

    var exec_options = {
      env: env
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
    //return result;
    return extractResult(result);

  }).nodeify(callback);
};

module.exports = AwsCli;

var extractResult = function (result) {

  try {
    var obj = JSON.parse(result.raw);
    result.object = JSON.parse(obj[0]);
  } catch (e) {
    result.object = e;
  }


  //var extracterArray = [
  //{
  //  re: / ls /,
  //  run: function (resultp) {
  //    var obj = JSON.parse(resultp.raw);
  //    var lines = obj[0].split(os.EOL);

  //    return (resultp.machineList = '???');
  //  }
  //}
  //];

  //extracterArray.forEach(function (extracter) {
  //  var re = extracter.re;
  //  var str = result.command;
  //  var m;

  //  if ((m = re.exec(str)) !== null) {
  //    if (m.index === re.lastIndex) {
  //      re.lastIndex++;
  //    }
  //    // View your result using the m-variable.
  //    // eg m[0] etc.
  //    return extracter.run(result);
  //  }
  //});



  return result;
};
