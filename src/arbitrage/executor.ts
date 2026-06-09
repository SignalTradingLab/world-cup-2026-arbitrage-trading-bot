import type { ArbitrageOpportunity, ArbitrageSettings, TradeExecution } from "../types.js";

export class TradeExecutor {
  private tradesExecuted = 0;
  private totalSimulatedProfit = 0;

  constructor(private settings: ArbitrageSettings) {}

  updateSettings(settings: ArbitrageSettings): void {
    this.settings = settings;
  }

  getStats() {
    return {
      tradesExecuted: this.tradesExecuted,
      totalSimulatedProfit: this.totalSimulatedProfit,
    };
  }

  async execute(opportunity: ArbitrageOpportunity): Promise<TradeExecution> {
    const sizeUsd = Math.min(opportunity.maxSizeUsd, this.settings.maxPositionUsd);
    const projectedProfit = opportunity.expectedProfit * sizeUsd;

    if (this.settings.tradingMode === "dry_run") {
      this.tradesExecuted += 1;
      this.totalSimulatedProfit += projectedProfit;

      const legs = opportunity.legs
        .map((leg) => `${leg.outcome} @ $${leg.price.toFixed(4)}`)
        .join(" + ");

      return {
        opportunity,
        mode: "dry_run",
        success: true,
        message: `[DRY RUN] Bought $${sizeUsd.toFixed(2)} bundle: ${legs} | Est. profit $${projectedProfit.toFixed(4)}`,
        timestamp: new Date(),
      };
    }

    return {
      opportunity,
      mode: "live",
      success: false,
      message:
        "Live trading requires PRIVATE_KEY and @polymarket/clob-client-v2. Set TRADING_MODE=dry_run or configure wallet credentials.",
      timestamp: new Date(),
    };
  }
}
