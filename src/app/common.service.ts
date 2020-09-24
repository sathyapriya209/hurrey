import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Institute } from './model/institute.model';
import * as firebase from 'firebase/app'
import { Batch } from './model/batch.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private firestore: AngularFirestore) { }

  getInstitutes(): Observable<Institute[]> {

    let query = this.firestore.collection('Institutes')

    return query.get()
      .pipe(
        map(snapshot => {
          let items = [];
          snapshot.docs.map(a => {
            let data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push({ id, ...data })
          })
          return items
        }),
      );

  }

  getInstituteById(id: string): Observable<any> {
    return this.firestore.doc('Institutes/' + id).valueChanges();
  }


  createInstitute(institute: Institute) {
    console.log(institute);
    return this.firestore.collection('Institutes').add({
      id: institute.id,
      name: institute.name,
      createdDate: new Date().toISOString(),
      address: {
        city: institute.address.city,
        district: institute.address.district,
        country: institute.address.country,
        latlong: institute.address.latlong
      }
    });
  }

  updateInstitue(institute: Institute) {
   return this.firestore.doc('Institutes/' + institute.id).update({
      id: institute.id,
      name: institute.name,
      createdDate: new Date().toISOString(),
      address: {
        city: institute.address.city,
        district: institute.address.district,
        country: institute.address.country,
        latlong: institute.address.latlong
      }
    });
  }

  deleteInstitute(institute: Institute) {
    this.firestore.doc('Institutes/' + institute.id).delete();
  }

  getBatches() {
    let query = this.firestore.collection('Batches')

    return query.get()
      .pipe(
        map(snapshot => {
          let items = [];
          snapshot.docs.map(a => {
            let data = a.data();
            const id = a.id;
            data['id'] = id;
            items.push({ id, ...data })
          })
          return items
        }),
      );
  }

  createBatch(batch: Batch) {
    console.log(batch);
    let counter: number = 0
    let docRef = [];
    batch.batch_timings.forEach(bt => {
      docRef.push({
        batch_start_time: bt.batch_start_time.toISOString(),
        batch_end_time:bt.batch_end_time.toISOString(),
        day: bt.day
      });
      /*this.firestore.collection('BatchTimings').add({
        id: bt.id,
        batch_start_time: firebase.firestore.FieldValue.serverTimestamp(),
        batch_end_time: firebase.firestore.FieldValue.serverTimestamp(),
        day: bt.day
      }).then(df => {
        docRef.push(df);
        counter++;
      });*/
    });
    return this.firestore.collection('Batches').add({
      id: batch.id,
      name: batch.name,
      class: batch.class,
      subject: batch.subject,
      fee: batch.fee,
      board: batch.board,
      institute_id:batch.institute_id,
      batch_timings: docRef
    });
  }

  updateBatch(batch: Batch) {
    let docRef = [];
    batch.batch_timings.forEach(bt => {
      docRef.push({
        batch_start_time: bt.batch_start_time instanceof Date ? bt.batch_start_time.toISOString() : bt.batch_start_time,
        batch_end_time: bt.batch_end_time instanceof Date ? bt.batch_end_time.toISOString() : bt.batch_end_time,
        day: bt.day
      });
    });

    return this.firestore.doc('Batches/' + batch.id).update({

      name: batch.name,
      class: batch.class,
      subject: batch.subject,
      fee: batch.fee,
      board: batch.board,
      batch_timings: docRef,
      id: batch.id,
      institute_id:batch.institute_id,

    });
  }

  getBatchById(id: string): Observable<any> {
    return this.firestore.doc('Batches/' + id).valueChanges();
  }

  deleteBatch(batch: Batch) {
    this.firestore.doc('Batches /' + batch.id).delete();
  }
}

