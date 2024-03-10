// comment.ts

import { Subject } from './Subject'; // Import the Subject class

export class CustomComment {
  commentId!: number;
  content!: string;
  timestamp!: Date;
  subject!: Subject; // Assuming you have a Subject class defined
  isEditing!: boolean;
  editContent!: string;
  subjectId!: number; // Include the subjectId here instead of a reference to the Subject object

}
