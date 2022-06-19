import path from 'path';
import os from 'os';
import * as fs from 'fs';
import { runner, Logger } from 'hygen';
import { execa } from 'execa';

const CONFIG_DIR_PATH = path.join(os.homedir(), '.hy');

(async () => {
   if (!fs.existsSync(CONFIG_DIR_PATH)) {
      fs.mkdirSync(CONFIG_DIR_PATH);
   }
   const defaultTemplates = path.join(CONFIG_DIR_PATH, '_templates')
   const { success } = await runner(process.argv.slice(2), {
      templates: defaultTemplates,
      cwd: process.cwd(),
      logger: new Logger(console.log.bind(console)),
      debug: !!process.env.DEBUG,
      exec: (action, body) => {
         const opts = body && body.length > 0 ? { input: body } : {}
         return execa(action, { ...opts, shell: true })
      },
      createPrompter: () => require('enquirer'),
   });
   
   process.exit(success ? 0 : 1)
})();
