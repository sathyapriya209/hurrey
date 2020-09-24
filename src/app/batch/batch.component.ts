import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { BatchTimings } from '../model/batch-timings.model';
import { Batch } from '../model/batch.model';
import { Institute } from '../model/institute.model';
import * as uuid from 'uuid';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  institutes: Institute[];
  batch: Batch;
  batches: Batch[];
  isEditMode: boolean = false;
  constructor(private cs: CommonService) { }

  ngOnInit(): void {
    this.getAllInstitutes();
    this.initializeBatch();
  }

  getAllInstitutes() {
    this.cs.getInstitutes().subscribe(res => {
      this.institutes = res;
    });
  }

  initializeBatch() {
    this.batch = new Batch();
    this.getAllBatches();
    this.isEditMode = false;
  }

  addBatchtimings() {
    let batchTimings: BatchTimings = new BatchTimings();
    batchTimings.batch_start_time = new Date();
    batchTimings.batch_end_time = new Date();
    if (!this.batch.batch_timings) {
      this.batch.batch_timings = [];
    }
    this.batch.batch_timings.push(batchTimings);
  }
  createBatch() {
    if (!this.isEditMode) {
      this.batch.id = uuid.v4();
      this.cs.createBatch(this.batch).then(res => {
        this.initializeBatch();
      })
    } else {
      this.cs.updateBatch(this.batch).then(res => {
        this.initializeBatch();
      })

    }
  }

  getAllBatches() {
    this.cs.getBatches().subscribe(res => {
      console.log(res);
      this.batches = res;
    });
  }

  getInstituteNameFromId(id: string): string {
    let institute = this.institutes.find(i => i.id == id);
    return institute?.name;
  }

  deleteBatchtiming(indexval: number) {
    this.batch.batch_timings.splice(indexval, 1);
  }

  editBatch(batch: Batch) {
    this.batch = { ...batch };
    this.batch.batch_timings = [];
    batch.batch_timings.forEach(bt => {
      this.batch.batch_timings.push({ ...bt })
    });
    this.isEditMode = true;
  }

}
