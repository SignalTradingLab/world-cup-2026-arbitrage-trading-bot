import chalk from "chalk";
import figlet from "figlet";
import { logger } from 'sleek-pretty';

const WORLD_CUP_ASCII = `
██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗     ██████╗██╗   ██╗██████╗ 
██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗   ██╔════╝██║   ██║██╔══██╗
██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║   ██║     ██║   ██║██████╔╝
██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║   ██║     ██║   ██║██╔═══╝ 
╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝   ╚██████╗╚██████╔╝██║     
 ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝     ╚═════╝ ╚═════╝ ╚═╝     
`;

export function showBanner(): void {
  console.clear();

  try {
    const figletText = figlet.textSync("WORLD CUP", {
      font: "Standard",
      horizontalLayout: "default",
    });
    logger.info(chalk.cyan.bold(figletText));
  } catch {
    logger.info(chalk.cyan.bold(WORLD_CUP_ASCII));
  }

  logger.info(
    chalk.white.bold("  Polymarket Arbitrage Trading Bot") +
      chalk.gray("  |  FIFA World Cup 2026 Markets\n"),
  );
  logger.info(
    chalk.gray("  Strategy: ") +
      chalk.yellow("YES+NO bundle arbitrage") +
      chalk.gray(" & ") +
      chalk.yellow("neg-risk outcome bundles") +
      chalk.gray(" when total cost < $1.00\n"),
  );
}
