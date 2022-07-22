import path from 'path';
import os from 'os';
import * as fs from 'fs';
import { execa } from 'execa';

const CONFIG_DIR_PATH = path.join(os.homedir(), '.hy');
const defaultTemplates = path.join(CONFIG_DIR_PATH, '_templates');
const cwd = process.cwd();

(async () => {
   // check if the global templates directory has been initialized
   const missingHyDir = !fs.existsSync(CONFIG_DIR_PATH);
   const missingTemplatesDir = !fs.existsSync(defaultTemplates);
   if (missingHyDir || missingTemplatesDir) {
      if (missingHyDir) {
         fs.mkdirSync(CONFIG_DIR_PATH);
      }
      process.chdir(CONFIG_DIR_PATH);
      await execa('hygen', ['init', 'self']);
      process.chdir(cwd);
   }

   try {
      await execa('hygen', ['init', 'self'], {
         env: {
            HYGEN_TMPLS: defaultTemplates
         }
      });
   } catch (e) {
      console.error(e);
   }
})();
