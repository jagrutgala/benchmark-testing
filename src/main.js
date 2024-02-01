const math = require("mathjs");

function main() {
  function createObject() {
    return {
      prop1: math.randomInt(0, 100),
      prop2: math.randomInt(0, 100),
      prop3: math.randomInt(0, 100),
      prop4: math.randomInt(0, 100),
      prop5: math.randomInt(0, 100),
    };
  }

  function runBenchmark(nTimes = 10) {
    const timings = [];
    for (let _ = 0; _ < nTimes; _++) {
      const timeTaken = {};

      const createStartMS = performance.now();
      const a = new Array(10_00_000).fill(1).map((x) => createObject());
      const createEndMS = performance.now();
      timeTaken.create = `${createEndMS - createStartMS} ms`;

      const spreadStartMS = performance.now();
      const copyOfASpread = [...a];
      const spreadEndMS = performance.now();
      timeTaken.spread = `${spreadEndMS - spreadStartMS} ms`;

      const pushStartMS = performance.now();
      const copyOfAPush = [];
      for (const v of a) {
        copyOfAPush.push(v);
      }
      const pushEndMS = performance.now();
      timeTaken.push = `${pushEndMS - pushStartMS} ms`;

      timings.push(timeTaken);
    }

    console.table(timings);



    console.table([
      `Average Time (create): ${
        math.mean(timings.map((x) => x.create).map(x => parseFloat(x.substring(0, x.length-3))))
      } ms`,
      `Average Time (spread): ${
        math.mean(timings.map((x) => x.spread).map(x => parseFloat(x.substring(0, x.length-3))))
      } ms`,
      `Average Time (push): ${
        math.mean(timings.map((x) => x.push).map(x => parseFloat(x.substring(0, x.length-3))))
      } ms`,
    ]);
  }

  runBenchmark();
}

main();
