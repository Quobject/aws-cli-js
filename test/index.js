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


var config = require('../my_config.json');


describe('AwsCli', function () {

  it('should merge opts', function () {
    var awsCli = new AwsCli({ a: 'a' });
    assert.isNotNull(awsCli);
    assert.equal(awsCli.a, 'a');
    //console.log('awsCli', awsCli);
  });


  it('command ??? should pass', function (done) {
    this.timeout(1 * 60 * 1000);//1 minute
    var awsCli = new AwsCli();

    assert.isNotNull(awsCli);
    var failed = false;
    var err = null;
    awsCli.command('ip machinename').then(function (data) {
      console.log('data = ', data);
      assert.isNotNull(data);
    }).finally(function () {
      //console.log('finally ');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });


  it('command ls2 should fail', function (done) {
    var awsCli = new AwsCli();
    assert.isNotNull(awsCli);
    var failed = false;
    var err = null;
    awsCli.command('ls2').then(function (data) {
      //console.log('data = ', data);
      assert.isNotNull(data);
    }).catch(function (error) {
      assert.isNotNull(error);
      err = error;
      failed = true;
      //console.log('error = ', error);
    }).finally(function () {
      //console.log('finally ');
      assert.isTrue(failed);
      assert.isNotNull(err);
      done();
    });
  });




});


