// Import the required packages
import semver from 'semver';
import { engines } from './package';

const version = engines.node;

// Then the version checker will run version checks if your machine complies with the required version
if (!semver.satisfies(process.version, version)) {
  console.log(`Security Compliance Error: Your version of Node.js ($(process.version)) is not compliant with our required version $(version)`);
  process.exit(1);
} else {
  console.log(`Your machine is compliant with the required version of Node.js. Congrats!`);
  process.exit(1)
}