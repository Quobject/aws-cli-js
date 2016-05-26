/* tslint:disable:no-string-literal */
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as child_process from 'child_process';
const exec = child_process.exec;


const extractResult = function (result) {
  try {
    result.object = JSON.parse(result.raw);
  } catch (e) {
    result.object = e;
  }
  return result;
};

export class Aws {

  constructor(private options: IOptions = {
    accessKey: null,
    currentWorkingDirectory: null,
    secretKey: null,
  }) { }

  public command(command: string, callback?: (err, data) => void) {
    let aws = this;
    let execCommand = 'aws ' + command;

    return Promise.resolve().then(function () {
      //console.log('execCommand =', execCommand);


      const env_vars = ('HOME PATH AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ' +
        'AWS_SESSION_TOKEN AWS_DEFAULT_REGION ' +
        'AWS_DEFAULT_PROFILE AWS_CONFIG_FILE').split(' ');


      const env = _.reduce(env_vars, function (result, value) {
        if (process.env[value]) {
          result[value] = process.env[value];
        }
        return result;
      }, {});

      env['DEBUG'] = '';

      if (aws.options.accessKey) {
        env['AWS_ACCESS_KEY_ID'] = aws.options.accessKey;
      }

      if (aws.options.secretKey) {
        env['AWS_SECRET_ACCESS_KEY'] = aws.options.secretKey;
      }

      let execOptions = {
        cwd: aws.options.currentWorkingDirectory,
        env: env,
        maxBuffer: 200 * 1024 * 1024,
      };

      //console.log('exec options =', execOptions);

      return new Promise(function (resolve, reject) {
        exec(execCommand, execOptions, (error, stdout, stderr) => {
          if (error) {
            const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
            console.error(message);
            reject(message);
          }
          //console.log(`stdout: ${stdout}`);
          resolve({ stderr: stderr, stdout: stdout });
        });
      });
    }).then(function (data: { stderr: string, stdout: string }) {

      let result = {
        command: execCommand,
        error: data.stderr,
        raw: data.stdout,
      };
      return extractResult(result);

    }).nodeify(callback);
  }
}


export interface IOptions {
  accessKey?: string;
  secretKey?: string;
  currentWorkingDirectory?: string;
}

export class Options implements IOptions {
  public constructor(
    public accessKey?: string,
    public secretKey?: string,
    public currentWorkingDirectory?: string) { }
}

