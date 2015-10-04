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

/*global describe, it, before */
var AwsCli = require('../lib/index.js');
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var util = require('util');

var config = require('../my_config.json');


//describe('AwsCli run without modifications', function () {

//  it('should merge opts', function () {
//    var awsCli = new AwsCli({ a: 'a' });
//    assert.isNotNull(awsCli);
//    assert.equal(awsCli.a, 'a');
//    //console.log('awsCli', awsCli);
//  });


//  it('command iam list-users should pass', function (done) {
//    this.timeout(1 * 60 * 1000);//1 minute

//    var awsCli = new AwsCli({
//      aws_access_key_id: config.aws.accessKeyId,
//      aws_secret_access_key: config.aws.secretAccessKey
//      //cwd: 'path to current working directory'
//    });

//    assert.isNotNull(awsCli);
//    var failed = false;
//    var err = null;
//    awsCli.command('iam list-users').then(function (data) {
//      //console.log('data = ', util.inspect(data, {depth: 10}));
//      assert.isNotNull(data);
//    }).finally(function () {
//      //console.log('finally ');
//      assert.isFalse(failed);
//      assert.isNull(err);
//      done();
//    });
//  });

//  it('command iam list-users should pass with callback', function (done) {
//    this.timeout(1 * 60 * 1000);//1 minute

//    var awsCli = new AwsCli({
//      aws_access_key_id: config.aws.accessKeyId,
//      aws_secret_access_key: config.aws.secretAccessKey
//      //cwd: 'path to current working directory'
//    });

//    assert.isNotNull(awsCli);
//    var failed = false;
//    var err = null;
//    awsCli.command('iam list-users', function (err, data) {
//      //console.log('data = ', util.inspect(data, { depth: 10 }));
//      assert.isNotNull(data);
//      done();
//    });
//  }); 

//  it('command aim2 should fail', function (done) {
//    var awsCli = new AwsCli();
//    assert.isNotNull(awsCli);
//    var failed = false;
//    var err = null;
//    awsCli.command('iam2 list-users').then(function (data) {
//      //console.log('data = ', data);
//      assert.isNotNull(data);
//    }).catch(function (error) {
//      assert.isNotNull(error);
//      err = error;
//      failed = true;
//      //console.log('error = ', error);
//    }).finally(function () {
//      //console.log('finally ');
//      assert.isTrue(failed);
//      assert.isNotNull(err);
//      done();
//    });
//  });


//});



describe('AwsCli change ids', function () {
  var instance_id = 'i-789b3ba7';

  it('ec2 describe-instances', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var awsCli = new AwsCli({
      aws_access_key_id: config.aws.accessKeyId,
      aws_secret_access_key: config.aws.secretAccessKey
      //cwd: 'path to current working directory'
    });

    assert.isNotNull(awsCli);
    var failed = false;
    var err = null;
    awsCli.command('ec2 describe-instances --instance-ids ' + instance_id).then(function (data) {
      //console.log('data = ', util.inspect(data, {depth: 10}));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });

  it('ec2 describe-instances with options', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute

    var awsCli = new AwsCli({
      aws_access_key_id: config.aws.accessKeyId,
      aws_secret_access_key: config.aws.secretAccessKey
      //cwd: 'path to current working directory'
    });

    assert.isNotNull(awsCli);
    var failed = false;
    var err = null;
    awsCli.command('ec2 describe-instances', { 'instance-ids': instance_id }).then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });

});
