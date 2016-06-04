# aws-cli-js
A node.js wrapper for the [aws-cli](http://aws.amazon.com/documentation/cli/) command line interface

[![NPM](https://nodei.co/npm/aws-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/aws-cli-js/)
[![NPM](https://nodei.co/npm-dl/aws-cli-js.png?months=6&height=3)](https://nodei.co/npm/aws-cli-js/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

### Step 1: Prerequisites

The aws command line interface must be installed and accessible in the path

### Step 2: Installation
    
    npm install aws-cli-js
    
Then:

```js
var awsCli = require('aws-cli-js');
var Options = awsCli.Options;
var Aws = awsCli.Aws;
```

## Usage

With promise

```js
var options = new Options(
  /* accessKey    */ 'your key',
  /* secretKey    */ 'your key2',
  /* currentWorkingDirectory */ null
);

var aws = new Aws(options);

aws.command('iam list-users').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'aws iam list-users ',
//  raw: '{\\n    \\"Users\\": [\\n        {\\n            \\"UserName\\": \\"developer\\", \\n            \\"PasswordLastUsed\\": \\"2015-10-03T17:58:49Z\\", \\n            \\"CreateDate\\": \\"2015-06-03T07:37:25Z\\", \\n            \\"UserId\\": \\"AIDAJBXXXXXXXXXXXXXXXXX\\", \\n            \\"Path\\": \\"/\\", \\n            \\"Arn\\": \\"arn:aws:iam::03XXXXXXXXX:user/developer\\"\\n        }\\n    ]\\n}\\n',
//  object:
//   {
//     Users:
//      [{
//        UserName: 'developer',
//        PasswordLastUsed: '2015-10-03T17:58:49Z',
//        CreateDate: '2015-06-03T07:37:25Z',
//        UserId: 'AIDAJBXXXXXXXXXXXXXXXXX',
//        Path: '/',
//        Arn: 'arn:aws:iam::03XXXXXXXXX:user/developer'
//      }]
//   }
//}

```

With callback:

```js

aws.command('iam list-users', function (err, data) {
  console.log('data = ', data);
});

//data = {
//  command: 'aws iam list-users ',
//  raw: '["{\\n    \\"Users\\": [\\n        {\\n            \\"UserName\\": \\"developer\\", \\n            \\"PasswordLastUsed\\": \\"2015-10-03T17:58:49Z\\", \\n            \\"CreateDate\\": \\"2015-06-03T07:37:25Z\\", \\n            \\"UserId\\": \\"AIDAJBXXXXXXXXXXXXXXXXX\\", \\n            \\"Path\\": \\"/\\", \\n            \\"Arn\\": \\"arn:aws:iam::03XXXXXXXXX:user/developer\\"\\n        }\\n    ]\\n}\\n",""]',
//  object:
//   {
//     Users:
//      [{
//        UserName: 'developer',
//        PasswordLastUsed: '2015-10-03T17:58:49Z',
//        CreateDate: '2015-06-03T07:37:25Z',
//        UserId: 'AIDAJBXXXXXXXXXXXXXXXXX',
//        Path: '/',
//        Arn: 'arn:aws:iam::03XXXXXXXXX:user/developer'
//      }]
//   }
//}

```

Typescript

```js
import { Aws, Options } from 'aws-cli-js';

const options = new Options(
  /* accessKey    */ 'your key',
  /* secretKey    */ 'your key2',
  /* currentWorkingDirectory */ null
);


const aws = new Aws(options);

return aws.command('iam list-users').then(function (data) {
  console.log('data = ', data);
});
```



* describe-instances

```js
awsCli.command('ec2 describe-instances --instance-ids i-789b3ba7').then(function (data) {
  console.log('data = ', data); 
});


//data =  { command: 'aws ec2 describe-instances --instance-ids i-789b3ba7 ',
//  raw: '{\\n    \\"Reservations\\": [\\n        {\\n            \\"OwnerId\\": \\"031641171132\\", \\n            \\"ReservationId\\": \\"r-a48ad878\\", \\n            \\"Groups\\": [], \\n            \\"Instances\\": [\\n                {\\n
//          \\"Monitoring\\": {\\n                        \\"State\\": \\"disabled\\"\\n                    }, \\n
//     \\"PublicDnsName\\": \\"ec2-52-64-166-221.ap-southeast-2.compute.amazonaws.com\\", \\n                    \\"State\\": {\\n
// ...

```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/aws-cli-js.svg?style=flat
[npm-url]: https://npmjs.org/package/aws-cli-js
[downloads-image]: https://img.shields.io/npm/dm/aws-cli-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/aws-cli-js
