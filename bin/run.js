#!/usr/bin/env node --no-deprecation --env-file-if-exists=.env

import { main } from "../src/index.js";

main(process.argv.slice(2));
