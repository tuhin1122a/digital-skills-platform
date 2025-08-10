import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Answer {
  questionId: string;
  answer: number;  // number টাইপ
}

interface TestAnswersState {
  answers: Answer[];
}

const initialState: TestAnswersState = {
  answers: [],
};

const testAnswersSlice = createSlice({
  name: "testAnswers",
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.answers.findIndex(a => a.questionId === action.payload.questionId);
      if (index !== -1) {
        state.answers[index] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
    },
    clearAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { saveAnswer, clearAnswers } = testAnswersSlice.actions;
export default testAnswersSlice.reducer;
