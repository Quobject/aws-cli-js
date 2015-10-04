# aws-cli-js
A node.js wrapper for the [aws-cli](http://aws.amazon.com/documentation/cli/) command line interface

[![NPM](https://nodei.co/npm/aws-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/aws-cli-js/)
[![NPM](https://nodei.co/npm-dl/aws-cli-js.png?months=6&height=3)](https://nodei.co/npm/aws-cli-js/)

## Installation

### Step 1: Prerequisites

The aws command line interface must be installed and accessible in the path

### Step 2: Installation
    
    npm install aws-cli-js
    
Then:

```js
var AwsCli = require('aws-cli-js');
```

## Usage

With promise

```js
var awsCli = new AwsCli({
  aws_access_key_id: 'PUTVALUEHERE', 
  aws_secret_access_key: 'abcdefPUTVALUEHERE',
});

awsCli.command('iam list-users').then(function (data) {
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

With callback:

```js

awsCli.command('iam list-users', function (err, data) {
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

* describe-instances

```js
awsCli.command('ec2 describe-instances --instance-ids i-789b3ba7').then(function (data) {
  console.log('data = ', data); 
});


//data =  { command: 'aws ec2 describe-instances --instance-ids i-789b3ba7 ',
//  raw: '["{\\n    \\"Reservations\\": [\\n        {\\n            \\"OwnerId\\": \\"031641171132\\", \\n            \\"ReservationId\\": \\"r-a48ad878\\", \\n            \\"Groups\\": [], \\n            \\"Instances\\": [\\n                {\\n
//          \\"Monitoring\\": {\\n                        \\"State\\": \\"disabled\\"\\n                    }, \\n
//     \\"PublicDnsName\\": \\"ec2-52-64-166-221.ap-southeast-2.compute.amazonaws.com\\", \\n                    \\"State\\": {\\n
// ...

```
or with options

```js
awsCli.command('ec2 describe-instances', { 'instance-ids': 'i-789b3ba7' }).then(function (data) {
  console.log('data = ', data); 
});

```


