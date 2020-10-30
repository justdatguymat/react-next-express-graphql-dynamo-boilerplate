import os from 'os';
import cluster from 'cluster';
import { Log } from '@logger';
import { sleep } from '@utils';

type TaskFunction = () => void;
type MasterCall = () => void;

export class ClusterManager {
  private workers: cluster.Worker[];
  private total: number;
  private task: TaskFunction;
  private masterCall: MasterCall | undefined;

  constructor(task: TaskFunction, masterCall?: MasterCall, total: number = os.cpus().length) {
    if (total < 1) throw new Error('Invalid number of workers');
    this.total = total;
    this.task = task;
    this.masterCall = masterCall;
    this.workers = [];
  }

  launch(): void {
    if (cluster.isMaster) this.runMaster();
    else if (cluster.isWorker) this.task();
    else throw new Error('Cluster type not recognized');
  }

  private runMaster(): void {
    if (this.masterCall) this.masterCall();

    Log.info(`Master cluster setting up ${this.total} worker(s)`);

    for (let i = 0; i < this.total; i++) {
      this.workers.push(cluster.fork());
    }

    cluster.on('online', (worker) => {
      Log.info(`Worker ${worker.process.pid} is running`);
    });

    cluster.on('exit', async (worker, code, signal) => {
      await sleep(5000);
      Log.warn(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
      Log.info('Starting a new worker');
      this.workers.push(cluster.fork());
    });
  }
}
