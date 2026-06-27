export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

const questions: Record<string, Record<number, Question[]>> = {
  Addition: {
    1: [
      { id: "a1-1", text: "What is 5 + 3?", options: ["7", "8", "9", "10"], correctIndex: 1 },
      { id: "a1-2", text: "What is 2 + 7?", options: ["8", "9", "10", "11"], correctIndex: 1 },
      { id: "a1-3", text: "What is 4 + 4?", options: ["6", "7", "8", "9"], correctIndex: 2 },
      { id: "a1-4", text: "What is 1 + 9?", options: ["10", "11", "12", "13"], correctIndex: 0 },
      { id: "a1-5", text: "What is 6 + 2?", options: ["7", "8", "9", "10"], correctIndex: 1 },
    ],
    2: [
      { id: "a2-1", text: "What is 15 + 12?", options: ["25", "26", "27", "28"], correctIndex: 2 },
      { id: "a2-2", text: "What is 23 + 14?", options: ["35", "36", "37", "38"], correctIndex: 2 },
      { id: "a2-3", text: "What is 45 + 5?", options: ["40", "45", "50", "55"], correctIndex: 2 },
      { id: "a2-4", text: "What is 31 + 19?", options: ["40", "50", "60", "70"], correctIndex: 1 },
      { id: "a2-5", text: "What is 55 + 22?", options: ["75", "77", "79", "81"], correctIndex: 1 },
    ],
  },
  Subtraction: {
    1: [
      { id: "s1-1", text: "What is 10 - 4?", options: ["5", "6", "7", "8"], correctIndex: 1 },
      { id: "s1-2", text: "What is 8 - 3?", options: ["4", "5", "6", "7"], correctIndex: 1 },
      { id: "s1-3", text: "What is 7 - 7?", options: ["0", "1", "2", "3"], correctIndex: 0 },
      { id: "s1-4", text: "What is 9 - 2?", options: ["5", "6", "7", "8"], correctIndex: 2 },
      { id: "s1-5", text: "What is 6 - 1?", options: ["3", "4", "5", "6"], correctIndex: 2 },
    ],
  },
  Multiplication: {
    2: [
      { id: "m2-1", text: "What is 2 x 5?", options: ["8", "10", "12", "14"], correctIndex: 1 },
      { id: "m2-2", text: "What is 3 x 4?", options: ["9", "10", "11", "12"], correctIndex: 3 },
      { id: "m2-3", text: "What is 5 x 5?", options: ["20", "25", "30", "35"], correctIndex: 1 },
      { id: "m2-4", text: "What is 4 x 2?", options: ["6", "7", "8", "9"], correctIndex: 2 },
      { id: "m2-5", text: "What is 10 x 3?", options: ["20", "30", "40", "50"], correctIndex: 1 },
    ],
  },
};

export function getQuestions(topic: string, year: number): Question[] {
  return questions[topic]?.[year] || questions["Addition"][1];
}
