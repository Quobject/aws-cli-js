import nodeify from 'nodeify-ts';
import * as child_process from 'child_process';
const execFile = child_process.execFile;


const extractResult = (result: Result): Result => {
  try {
    result.object = JSON.parse(result.raw);
  } catch (e) {
    result.object = e;
  }
  return result;
};

export class Aws {

  constructor(private options: IOptions = {
    accessKey: undefined,
    currentWorkingDirectory: undefined,
    secretKey: undefined,
  }) { }

  public command(command: string, callback?: (err: any, data: any) => void): Promise<any> {
    

    const promise = Promise.resolve().then( () => {


      const env_vars = ('HOME PATH AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ' +
        'AWS_SESSION_TOKEN AWS_DEFAULT_REGION ' +
        'AWS_DEFAULT_PROFILE AWS_CONFIG_FILE').split(' ');


      const env = env_vars.reduce((result: any, value: string) => {
        if (process.env[value]) {
          result[value] = process.env[value];
        }
        return result;
      },{});

      env['DEBUG'] = '';

      if (this.options.accessKey) {
        env['AWS_ACCESS_KEY_ID'] = this.options.accessKey;
      }

      if (this.options.secretKey) {
        env['AWS_SECRET_ACCESS_KEY'] = this.options.secretKey;
      }

      if (this.options.sessionToken) {
        env['AWS_SESSION_TOKEN'] = this.options.sessionToken;
      }

      const execOptions = {
        cwd: this.options.currentWorkingDirectory,
        env: env,
        maxBuffer: 200 * 1024 * 1024,
      };

      //console.log('exec options =', execOptions);

      return new Promise<{ stderr: string, stdout: string }>( (resolve, reject) => {
        execFile('aws', [...command.split(' ')], execOptions, (error: Error | null, stdout: string, stderr: string) => {
          if (error) {
            const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
            //console.error(message);
            reject(message);
          }
          //console.log(`stdout: ${stdout}`);
          resolve({ stderr: stderr, stdout: stdout });
        });
      });
    }).then((data: { stderr: string, stdout: string }) => {

      const result: Result = {
        command,
        error: data.stderr,
        object: null,
        raw: data.stdout,
      };
      return extractResult(result);
    });

    return nodeify(promise, callback);
  }
}


export interface IOptions {
  accessKey?: string;
  secretKey?: string;
  sessionToken?: string;
  currentWorkingDirectory?: string;
}

interface Result {
  command: string;
  error: string;
  raw: string;
  object: any;
}

export class Options implements IOptions {
  public constructor(
    public accessKey?: string,
    public secretKey?: string,
    public sessionToken?: string,
    public currentWorkingDirectory?: string) { }
}

