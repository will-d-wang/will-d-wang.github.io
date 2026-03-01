# Core OOD principles - SOLID  

Here are the SOLID principles with pytest case studies.

## SOLID (useful, but only if applied carefully)

### S — Single Responsibility Principle (SRP)

- Senior interpretation: “One reason to change” = one *axis of change*.
- Interview move: show you can separate:
  - domain rules (pure logic)
  - orchestration (workflow)
  - infrastructure (db/network)
- Smell: a “Service” class that does validation + persistence + email + formatting.

#### Example: clear subsystems with narrow jobs

pytest splits major responsibilities into separate modules/components (roughly):

- **Configuration & plugin loading**: `Config`, plugin manager (`_pytest.config`)
- **Collection tree**: `Session`, `Collector`, `Item` (`_pytest.main`, `_pytest.nodes`)
- **Fixture resolution / injection**: fixture manager (`_pytest.fixtures`)
- **Test execution**: runtest protocol / call phases (`_pytest.runner`)
- **Reporting**: `TestReport`, `CollectReport`, terminal reporting (`_pytest.reports`, `_pytest.terminal`)

**Why this is SRP:** each area changes for different reasons.
 Example: changing fixture scoping shouldn’t require changing the test runner; adding a new reporter shouldn’t require changing collection.

**Interview phrase:** “pytest isolates axes of change: collection, execution, fixtures, reporting, config are separate.”

### O — Open/Closed Principle (OCP)

- Extend with new behavior **without modifying existing code** (most of the time).
- Use: interfaces, strategy pattern, polymorphism, plugin registries.
- Senior note: OCP is not “never modify”; it’s “stable core + extension points”.

#### Example: hook-based extensibility (plugins) without modifying core

pytest exposes many **hooks** (e.g., `pytest_collection_modifyitems`, `pytest_runtest_protocol`, `pytest_addoption`, `pytest_terminal_summary`) so you extend behavior by **adding a plugin**, not by editing pytest.

**What to look for:**

- Hook specs are defined (contract).
- Plugins implement the hooks.
- pytest core calls hooks through the plugin manager.

**Interview phrase:** “pytest core is closed for modification but open for extension through hooks.”

### L — Liskov Substitution Principle (LSP)

- Subtypes must not break expectations of the base type.
- Interview move: mention *contract compatibility*:
  - don’t strengthen preconditions
  - don’t weaken postconditions
- Common pitfall: “Square extends Rectangle” style problems.

#### Example: `Node` / `Collector` / `Item` substitutability in the collection tree

pytest models collection as a tree of nodes:

- `Collector` collects children
- `Item` represents runnable tests

Plugins can introduce **custom collectors/items** (e.g., for new file types), and as long as they follow the expected `Node`/`Item` contracts, pytest can run them through the same pipeline.

**Why this is LSP:** core code treats them as `Item`s/`Collector`s and expects consistent behavior (node id, reporting, runtest phases, etc.). A custom item should not “surprise” the runner.

**Interview phrase:** “Any custom `Item` must behave like an `Item`: same lifecycle and reporting contracts, or it breaks substitution.”

### I — Interface Segregation Principle (ISP)

- Prefer smaller, role-based interfaces over fat “god interfaces”.
- Interview move: define interfaces around *use cases* (Reader/Writer/Notifier), not around data models.

#### Example: many small hooks instead of one giant plugin interface

pytest doesn’t say “implement `IPlugin` with 40 methods.”
 Instead it provides lots of **small, focused hooks**. A plugin can implement only what it needs:

- collection-related hooks
- execution-related hooks
- reporting-related hooks
- config/CLI-related hooks

**Why this is ISP:** plugins depend only on the hook contracts they use, not on unrelated methods.

**Interview phrase:** “pytest’s hook system is ISP in practice: granular, role-based interfaces.”

### D — Dependency Inversion Principle (DIP)

- Depend on abstractions; inject concrete implementations.
- Staff twist: also improves **testability**, **replaceability**, and **deployment modularity**.
- Practical: constructor injection, factories, ports/adapters (hexagonal).

