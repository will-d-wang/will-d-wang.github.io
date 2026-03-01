# GoF 23 Design Patterns

## Real examples from CPython / Python stdlib (with source refs)

Python often implements GoF ideas *more simply* (callables, modules, protocols), but the patterns absolutely show up in CPython/stdlib. Below is a practical mapping you can publish and also reuse in interviews.

------

## Creational Patterns (5)

### 1) Abstract Factory

**Definition:** Provide an interface for creating **families of related objects** without specifying their concrete classes; lets you swap whole “product families” consistently.

**Example: `pathlib.Path` chooses the right concrete class for your platform.**
`Path(...)` instantiates a **concrete path** implementation appropriate to the OS (e.g., POSIX vs Windows), so callers depend on the abstraction (“a Path”) while the library picks the concrete type. ([Python documentation](https://docs.python.org/3/library/pathlib.html))

### 2) Builder

**Definition:** Separate the construction of a complex object from its representation so the same construction process can create different representations; supports **incremental assembly**.

**Example: `email.message.EmailMessage` builds structured MIME messages incrementally.**
You construct the message by adding headers, body parts, and attachments, then serialize/send via other modules. The docs describe `EmailMessage` as the central object model for creating/modifying structured messages. ([Python documentation](https://docs.python.org/3/library/email.message.html))

### 3) Factory Method

**Definition:** Define an interface for creating an object, but let subclasses/implementations decide which class to instantiate; framework owns the algorithm, implementations provide the concrete creation step.

**Example: Python’s import system uses Loader contracts (`importlib.abc.Loader`) to “create/execute” modules.**
The import machinery calls `importlib.abc.Loader.exec_module()` as part of the loading workflow—different loaders implement the step, while the framework owns the algorithm. ([Python documentation](https://docs.python.org/3/library/importlib.html))

### 4) Prototype

**Definition:** Create new objects by **cloning** an existing object (the prototype), rather than constructing from scratch.

**Example: `copy.copy()` / `copy.deepcopy()` implement cloning.** ([Python documentation](https://docs.python.org/3/library/copy.html))

### 5) Singleton

**Definition:** Ensure a class/module has **only one instance** (per logical scope) and provide a global access point (used carefully).

**Example A: module import caching (one module object per interpreter process).**
**Example B: `logging.getLogger()` behaves like a named singleton registry** (same-name loggers reuse configuration/handlers patterns). Logging is explicitly a “flexible event logging system” with shared logger/handler infrastructure. ([Python documentation](https://docs.python.org/3/library/logging.html))

------

## Structural (7)

### 6) Adapter

**Definition:** Convert the interface of a class into another interface clients expect; allows incompatible interfaces to work together.

**Example: `io` layering adapts byte streams to text streams (e.g., `TextIOWrapper`).**
The I/O stack is designed as layers of stream abstractions so one interface can be adapted into another. ([Python documentation](https://docs.python.org/3/library/subprocess.html))

### 7) Bridge

**Definition:** Decouple an abstraction from its implementation so the two can vary independently (abstraction ↔ implementation).

**Example: `logging` separates the \*abstraction\* (Logger API) from \*implementations\* (Handlers/Formatters).**
The logging system explicitly separates concerns: loggers expose the interface; handlers decide destinations; formatters define layout. ([Python documentation](https://docs.python.org/3/library/logging.html))

### 8) Composite

**Definition:** Compose objects into tree structures to represent part–whole hierarchies; lets clients treat individual objects and compositions uniformly.

**Example: `email` message object model forms a tree of parts (structured sub-messages).**
Email messages can contain structured sequences of sub-messages (MIME parts), which is classic composite behavior. ([Python documentation](https://docs.python.org/3/library/email.compat32-message.html))

### 9) Decorator

**Definition:** Attach additional responsibilities to an object **dynamically**; a flexible alternative to subclassing for extending behavior.

**Example: `functools.lru_cache` and `functools.cached_property`.**
They wrap existing callables/attributes to add caching behavior without changing the original function/method. ([Python documentation](https://docs.python.org/3/library/functools.html))

**Stdlib examples:** `functools.lru_cache`, `functools.cached_property`, `@property`.

### 10) Facade

**Definition:** Provide a simplified, high-level interface to a complex subsystem.

**Example: `subprocess.run()` is the recommended high-level API; `Popen` is the low-level interface.** ([Python documentation](https://docs.python.org/3/library/subprocess.html))

### 11) Flyweight

**Definition:** Use sharing to support large numbers of fine-grained objects efficiently; typically relies on **immutability** and reuse.

**Example: `sys.intern()` reuses interned string objects to reduce comparisons/memory.** ([Python documentation](https://docs.python.org/3/library/sys.html))
(Staff interview angle: shared immutable objects to reduce allocation/cost in hot paths.)

### 12) Proxy

**Definition:** Provide a placeholder/surrogate that controls access to another object (lazy loading, access control, reference management, etc.).

**Example: `weakref.proxy()` returns a proxy that forwards operations to the referent while it exists.** ([Python documentation](https://docs.python.org/3/library/weakref.html))

------

## Behavioral (11)

### 13) Chain of Responsibility

**Definition:** Pass a request along a chain of handlers until one handles it; decouples sender from concrete receivers and allows flexible pipelines.

**Example: `logging` propagation up the logger hierarchy (child → parent handlers).** ([Python documentation](https://docs.python.org/3/howto/logging.html))

### 14) Command

**Definition:** Encapsulate a request as an object, enabling parameterization, queuing, logging, and undoable operations.

**Example A: `cmd.Cmd` provides a framework for line-oriented command interpreters.** ([Python documentation](https://docs.python.org/3/library/cmd.html))
**Example B: `argparse` supports subcommands (`add_subparsers`) as command dispatch.** ([Python documentation](https://docs.python.org/uk/3.8/library/argparse.html))

### 15) Interpreter

**Definition:** Define a representation for a language/grammar and an interpreter that uses the representation to interpret sentences in the language.

**Example: `ast` gives you an explicit parse tree you can interpret/transform.**
Python exposes its syntax tree, enabling “interpret/transform” workflows (linters, refactoring tools). ([Python documentation](https://docs.python.org/3/library/ast.html))

### 16) Iterator

**Definition:** Provide a way to access elements of an aggregate sequentially without exposing its underlying representation.

**Example: Iteration protocol is foundational (files/streams/collections).**
You see it throughout stdlib I/O and container APIs. ([Python documentation](https://docs.python.org/3/library/pathlib.html))

**Stdlib examples:** Iteration protocol (`__iter__`, `__next__`) across collections; file objects iterate lines.

### 17) Mediator

**Definition:** Define an object that encapsulates how a set of objects interact; reduces direct dependencies between colleagues by routing via the mediator.

**Example: `asyncio` event loop coordinates tasks, callbacks, IO, and subprocesses.**
The docs explicitly describe the event loop as the “core” that runs tasks/callbacks and performs network IO/subprocess operations. ([Python documentation](https://docs.python.org/3/library/asyncio-eventloop.html))

### 18) Memento

**Definition:** Capture and externalize an object’s internal state so it can be restored later, without violating encapsulation.

**Stdlib example (memento-like): `pickle` captures and restores object state (serialization).**
(Use this carefully in interviews: it’s “memento-like,” with security/compat caveats.) ([Python documentation](https://docs.python.org/3/library/email.html))

### 19) Observer

**Definition:** Define a one-to-many dependency so when one object changes state, all dependents are notified and updated automatically.

**Example A: logging handlers subscribe to emitted log records.** ([Python documentation](https://docs.python.org/3/library/logging.html))
**Example B: `asyncio.Future.add_done_callback()` notifies listeners on completion (scheduled via the loop).** ([Python documentation](https://docs.python.org/3/library/asyncio-future.html))

### 20) State

**Definition:** Allow an object to alter its behavior when its internal state changes; the object appears to change its class/behavior as it transitions states.

**Example: `asyncio` Task/Future lifecycle transitions drive behavior (pending → done/cancelled, etc.).**
The tasks/futures docs describe how futures represent eventual results and how callbacks/awaiting interact with the loop. ([Python documentation](https://docs.python.org/3/library/asyncio-task.html))

### 21) Strategy

**Definition:** Define a family of algorithms, encapsulate each one, and make them interchangeable; lets the algorithm vary independently from clients.

**Example: `functools.lru_cache` chooses a caching strategy; `cached_property` chooses instance-level caching semantics.** ([Python documentation](https://docs.python.org/3/library/functools.html)), `sorted(key=...)` (key function as strategy);

### 22) Template Method

**Definition:** Define the skeleton of an algorithm in a base operation, deferring some steps to subclasses/overrides; preserves overall structure while allowing customization.

**Example: `unittest.TestCase`-style lifecycle (set up → run → tear down).**
The unittest docs and examples show the stable lifecycle hooks (`setUp`, `tearDown`) around tests. ([Python documentation](https://docs.python.org/3/library/test.html))

### 23) Visitor

**Definition:** Represent an operation to be performed on elements of an object structure; lets you define new operations without changing the element classes (double-dispatch style).

**Example: `ast.NodeVisitor` / `ast.NodeTransformer` are explicit Visitor implementations.** ([Python documentation](https://docs.python.org/3/library/ast.html))

------

## What to memorize for staff interviews (high signal, low debate)

If you only keep 6 “slam-dunk” mappings:

1. **Visitor → `ast.NodeVisitor/NodeTransformer`** ([Python documentation](https://docs.python.org/3/library/ast.html))
2. **Proxy → `weakref.proxy`** ([Python documentation](https://docs.python.org/3/library/weakref.html))
3. **Flyweight → `sys.intern`** ([Python documentation](https://docs.python.org/3/library/sys.html))
4. **Facade → `subprocess.run` over `Popen`** ([Python documentation](https://docs.python.org/3/library/subprocess.html))
5. **Mediator → `asyncio` event loop** ([Python documentation](https://docs.python.org/3/library/asyncio-eventloop.html))
6. **Factory Method → import loaders (`importlib.abc.Loader`)** ([Python documentation](https://docs.python.org/3/reference/import.html))

## Where this matters for ETL & Distributed Workers

\- **Iterator + Context Manager**: streaming transforms with safe cleanup
\- **Mediator + Observer**: event loops, callbacks, orchestration
\- **Facade + Adapter**: integration with subprocesses, I/O layers, external tools
\- **Strategy + Decorator**: pluggable policies (retry/backoff/caching), instrumentation
