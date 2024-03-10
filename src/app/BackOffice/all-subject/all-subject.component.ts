import { Component } from '@angular/core';
import {Subject} from "../../entity/Subject";
import {SubjectService} from "../../Services/subject.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {CustomComment} from "../../entity/comment";

@Component({
  selector: 'app-all-subject',
  templateUrl: './all-subject.component.html',
  styleUrls: ['./all-subject.component.css']
})
export class AllSubjectComponent {
  newSubjectFormGroup! : FormGroup;
  allSubjects: Subject[] = [];
  likedSubjects: Set<number> = new Set<number>();
  dislikedSubjects: Set<number> = new Set<number>();
  newCommentContent: string = '';

  
  
  constructor(private subjectService: SubjectService, private route: Router) {
  }

  toggleCommentInput(subject: Subject) {
    subject.showCommentInput = !subject.showCommentInput;
    if (!subject.showCommentInput) {
      this.newCommentContent = ''; // Reset the input content when hiding the input field
    }
  }
  addComment(subject: Subject) {
    const comment: CustomComment = {
      commentId: 0, // Assign a default value of 0 to commentId
      content: this.newCommentContent,
      timestamp: new Date(),
      subject: subject, // Use the subject instead of subjectId
      isEditing: false, // Add the isEditing property
      editContent: '', // Add the editContent property
      subjectId: subject.subjectId // Add the subjectId property
    };
    const userId = 1;
    this.subjectService.addCommentToSubject(comment, subject.subjectId, userId).subscribe({
      next: (response: CustomComment) => {
        console.log('Comment added successfully', response);
        subject.comments.push(comment);
        this.newCommentContent = ''; // Reset the input content after adding the comment
      },
      error: (error: any) => {
        console.error('Failed to add comment', error);
      }
    });
  }
  

  toggleEditComment(comment: CustomComment) {
    comment.isEditing = !comment.isEditing;
    if (comment.isEditing) {
      // Initialize the input field with the current comment content
      comment.editContent = comment.content;
    }
  }
  updateComment(comment: CustomComment) {
    this.subjectService.updateComment(comment).subscribe(
      () => {
        console.log('Comment updated successfully');
        // Update the comment in the local data
        const subjectIndex = this.allSubjects.findIndex(subject => subject.comments.includes(comment));
        if (subjectIndex !== -1) {
          const updatedSubject = { ...this.allSubjects[subjectIndex] }; // Create a copy of the subject
          const commentIndex = updatedSubject.comments.findIndex(c => c.commentId === comment.commentId);
          if (commentIndex !== -1) {
            updatedSubject.comments[commentIndex] = { ...comment }; // Create a copy of the updated comment
            this.allSubjects[subjectIndex] = updatedSubject; // Update the subject in the local data
          }
        }
        comment.isEditing = false; // Hide the input field after updating
      },
      error => {
        console.error('Failed to update comment', error);
      }
    );
  }
  
  
  deleteComment(comment: CustomComment) {
    this.subjectService.deleteComment(comment.commentId).subscribe(
      () => {
        console.log('Comment deleted successfully');
        // Remove the deleted comment from the list
        const index = this.allSubjects.findIndex(subject => subject.comments.includes(comment));
        if (index !== -1) {
          this.allSubjects[index].comments = this.allSubjects[index].comments.filter(c => c !== comment);
        }
      },
      error => {
        console.error('Failed to delete comment', error);
      }
    );
  }

  

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((data) => {
      // @ts-ignore
      this.allSubjects = data;
    });
  }

  redirectToCreateSubject() {
    this.route.navigate(['/admin/create-subject']);
  }
  handleDeleteSubject(subject: Subject) {
    let conf = confirm("Are you sure?");
    if (!conf) return;

    this.subjectService.deleteSubject(subject.subjectId).subscribe({
      next: (resp) => {
        // Supprimer l'élément du tableau
        const index = this.allSubjects.indexOf(subject);
        if (index !== -1) {
          this.allSubjects.splice(index, 1);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

likeSubject(subject: Subject) {
    if (!this.likedSubjects.has(subject.subjectId)) {
      // If already disliked, remove dislike
      if (this.dislikedSubjects.has(subject.subjectId)) {
        subject.dislikes--;
        this.dislikedSubjects.delete(subject.subjectId);
      }
      subject.likes++;
      this.likedSubjects.add(subject.subjectId);
      // Update subject likes
      this.subjectService.updateSubject(subject).subscribe(
        response => {
          console.log('Likes updated successfully', response);
        },
        error => {
          console.error('Failed to update likes', error);
          // Rollback the increment on error if needed
          subject.likes--;
          this.likedSubjects.delete(subject.subjectId);
        }
      );
    }
  }

  dislikeSubject(subject: Subject) {
    if (!this.dislikedSubjects.has(subject.subjectId)) {
      // If already liked, remove like
      if (this.likedSubjects.has(subject.subjectId)) {
        subject.likes--;
        this.likedSubjects.delete(subject.subjectId);
      }
      subject.dislikes++;
      this.dislikedSubjects.add(subject.subjectId);
      // Update subject dislikes
      this.subjectService.updateSubject(subject).subscribe(
        response => {
          console.log('Dislikes updated successfully', response);
        },
        error => {
          console.error('Failed to update dislikes', error);
          // Rollback the increment on error if needed
          subject.dislikes--;
          this.dislikedSubjects.delete(subject.subjectId);
        }
      );
    }
  }


}
