# Design Patterns Basic

**Design patterns** are typical solutions to commonly occurring problems in software design. They are like pre-made blueprints that you can customize to solve a recurring design problem in your code.

https://refactoring.guru/design-patterns/what-is-pattern

## How many design patterns do we have?

- **GoF (Gang of Four) patterns: 23** — the classic, most-cited set.
  - **Creational (5)**, **Structural (7)**, **Behavioral (11)**

Beyond GoF, people commonly include:

- **Enterprise/architecture patterns** (Layered, Hexagonal/Ports & Adapters, CQRS, Event Sourcing, etc.)
- **Concurrency/resilience patterns** (Bulkhead, Circuit Breaker, Retry, Rate Limit, etc.)

## Most frequently used in Python (in real code + interviews)

### 1) Strategy

Swap algorithms/policies (pricing, routing, ranking, auth rules).

- Pythonic form: pass a callable, or use a small class with `__call__`.

### 2) Factory (often “Simple Factory”)

Centralize object creation logic (based on config, type, environment).

- Pythonic: dict/registry mapping → constructor.

### 3) Adapter

Wrap external libraries/APIs into your app’s interface (DB client, HTTP client).

- Super common in services.

### 4) Decorator

Add cross-cutting behavior: caching, retries, metrics, auth checks.

- Python has built-in decorator syntax, so this shows up everywhere.

### 5) Observer / Pub-Sub

Events and handlers (domain events, message buses, signals).

- Pythonic: callbacks, event emitters, queues.

### 6) Facade

Expose a simplified interface over a messy subsystem (SDK wrapper, “client” class).

### 7) Template Method (used, but carefully)

Base workflow + hook methods. In Python, often replaced by composition/callables, but still appears.

### 8) Singleton (rarely recommended)

Python modules already behave like singletons; explicit Singleton is usually a smell.

- Interview-safe phrasing: “Prefer dependency injection; use module-level instance only when justified.”

## Staff Engineer Notes: Design Patterns in CPython & the Python Standard Library (with real source refs)

When you interview at senior/staff level, “design patterns” isn’t about memorizing GoF names—it’s about recognizing **stable abstractions** the runtime/stdlib uses to keep code **extensible, testable, and portable**.

Below are battle-tested patterns you can cite directly from **CPython/stdlib**.

## 1) Iterator Pattern

### What it looks like in Python

Anything you can loop over is using the iterator protocol (`__iter__`, `__next__`).

### Why staff engineers care

- Enables **streaming** processing (ETL/pipelines).
- Avoids loading full datasets into memory.

### Where to reference

