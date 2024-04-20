export interface InputGenerator<T> {
    next: () => T;
}

export interface ResultLog<I, O> {
    testIndex: number;
    input: I;
    start: number;
    end: number;
    timing: number;
    result: O;
}

export interface ResultAvgTiming {
    name: string;
    avgTiming: number;
}


export class BenchmarkTester<I,O> {
    benchmarkName: string;
    targetFn;
    inputGenerator: InputGenerator<I>;
    private _resultTimeLog: ResultLog<I,O>[] = [];

    constructor(name, fn, inputGenerator: InputGenerator<I>) {
        this.benchmarkName = name;
        this.targetFn = fn;
        this.inputGenerator = inputGenerator;
    }

    runTestSync(testCount: number) {
        if (testCount < 0) {
            testCount = 0;
        }

        for (let i = 0; i < testCount; i++) {
            const startTime = performance.now();
            const input = this.inputGenerator.next();
            const result = this.targetFn(input);
            const endTime = performance.now();
            const timing = endTime - startTime;
            this._resultTimeLog.push({
                testIndex: i,
                input: input,
                start: startTime,
                end: endTime,
                timing: timing,
                result: result,
            });
        }
    }

    get resultTimeLog() {
        return this._resultTimeLog.map(x => x);
    }

    resetTester() {
        this._resultTimeLog = [];
    }

    fetchTestResultsTiming(): number[] {
        const timings = this._resultTimeLog.map(x => {
            return x.timing;
        });
        return timings;
    }

}

export function summarizeTimingResult(timings: number[]): number {
    const avgTiming = timings.reduce((acc, v) => acc + v, 0) / timings.length;
    return avgTiming;
}

export function displayResultCollection(results: ResultAvgTiming[]) {
    const output = results.map(x => `Average Time (${x.name}): ${x.avgTiming} ms`);
    console.table(output);
}
