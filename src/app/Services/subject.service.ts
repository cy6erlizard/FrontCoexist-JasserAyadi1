import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "../entity/Subject";
import {Observable, catchError} from "rxjs";
import { CustomComment } from '../entity/comment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  readonly baseUrl = 'http://localhost:8000';

  readonly Get_Subject = 'http://localhost:8000/get_all_Subjects';
  readonly ADD_Subject = 'http://localhost:8000/add-Subject';
  readonly DeleteSubject_Subject = 'http://localhost:8000/deleteSubject/';
  readonly UpdateSubject_Subject = 'http://localhost:8000/updateSubject/';
  readonly Get_Comment = 'http://localhost:8000/getCommentsBySubject/';
  readonly Add_Comment = 'http://localhost:8000/addComment';
  readonly Update_Comment = 'http://localhost:8000/updateCommentToSubject/';
  readonly Delete_Comment = 'http://localhost:8000/deleteComment/';
  handleError: any;


  constructor(private httpClient: HttpClient) {
  }
  getAllSubjects() {
    return this.httpClient.get<Subject>(this.Get_Subject);
  }
  public addSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.post<Subject>(this.ADD_Subject, subject);
  }
  public deleteSubject(id: number){
    return this.httpClient.delete(this.DeleteSubject_Subject+id);
  }
  //create the updateSubject method to update the subject likes and dislikes in the database using the PUT request method.
  public updateSubject(subject: Subject): Observable<Subject> {
    return this.httpClient.put<Subject>(this.UpdateSubject_Subject + subject.subjectId, subject);
  }

  public getCommentsBySubject(id: number) {
    return this.httpClient.get(this.Get_Comment + id);
  }

  
  public addCommentToSubject(comment: CustomComment, idSub: number, idUser: number): Observable<CustomComment> {
    return this.httpClient.post<CustomComment>(`${this.Add_Comment}/${idSub}/${idUser}`, comment);
  }

  public deleteComment(id: number) {
    return this.httpClient.delete(this.Delete_Comment + id);
  }
  public updateComment(comment: CustomComment): Observable<any> {
    // Serialize the comment object
    const serializedComment = {
      commentId: comment.commentId,
      content: comment.content,
      timestamp: comment.timestamp,
      subjectId: comment.subject.subjectId // Assuming you only need the subjectId for the update
    };

    // Send the serialized comment in the HTTP request
    return this.httpClient.put<any>(`${this.Update_Comment}/${comment.commentId}`, serializedComment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

}
