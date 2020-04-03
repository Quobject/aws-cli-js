"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-string-literal */
const _ = require("lodash");
//import nodeify from '../node_modules/nodeify-ts/lib/';
const nodeify_ts_1 = require("nodeify-ts");
const child_process = require("child_process");
const execFile = child_process.execFile;
const extractResult = (result) => {
    try {
        result.object = JSON.parse(result.raw);
    }
    catch (e) {
        result.object = e;
    }
    return result;
};
class Aws {
    constructor(options = {
        accessKey: undefined,
        currentWorkingDirectory: undefined,
        secretKey: undefined,
    }) {
        this.options = options;
    }
    command(command, callback) {
        let aws = this;
        const promise = Promise.resolve().then(function () {
            const env_vars = ('HOME PATH AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ' +
                'AWS_SESSION_TOKEN AWS_DEFAULT_REGION ' +
                'AWS_DEFAULT_PROFILE AWS_CONFIG_FILE').split(' ');
            const env = _.reduce(env_vars, (result, value) => {
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
            if (aws.options.sessionToken) {
                env['AWS_SESSION_TOKEN'] = aws.options.sessionToken;
            }
            let execOptions = {
                cwd: aws.options.currentWorkingDirectory,
                env: env,
                maxBuffer: 200 * 1024 * 1024,
            };
            //console.log('exec options =', execOptions);
            return new Promise((resolve, reject) => {
                execFile('aws', [...command.split(' ')], execOptions, (error, stdout, stderr) => {
                    if (error) {
                        const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
                        console.error(message);
                        reject(message);
                    }
                    //console.log(`stdout: ${stdout}`);
                    resolve({ stderr: stderr, stdout: stdout });
                });
            });
        }).then((data) => {
            let result = {
                command,
                error: data.stderr,
                object: null,
                raw: data.stdout,
            };
            return extractResult(result);
        });
        return nodeify_ts_1.default(promise, callback);
    }
}
exports.Aws = Aws;
class Options {
    constructor(accessKey, secretKey, sessionToken, currentWorkingDirectory) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.sessionToken = sessionToken;
        this.currentWorkingDirectory = currentWorkingDirectory;
    }
}
exports.Options = Options;
