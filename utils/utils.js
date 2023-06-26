

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath( import.meta.url );
let __dirname = dirname( __filename );
const projectRoot = resolve( __dirname, '..' );

__dirname = projectRoot;

export default __dirname;