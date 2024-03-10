import { CustomComment } from './comment'; // Import the Comment class

export class Subject {
  subjectId!: number;
  subjectTitle!: string;
  date!: Date;
  content!: string;
  image !: string;
  likes !: number;
  dislikes !: number;
  comments!: CustomComment[];
  showCommentInput!: boolean;

}
