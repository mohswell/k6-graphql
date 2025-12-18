# K6 GraphQL Load Testing Project

This repository contains a structured k6 load testing project for GraphQL APIs, written in TypeScript.

It is designed to:
- Load test real GraphQL APIs using k6
- Demonstrate advanced k6 concepts (scenarios, thresholds, custom metrics)
- Teach how GraphQL queries, variables, and batching behave under load
- Provide a clean, scalable project structure for real-world testing

---

## Getting Started

### Prerequisites

- k6 installed  
- Node.js (for TypeScript build step)

### Install dependencies

```bash
npm install
````

---

## Running Tests

### Smoke test (sanity check)

```bash
npm run test:smoke
```

Validates:

* API is reachable
* Basic GraphQL queries work
* No major errors

---

### Load test (expected traffic)

```bash
npm run test:load
```

Simulates normal production usage with multiple user journeys running in parallel.

---

### Stress test (beyond capacity)

```bash
npm run test:stress
```

Pushes the API beyond expected limits to observe failure behavior.

---

### Spike test (sudden traffic burst)

```bash
npm run test:spike
```

Simulates a sudden surge in traffic and measures recovery.

---

## Configuration

### Scenarios & Load Profiles

Scenario definitions live in:

```
src/config/scenarios.ts
```

These define:

* VU stages
* Duration
* Thresholds

They are referenced by test scripts via `options.scenarios`.

---

### Thresholds

Default performance thresholds are defined in:

```
src/config/thresholds.ts
```

They apply globally and include:

* HTTP latency
* GraphQL latency
* Error rates
* Success rates

---

## Test Scenarios

User behavior is modeled in `src/scenarios/`, for example:

* Browsing countries
* Looking up country details
* Filtering by continent or currency
* Batch GraphQL queries

Each scenario represents a **realistic user journey**, not a random request.

---

## 📊 Metrics

In addition to built-in k6 metrics, the project tracks:

* GraphQL request duration
* GraphQL error rate
* GraphQL success rate

These help distinguish:

* HTTP failures
* GraphQL resolver failures
* Partial success responses

---

## 🔗 References

* [https://k6.io/docs/](https://k6.io/docs/)
* [https://graphql.org/learn/](https://graphql.org/learn/)
* [https://k6.io/docs/test-types/](https://k6.io/docs/test-types/)