export const Poll = {
  id: '',
  name: '',
  desc: '',
  lastDesc: '',
  questions: [
    {
      order: number,
      desc: '',
      type: '',
      content: '',
      rightAnswerOrder: '',
    },
  ],
  answers: [
  	{
      order: number,
      desc: '',
      type: '',
      content: '',
      questionOrder: '',
    },
  ],
  settings: {
    hasAnswerAutoChangeTime: Boolean,
    answerAutoChangeTime: '',
    hasAnswerTime: Boolean,
    answerTime: '',
    hasPollTime: Boolean,
    pollTime: '',
    showType: '',
    isPollActive: Boolean,
  },
};

// GET ONE POLL, GET POLLS, UPDATE POLL, DELETE POLL, INSERT POLL

export const Users = {
    name: '',
    surname: '',
    email: '',
    pollId:Number,
    questions: [
        order: Number,
        answerOrder: Number
    ]
}

// GET USERS, INSERT USER, DELETE USER
