export const grammarData = [
  {
    id: 1,
    category: "強調句型",
    pattern: "It is/was... that/who...",
    chinese: "強調句（It 分裂句）",
    explanation: "用來強調句子中的某個成分（主詞、受詞或副詞片語）。",
    formula: "It is/was + 強調成分 + that/who + 其餘部分",
    examples: [
      {
        english: "It was hard work that made him successful.",
        chinese: "正是努力工作使他成功的。",
        note: "強調主詞 hard work"
      },
      {
        english: "It is in this library that students love to study.",
        chinese: "正是在這個圖書館，學生們喜歡讀書。",
        note: "強調地方副詞"
      }
    ],
    quiz: {
      question: "It _____ John _____ broke the window.",
      answer: "was / who",
      hint: "強調人時用 who"
    }
  },
  {
    id: 2,
    category: "連接詞句型",
    pattern: "Not only... but also...",
    chinese: "不但…而且…",
    explanation: "連接兩個平行結構，強調兩件事都成立，語氣比 and 更強烈。",
    formula: "Not only + A + but also + B",
    examples: [
      {
        english: "She is not only smart but also hardworking.",
        chinese: "她不僅聰明，而且勤奮。",
        note: "連接兩個形容詞"
      },
      {
        english: "Not only did he pass the exam, but he also got the highest score.",
        chinese: "他不僅通過了考試，還得了最高分。",
        note: "Not only 置首，主詞與助動詞倒裝"
      }
    ],
    quiz: {
      question: "Not only _____ he pass, but he also scored 100.",
      answer: "did",
      hint: "Not only 放句首時，後面主詞與助動詞需倒裝"
    }
  },
  {
    id: 3,
    category: "讓步句型",
    pattern: "Despite / In spite of + N/Ving",
    chinese: "儘管…",
    explanation: "表示讓步，後面接名詞或動名詞，不接子句（子句要用 although/though）。",
    formula: "Despite/In spite of + N / Ving + 主句",
    examples: [
      {
        english: "Despite the heavy rain, the game continued.",
        chinese: "儘管大雨，比賽仍繼續進行。",
        note: "後接名詞片語"
      },
      {
        english: "In spite of feeling tired, she kept studying.",
        chinese: "儘管感到疲累，她仍繼續讀書。",
        note: "後接動名詞片語"
      }
    ],
    quiz: {
      question: "Despite _____ hard, he failed the exam.",
      answer: "studying / working",
      hint: "despite 後接動名詞（Ving）"
    }
  },
  {
    id: 4,
    category: "虛主詞句型",
    pattern: "It is + adj + to V / that + 子句",
    chinese: "虛主詞 It 句型",
    explanation: "以 it 作為形式主詞，真正的主詞（to V 或 that 子句）放在句尾。",
    formula: "It is + adj + to V + O / that + S + V",
    examples: [
      {
        english: "It is important to study English every day.",
        chinese: "每天學英文很重要。",
        note: "真主詞為 to study English every day"
      },
      {
        english: "It is known that exercise is good for health.",
        chinese: "眾所周知，運動對健康有益。",
        note: "真主詞為 that 子句"
      }
    ],
    quiz: {
      question: "It is necessary _____ you to finish the homework.",
      answer: "for",
      hint: "It is + adj + for + 人 + to V"
    }
  },
  {
    id: 5,
    category: "分詞構句",
    pattern: "Ving / Vpp, S + V...",
    chinese: "分詞構句",
    explanation: "簡化副詞子句，兩子句主詞相同時，從屬子句可改為分詞構句。",
    formula: "主動：Ving + 主句 / 被動：Vpp + 主句",
    examples: [
      {
        english: "Walking down the street, she saw an old friend.",
        chinese: "走在街上時，她看見了一位老朋友。",
        note: "主動分詞構句，表時間"
      },
      {
        english: "Written in simple English, the book is easy to read.",
        chinese: "由於用簡單英文寫成，這本書很易讀。",
        note: "被動分詞構句，表原因"
      }
    ],
    quiz: {
      question: "_____ (finish) the project, she went home early.",
      answer: "Having finished",
      hint: "完成式分詞構句表示先完成的動作"
    }
  },
  {
    id: 6,
    category: "條件句型",
    pattern: "Unless + 子句",
    chinese: "除非…",
    explanation: "Unless = if...not，表示「除非某條件成立，否則…」",
    formula: "Unless + S + V, S + will/would + V",
    examples: [
      {
        english: "Unless you study hard, you will fail the exam.",
        chinese: "除非你努力讀書，否則你會考不過。",
        note: "Unless = If you don't study hard"
      },
      {
        english: "She won't come unless she is invited.",
        chinese: "除非受到邀請，否則她不會來。",
        note: "條件子句用現在式代替未來式"
      }
    ],
    quiz: {
      question: "Unless it _____ (rain), we will have the picnic.",
      answer: "rains",
      hint: "條件子句（unless/if）用現在式代未來式"
    }
  },
  {
    id: 7,
    category: "關係子句",
    pattern: "關係代名詞 who / which / that",
    chinese: "關係子句（形容詞子句）",
    explanation: "用來修飾先行詞（名詞），who 指人，which 指物，that 指人或物。",
    formula: "先行詞 + who/which/that + 動詞...",
    examples: [
      {
        english: "The student who studies hard will succeed.",
        chinese: "努力學習的學生會成功。",
        note: "who 修飾人"
      },
      {
        english: "The book which was published last year became a bestseller.",
        chinese: "去年出版的那本書成了暢銷書。",
        note: "which 修飾物"
      }
    ],
    quiz: {
      question: "The man _____ called you is my teacher.",
      answer: "who / that",
      hint: "修飾人時用 who 或 that"
    }
  },
  {
    id: 8,
    category: "比較句型",
    pattern: "The + 比較級, the + 比較級",
    chinese: "越…越…",
    explanation: "表示兩件事成正比，一件事程度增加，另一件事也隨之增加或減少。",
    formula: "The + 比較級 + S + V, the + 比較級 + S + V",
    examples: [
      {
        english: "The harder you study, the better your results will be.",
        chinese: "你越努力讀書，成績就越好。",
        note: "兩個比較級子句"
      },
      {
        english: "The more I know him, the more I like him.",
        chinese: "我越了解他，就越喜歡他。",
        note: "用 more 形成比較級"
      }
    ],
    quiz: {
      question: "The more you practice, the _____ you will become.",
      answer: "better",
      hint: "good 的比較級是 better"
    }
  },
  {
    id: 9,
    category: "被動語態",
    pattern: "S + be + Vpp + (by...)",
    chinese: "被動語態",
    explanation: "強調動作承受者，或不知道/不需要說明動作者時使用。",
    formula: "S + be動詞 + 過去分詞(pp) + by + 動作者（可省略）",
    examples: [
      {
        english: "The window was broken by the boy.",
        chinese: "窗戶被那個男孩打破了。",
        note: "過去式被動"
      },
      {
        english: "English is spoken all over the world.",
        chinese: "英語在全世界被使用。",
        note: "現在式被動，by 省略"
      }
    ],
    quiz: {
      question: "The cake _____ (eat) by the children yesterday.",
      answer: "was eaten",
      hint: "過去式被動：was/were + 過去分詞"
    }
  },
  {
    id: 10,
    category: "假設語氣",
    pattern: "If + 過去式, S + would + V",
    chinese: "與現在事實相反的假設",
    explanation: "與現在事實相反，If 子句用過去式，主要子句用 would/could/might + V。",
    formula: "If + S + 過去式動詞, S + would/could + V",
    examples: [
      {
        english: "If I had more time, I would travel around the world.",
        chinese: "如果我有更多時間，我就會環遊世界。（但現在沒有）",
        note: "與現在事實相反"
      },
      {
        english: "If she were taller, she could be a model.",
        chinese: "如果她更高的話，她可以當模特兒。",
        note: "be 動詞用 were（不分人稱）"
      }
    ],
    quiz: {
      question: "If I _____ (be) you, I would apologize.",
      answer: "were",
      hint: "假設語氣中 be 動詞用 were（不分人稱）"
    }
  },
  {
    id: 11,
    category: "so...that 結果句型",
    pattern: "so + adj/adv + that + 子句",
    chinese: "如此…以致於…",
    explanation: "表示程度很高，導致某個結果。",
    formula: "S + V + so + adj/adv + that + S + V",
    examples: [
      {
        english: "She was so tired that she fell asleep immediately.",
        chinese: "她太累了，以致於立刻睡著了。",
        note: "so + 形容詞 + that"
      },
      {
        english: "He spoke so fast that I couldn't understand him.",
        chinese: "他說得太快，我聽不懂他說什麼。",
        note: "so + 副詞 + that"
      }
    ],
    quiz: {
      question: "The movie was so boring _____ everyone fell asleep.",
      answer: "that",
      hint: "so...that 固定搭配"
    }
  },
  {
    id: 12,
    category: "讓步子句",
    pattern: "Although / Though / Even though + 子句",
    chinese: "雖然…",
    explanation: "表示讓步，雖然有某條件/情況，但主句的結果仍然如此。注意不能和 but 連用。",
    formula: "Although + S + V, S + V （不可再加 but）",
    examples: [
      {
        english: "Although it was raining, we went for a walk.",
        chinese: "雖然在下雨，我們還是去散步了。",
        note: "雖然有 although，主句不加 but"
      },
      {
        english: "Even though she was tired, she finished the report.",
        chinese: "即使她很累，她還是完成了報告。",
        note: "even though 語氣更強"
      }
    ],
    quiz: {
      question: "Although he is rich, he _____ (not be) happy.",
      answer: "is not",
      hint: "although 後不加 but，主句正常寫"
    }
  }
]
