"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Aws = void 0;
const nodeify_ts_1 = __importDefault(require("nodeify-ts"));
const child_process = __importStar(require("child_process"));
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
        cliPath: 'aws'
    }) {
        this.options = options;
    }
    command(command, callback) {
        const promise = Promise.resolve().then(() => {
            const env_vars = ('HOME PATH AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY ' +
                'AWS_SESSION_TOKEN AWS_DEFAULT_REGION ' +
                'AWS_DEFAULT_PROFILE AWS_CONFIG_FILE').split(' ');
            const env = env_vars.reduce((result, value) => {
                if (process.env[value]) {
                    result[value] = process.env[value];
                }
                return result;
            }, {});
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
            //console.log('options.cliPath =', this.options.cliPath);
            return new Promise((resolve, reject) => {
                execFile(this.options.cliPath, [...command.split(' ')], execOptions, (error, stdout, stderr) => {
                    if (error) {
                        const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
                        //console.error(message);
                        reject(message);
                    }
                    //console.log(`stdout: ${stdout}`);
                    resolve({ stderr: stderr, stdout: stdout });
                });
            });
        }).then((data) => {
            const result = {
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
    constructor(accessKey, secretKey, sessionToken, currentWorkingDirectory, cliPath = 'aws') {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.sessionToken = sessionToken;
        this.currentWorkingDirectory = currentWorkingDirectory;
        this.cliPath = cliPath;
    }
}
exports.Options = Options;
//# sourceMappingURL=index.js.map