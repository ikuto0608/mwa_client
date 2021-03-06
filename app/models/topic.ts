export class Topic {
  public id: number;
  public question: string;
  public description: string;
  public questionArray: Array<string>;
  public indexOfAnswerArray: Array<number>;
  public userId: number;
  public examId: number;
  public volatileJson: {answer: "", correct: ""};

  constructor() {
    this.questionArray = new Array<string>();
    this.indexOfAnswerArray = new Array<number>();
  }

  get sample() {
    let questionArray = new Array<any>();
    questionArray = this.questionArray.map((q, index) => {
      return q;
    });

    this.indexOfAnswerArray.forEach((index) => {
      questionArray[index] = "( " + questionArray[index] + " )";
    });

    return questionArray.join(" ");
  }

  get sampleAnswered() {
    let questionArray = new Array<any>();

    let i: number = 0;
    questionArray = this.questionArray.map((q, index) => {
      this.indexOfAnswerArray.forEach((indexOfAnswer) => {
          if (indexOfAnswer === index) {
            if (!this.volatileJson.correct) {
              q = this.volatileJson.answer[i];
              i += 1;
            }
          }
      });
      // error TS2339: Property "includes" does not exist on type "number[]".
      // if(this.indexOfAnswerArray.includes(index)) {
      //  if (!this.volatileJson.correct) {
      //    q = this.volatileJson.answer[i]
      //    i += 1
      //  }
      // }
      return q;
    });

    this.indexOfAnswerArray.forEach((index) => {
      questionArray[index] = "( " + questionArray[index] + " )";
    });

    return questionArray.join(" ");
  }

  toJson(): any {
    return JSON.stringify({topic: { id: this.id, question: this.question, description: this.description, question_array: this.questionArray, index_array_of_answer: this.indexOfAnswerArray, user_id: this.userId, exam_id: this.examId }});
  }

  static toTopic(json: any): Topic {
    let topic = new Topic();
    topic.indexOfAnswerArray = json.index_array_of_answer;
    topic.questionArray =  json.question_array;
    return (<any>Object).assign(topic, json);
  }
}