#### Example: pytest depends on abstractions (hook specs), not concrete plugins

pytest core code doesn’t import “myplugin” or hardcode behavior. It calls:

- “the hook named `pytest_runtest_call`”
- “the hook named `pytest_report_teststatus`”
  through a plugin manager.

So high-level policy (run tests, report results) depends on an **abstraction** (hook contracts), while low-level details (plugins) implement those contracts.

**Why this is DIP:** direction of dependency is inverted: core depends on interfaces; implementations depend on those interfaces.

**Interview phrase:** “Core logic depends on hook specs (abstractions), and plugins supply implementations.”

### A tiny concrete example (plugin) that demonstrates OCP + ISP + DIP

This plugin adds a CLI option and marks slow tests as skipped—without touching pytest core:

```python
# conftest.py or a plugin module

import pytest

def pytest_addoption(parser):
    parser.addoption("--skip-slow", action="store_true", help="skip tests marked slow")

def pytest_collection_modifyitems(config, items):
    if not config.getoption("--skip-slow"):
        return
    skip = pytest.mark.skip(reason="--skip-slow enabled")
    for item in items:
        if "slow" in item.keywords:
            item.add_marker(skip)
```

- **OCP**: you extended behavior via hooks
- **ISP**: you only implemented 2 small hooks
- **DIP**: pytest calls your logic through hook contracts, not direct imports

### Give SOLID examples from OSS

“pytest is a great SOLID example: SRP via separate subsystems for collection/fixtures/execution/reporting; OCP via hook-based plugin extension; ISP via many granular hooks; DIP because core depends on hook specs and calls implementations through the plugin manager; LSP via substitutable `Item`/`Collector` nodes in the collection tree.”

## The principles people forget (but staff-level folks mention)

### Composition over inheritance

- Inheritance = tight coupling + fragile base class.
- Composition = swap behavior at runtime, easier testing.
- Interview line: “I use inheritance only for true *is-a* with stable contracts; otherwise compose.”

### Encapsulation & invariants

- Keep state transitions valid:
  - validate in constructor / command methods
  - avoid public mutable fields
- Interview move: “This class guards invariants like `balance >= 0`.”

### Law of Demeter (don’t talk to strangers)

- Avoid `a.getB().getC().doX()`
- Helps reduce coupling and refactor pain.

### Favor immutability for value objects

- Money, EmailAddress, DateRange should be immutable.
- Reduces bugs under concurrency.

------

## Practical design heuristics (what to say during design)

### Separate “Domain” vs “Application” vs “Infrastructure”

- **Domain**: entities, value objects, rules
- **Application**: use cases, orchestration, transactions
- **Infrastructure**: DB, cache, queue, external APIs
  This is a senior-level structure even in small systems.

### Make change easy: identify volatility

Ask “What changes often?”

- pricing rules
- notification channels
- storage backend
- auth providers
  Then put those behind interfaces/strategies.

### Prefer explicit state machines for lifecycle-heavy objects

Orders, tickets, workflows:

- states + allowed transitions
- reduces “if soup” and hidden edge cases.

### Keep polymorphism local; don’t over-engineer

Staff-level signal: “I’ll start simple; add extension points only where requirements are likely to grow.”

------

## Patterns that interviewers like (when justified)

- **Strategy**: pricing, routing, ranking, retry policies
- **Factory**: create objects with invariants
- **Adapter**: wrap external APIs
- **Decorator**: add behaviors like caching, tracing, rate limiting
- **Observer / PubSub**: events, notifications
- **Command**: auditable actions, undo, workflows
- **Template method** (careful): stable skeleton with optional hooks

Don’t list patterns—use them to solve a stated change requirement.

------

## Typical senior interview prompts + what principles to apply

- **“Add a new payment method / notification channel”**
  → OCP + Strategy + Interface segregation
- **“Support multiple storage backends”**
  → DIP + Adapter + clean boundaries
- **“Prevent invalid transitions (cancel after shipped)”**
  → encapsulation + state machine
- **“Need observability + retries + rate limiting”**
  → decorator around ports/adapters; keep domain pure
