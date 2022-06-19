import path from 'path';
import os from 'os';
import * as fs from 'fs';
import { runner, Logger } from 'hygen';
import { execa } from 'execa';
import enquirer from 'enquirer';
import { Prompter } from 'hygen/dist/types';
import { chdir } from 'node:process';

const CONFIG_DIR_PATH = path.join(os.homedir(), '.hy');

(async () => {
   const defaultTemplates = path.join(CONFIG_DIR_PATH, '_templates');
   const cwd = process.cwd();
   const runnerConfig = {
      templates: defaultTemplates,
      cwd: cwd,
      logger: new Logger(console.log.bind(console)),
      debug: !!process.env.DEBUG,
      exec: (action, body) => {
         const opts = body && body.length > 0 ? { input: body } : {}
         return execa(action, { ...opts, shell: true })
      },
      createPrompter: <Q, T>() => ({
         prompt: enquirer.prompt
      } as unknown as Prompter<Q, T>),
   };

   const missingHyDir = !fs.existsSync(CONFIG_DIR_PATH);
   const missingTemplatesDir = !fs.existsSync(defaultTemplates);
   if (missingHyDir || missingTemplatesDir) {
      if (missingHyDir) {
         fs.mkdirSync(CONFIG_DIR_PATH);
      }
      chdir(CONFIG_DIR_PATH);
      await execa('hygen', ['init', 'self']);
      chdir(cwd);
   }

   const { success } = await runner(process.argv.slice(2), runnerConfig);
   process.exit(success ? 0 : 1)
})();
