import { Aws, Options } from './index';
import * as util from 'util';

/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../my_config.json');

//console.log('config', config);

describe('iam list-users', () => {
  it('should work', () => {
    const result = true;

    expect(result).toBeTruthy();
    const options = new Options(
      /* accessKey    */ config.accessKeyId,
      /* secretKey    */ config.secretAccessKey,
      /* sessionToken */ config.sessionToken,
      /* currentWorkingDirectory */ undefined,
    );


    const aws = new Aws(options);

    return aws.command('iam list-users').then((data: any) => {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      expect(data).toBeTruthy();
      expect(data.object.Users).toBeTruthy();
    });


  });
});


describe('iam list-users', () => {
  it('should fail with invalid sessionToken', () => {
    const result = true;

    expect(result).toBeTruthy();
    const options = new Options(
      /* accessKey    */ config.accessKeyId,
      /* secretKey    */ config.secretAccessKey,
      /* sessionToken */ 'invalid',
      /* currentWorkingDirectory */ undefined,
    );


    const aws = new Aws(options);

    let flag = false;
    return aws.command('iam list-users').then((data: any) => {
      flag = true;
    }).catch((r) => {
      expect(flag).toBeFalsy();
      //console.log('r = ', r);
    });


  });
});

