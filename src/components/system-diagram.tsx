import { ArrowDown, Check, Database, Layers3, Radio, ShieldCheck } from "lucide-react";

export function SystemDiagram() {
  return (
    <div className="system-diagram" role="img" aria-label="LedgerGuard architecture: authenticated request, atomic ledger and outbox transaction, Kafka event delivery, and an idempotent consumer.">
      <div className="diagram-heading"><span className="mono">A SYSTEM, CONSIDERED.</span><span className="tiny-cross">+</span></div>
      <div className="diagram-content" aria-hidden="true">
        <div className="diagram-request"><ShieldCheck size={15} /><span>Authenticated request</span><span className="mono request-method">POST</span></div>
        <div className="diagram-connector"><span className="flow-dot" /><ArrowDown size={15} /></div>
        <div className="transaction-boundary"><span className="boundary-label mono">ONE ATOMIC TRANSACTION</span><div className="transaction-nodes"><div><Database size={22} /><span>Ledger</span><small>Source of truth</small></div><span className="node-plus">+</span><div><Layers3 size={22} /><span>Outbox</span><small>Durable event</small></div></div></div>
        <div className="diagram-connector"><span className="flow-dot second" /><ArrowDown size={15} /></div>
        <div className="diagram-consumer"><Radio size={17} /><span>Kafka → consumer</span><Check size={15} /></div>
      </div>
      <div className="diagram-caption mono"><span className="status-dot" /> BUILT TO HANDLE THE WHAT-IFS.</div>
    </div>
  );
}
