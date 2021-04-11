import * as util from 'util';

import { Aws, Options } from './index';

/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../my_config.json');

//console.log('config', config);
//https://github.com/Quobject/aws-cli-js/issues/16


describe('Using space inside parameter https://github.com/Quobject/aws-cli-js/issues/16', () => {
  const options = new Options(
    /* accessKey    */ config.accessKeyId,
    /* secretKey    */ config.secretAccessKey,
    /* sessionToken */ config.sessionToken,
    /* currentWorkingDirectory */ undefined,
    /* cliPath */ 'aws',
  );

  const aws = new Aws(options);

  it('with double quotes', () => {
    const command = 's3api put-object --bucket test.quobject.io --key pic.png --body ./testdata/smiley.png --content-type image/png --cache-control "public, max-age=31536000"';
    return aws.command(command).then((data: any) => {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      expect(data).toBeTruthy();
    });
  });

  it('without double quotes', () => {
    const command = 's3api put-object --bucket test.quobject.io --key pic.png --body ./testdata/smiley.png --content-type image/png --cache-control max-age=31536000';
    return aws.command(command).then((data: any) => {
      console.log('data = ', util.inspect(data, { depth: 10 }));
      expect(data).toBeTruthy();
    });
  });
});
