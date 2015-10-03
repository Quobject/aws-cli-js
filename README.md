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
  profile: 'default',                       
  aws_access_key_id: 'PUTVALUEHERE',
  aws_secret_access_key: 'abcdefPUTVALUEHERE'
});

awsCli.command('?? ').then(function (data) {
  console.log('data = ', data); 
});



```

With callback:

```js

dockerMachine.command('??', function (err, data) {
  console.log('data = ', data);
});

```

* ??

```js
dockerMachine.command('??').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'docker-machine ?? ',

```