- `io` module overview describes file objects/streams and the standard I/O abstractions around them. ([Python documentation](https://docs.python.org/3/library/io.html?utm_source=chatgpt.com))

------

## 2) Context Manager Pattern

### What it is

A standardized “resource lifecycle” protocol: enter → exit (with exception safety).

### Why it matters

- Correct cleanup for resources (files, locks, DB sessions, temp dirs).
- **Composable cleanup** when you don’t know the resources at compile time.

### Key stdlib example: `contextlib.ExitStack`

`ExitStack` is designed to manage multiple context managers programmatically and unwind in reverse order. ([Python documentation](https://docs.python.org/3/library/contextlib.html?utm_source=chatgpt.com))

------

## 3) Factory Pattern

### Example: `pathlib.Path` is an OS-aware factory

Instantiating `Path(...)` yields either a `PosixPath` or `WindowsPath` depending on the platform. ([Python documentation](https://docs.python.org/3/library/pathlib.html?utm_source=chatgpt.com))

**Why this is a factory:** You request “a Path,” and the library chooses the right concrete implementation for you.

### Example: `logging.getLogger(name)` returns a cached logger

Multiple calls with the same name return the **same logger object** (factory + registry/cache behavior). ([Python documentation](https://docs.python.org/3/howto/logging.html?utm_source=chatgpt.com))

------

## 4) Strategy Pattern

### What it looks like in Python for SP

You inject behavior as a function/object (policy) rather than branching everywhere.

### Canonical stdlib pattern

`functools.lru_cache` / `functools.cache` changes performance behavior by applying a caching strategy around your function. ([Python documentation](https://docs.python.org/3/library/functools.html?utm_source=chatgpt.com))

**Staff angle:** “Strategy” in Python is often just “pass a callable” or “decorate the callable.”

------

## 5) Observer / Publish–Subscribe Pattern

### Example A: `logging` handlers

`logging` is explicitly a flexible event logging system; loggers emit events and handlers process them (subscriber chain). ([Python documentation](https://docs.python.org/3/library/logging.html?utm_source=chatgpt.com))

### Example B: `asyncio.Future.add_done_callback`

Callbacks registered via `add_done_callback()` are invoked when the Future completes (and scheduled on the loop). ([Python documentation](https://docs.python.org/3/library/asyncio-future.html?utm_source=chatgpt.com))

**Staff angle (distributed workers):**

- Futures + callbacks are a core building block for composing async workflows without tight coupling.

------

## 6) Adapter Pattern

### Example: `io.TextIOWrapper` adapts byte streams to text streams

The `subprocess` docs explicitly mention using `io.TextIOWrapper` defaults when operating in text mode, reflecting the “layered” stream design. ([Python documentation](https://docs.python.org/3/library/subprocess.html))

**Why it’s an adapter:** it bridges a binary buffer to a text interface (encoding/decoding layer). (See `io` stream categories for the model.) ([Python documentation](https://docs.python.org/3/library/io.html?utm_source=chatgpt.com))

------

## 7) Facade Pattern

### Example: `subprocess.run()` is the recommended high-level API

The `subprocess` docs say the recommended approach is to use `run()` for use cases it can handle, falling back to `Popen` for advanced use. ([Python documentation](https://docs.python.org/3/library/subprocess.html))

**Why it’s a facade:** it hides the complexity of process creation/IO/waiting behind a simpler function that returns a `CompletedProcess`.

------

## 8) Template Method Pattern

### Example: `unittest.TestCase` lifecycle

`TestCase` defines a stable execution skeleton where `setUp()` and `tearDown()` run per test (the algorithm is fixed; you override steps). ([Python documentation](https://docs.python.org/3/library/unittest.html?utm_source=chatgpt.com))

**Staff angle:** This is how frameworks keep the *workflow* stable while letting you customize the *hooks*.

------

## 9) Singleton (Pythonic form)

### Example: module caching via `sys.modules`

`sys.modules` maps module names to already loaded modules and is central to import caching behavior. ([Python documentation](https://docs.python.org/3/library/sys.html))

**Staff nuance:** In Python, “singleton” is often just “module-level instance + import cache,” and explicit singleton classes are usually unnecessary.

------

## 10) Abstract Base Classes as Contract Boundaries (DIP-friendly)

### Example: `importlib.abc`

`importlib.abc` contains the core abstract base classes that define the import system interfaces. ([Python documentation](https://docs.python.org/3/library/importlib.html?utm_source=chatgpt.com))

**Why staff engineers care:** this is Dependency Inversion in practice—core logic depends on stable ABC contracts while implementations vary.

### How to use these in ETL & Distributed Worker interviews (quick talk track)

- **Iterator + Context Manager** → streaming ETL with safe cleanup (files, DB cursors).
- **Strategy + Decorator (`lru_cache`)** → policy injection + performance control without touching core logic. ([Python documentation](https://docs.python.org/3/library/functools.html?utm_source=chatgpt.com))
- **Observer (`logging`, `Future callbacks`)** → decoupled event handling and async composition. ([Python documentation](https://docs.python.org/3/howto/logging.html?utm_source=chatgpt.com))
- **Facade (`subprocess.run`)** → simple interfaces for common operations; drop down to advanced API only when needed. ([Python documentation](https://docs.python.org/3/library/subprocess.html))
- **ABC contracts (`importlib.abc`)** → clean extension points and DIP boundaries. ([Python documentation](https://docs.python.org/3/library/importlib.html?utm_source=chatgpt.com))
