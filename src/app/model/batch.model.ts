import { BatchTimings } from './batch-timings.model';

export class Batch {
    name: string;
    class: string;
    subject: string;
   fee: Number;
    board: string;
    batch_timings: BatchTimings[];
    id:string;
    institute_id: string;
}
