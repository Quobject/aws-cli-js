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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const util = __importStar(require("util"));
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../my_config.json');
//console.log('config', config);
describe('iam list-users', () => {
    it('should work', () => {
        const result = true;
        expect(result).toBeTruthy();
        const options = new index_1.Options(
        /* accessKey    */ config.accessKeyId, 
        /* secretKey    */ config.secretAccessKey, 
        /* sessionToken */ config.sessionToken, 
        /* currentWorkingDirectory */ undefined, 
        /* cliPath */ 'aws');
        const aws = new index_1.Aws(options);
        return aws.command('iam list-users').then((data) => {
            console.log('data = ', util.inspect(data, { depth: 10 }));
            expect(data).toBeTruthy();
            expect(data.object.Users).toBeTruthy();
        });
    });
});
// describe('iam list-users', () => {
//   it('should fail with invalid sessionToken', () => {
//     const result = true;
//     expect(result).toBeTruthy();
//     const options = new Options(
//       /* accessKey    */ config.accessKeyId,
//       /* secretKey    */ config.secretAccessKey,
//       /* sessionToken */ 'invalid',
//       /* currentWorkingDirectory */ undefined,
//     );
//     const aws = new Aws(options);
//     let flag = false;
//     return aws.command('iam list-users').then((data: any) => {
//       flag = true;
//     }).catch((r) => {
//       expect(flag).toBeFalsy();
//       //console.log('r = ', r);
//     });
//   });
// });
//# sourceMappingURL=index.spec.js.map