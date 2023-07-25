
export class Test {
  id!: number;
  test_name!: string;
  duration!: string;
  num_question!: string;
  last_modified!: string;
}
export class Question {
  id!: number;
  subject_id!: string;
  qyear!: string;
  graphics!: string;
  questionText!: string;
  last_modified!: string;
}
export class Option {
  id!: number;
  question_id!: number;
  optionText!: string;
  last_modified!: string;
}
export class Year {

  id!: number;
  year_name!: string;
  last_modified!: string;

}
export class Subjects {
  id!: number;
  subject_name!: string;
  last_modified!: string;  
}
export class TestTaken {
  
  id!: number;
  subject_id!: number;
  test_id!: number;
  year_id!: number;
  correctly_answ!: string;
  wrongly_answ!: string;
  last_modified!: string; 
    
}
export class Marking {
  
  id!: number;
  question_id!: number;
  test_taken_id!: number;
  selected_id!: number;
  correct_id!: number;
  last_modified!: string; 
    
}

