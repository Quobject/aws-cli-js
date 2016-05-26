/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import test = require('blue-tape');
import * as path from 'path';
import * as util from 'util';
import { Aws, Options } from './index';

const config = require('../my_config.json');

console.log('config', config);

test('aws-cli-js', t => {

  t.test('iam list-users', t => {
    const options = new Options(
      /* accessKey    */ config.accessKeyId,
      /* secretKey    */ config.secretAccessKey,
      /* currentWorkingDirectory */ null
    );


    const aws = new Aws(options);

    return aws.command('iam list-users').then(function (data) {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.object.Users);
    });

  });


});
