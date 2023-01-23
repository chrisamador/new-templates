import { Command } from "commander";

export const program = new Command();

const version = "1.0.0";

/**
 * Setup the CLI program configuration
 */
program
  .name("yarn new")
  .description("Simple template scaffolding" + " v" + version)
  .version(version);

program.showHelpAfterError('(use `yarn new --help` for additional information)');

program.parse();
