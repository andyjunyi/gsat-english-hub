export const TIERS = [
  {
    key: 'tier1', label: '第一層 · 句子骨架', shortLabel: 'T1',
    color: '#996500', bg: 'rgba(153,101,0,0.08)', bd: 'rgba(153,101,0,0.38)',
    chapters: [
      {
        id: 1, num: 'CH.01', title: '英文基本句型',
        diff: 'base', diffLabel: '基礎入門', stars: 3,
        accent: '#996500', glow: 'rgba(153,101,0,0.12)',
        tags: ['五大句型','S/V/O/C','連綴動詞'],
        sections: ['五大句型概覽','S + vi. 完全不及物','S + vi. + SC 主詞補語','S + vt. + O 及物動詞','S + vt. + IO + DO 授與動詞','S + vt. + O + OC 受詞補語','連綴動詞分類'],
        desc: '英文句子的基本骨架。掌握五大句型與四大要素 S/V/O/C，是一切學習的起點。',
        meta: '7 個學習節 · 入門必讀',
        estimatedTime: '45 分鐘',
        highlights: [
          '💡 英文只有五種句型，所有句子都是這五種的變形',
          '🎯 S/V/O/C 四大要素決定句子的基本結構',
          '⚠️ 連綴動詞（look/seem/become）後面接形容詞，不接副詞'
        ],
        related: [2, 3],
      },
      {
        id: 2, num: 'CH.02', title: '動詞時態',
        diff: 'hot', diffLabel: '學測高頻', stars: 5,
        accent: '#996500', glow: 'rgba(153,101,0,0.12)',
        tags: ['12種時態','完成式','進行式','時間軸'],
        sections: ['三時四式總覽','現在簡單式','過去簡單式','未來式','現在進行式','過去進行式','現在完成式','過去完成式','完成進行式'],
        desc: '時態分為三時（現在/過去/未來）× 四式，共 12 種。把動作正確定位在時間軸上。',
        meta: '9 個學習節 · 學測必考',
        estimatedTime: '60 分鐘',
        highlights: [
          '💡 現在完成式（have + p.p.）強調「對現在的影響」，不能和過去時間副詞連用',
          '🎯 過去進行式常與過去簡單式搭配：was doing... when S + V-ed',
          '⚠️ 表「狀態」的動詞（know/like/have）通常不用進行式'
        ],
        related: [3, 6],
      },
      {
        id: 3, num: 'CH.03', title: '被動語態',
        diff: 'mid', diffLabel: '中等難度', stars: 3,
        accent: '#996500', glow: 'rgba(153,101,0,0.12)',
        tags: ['主動→被動','be + p.p.','視角轉換'],
        sections: ['被動語態公式','各時態被動形式','不及物動詞不能被動','特殊被動句型 it is said...','主動改被動練習'],
        desc: '主動語態轉被動，強調受詞或隱藏主詞。be + p.p. 的時態需與原句一致。',
        meta: '5 個學習節',
        estimatedTime: '35 分鐘',
        highlights: [
          '💡 被動公式：be + p.p.，be 動詞的時態對應主動句的時態',
          '🎯 不及物動詞（arrive/happen/occur）沒有受詞，不能改成被動',
          '⚠️ it is said/reported/believed that... 是常見的特殊被動句型'
        ],
        related: [1, 2],
      },
    ],
  },
  {
    key: 'tier2', label: '第二層 · 動詞延伸', shortLabel: 'T2',
    color: '#0d7a5f', bg: 'rgba(13,122,95,0.08)', bd: 'rgba(13,122,95,0.38)',
    chapters: [
      {
        id: 4, num: 'CH.04', title: '助動詞',
        diff: 'mid', diffLabel: '中等難度', stars: 4,
        accent: '#0d7a5f', glow: 'rgba(13,122,95,0.12)',
        tags: ['can/could','should/must','will/would','情態語氣'],
        sections: ['助動詞的基本功能','can / could','may / might','will / would','shall / should','must / have to','ought to / need / dare / used to'],
        desc: '助動詞表達情態與可能性。每個助動詞都有不同的語氣強度，從可能到必然。',
        meta: '7 個學習節',
        estimatedTime: '50 分鐘',
        highlights: [
          '💡 must 表推測（肯定：must be；否定：can\'t be），不用 must not be',
          '🎯 should have + p.p. 表示「本應該做但沒做」，是學測常考句型',
          '⚠️ could / might 語氣比 can / may 更委婉，也可表示過去的能力/許可'
        ],
        related: [2, 6],
      },
      {
        id: 5, num: 'CH.05', title: '主詞與動詞一致',
        diff: 'mid', diffLabel: '中等難度', stars: 3,
        accent: '#0d7a5f', glow: 'rgba(13,122,95,0.12)',
        tags: ['S-V Agreement','集合名詞','不定代名詞'],
        sections: ['基本一致原則','集合名詞當主詞','不定代名詞主詞','動名詞片語主詞','There is/are 結構','就近原則'],
        desc: '主詞與動詞在數（單/複數）上必須一致。掌握特殊主詞，避免常見錯誤。',
        meta: '6 個學習節',
        estimatedTime: '40 分鐘',
        highlights: [
          '💡 either...or / neither...nor 用就近原則：動詞跟最近的主詞一致',
          '🎯 each / every / everyone / everything 當主詞，動詞用單數',
          '⚠️ 動名詞片語（Swimming every day）當主詞，動詞用單數'
        ],
        related: [1, 4],
      },
      {
        id: 6, num: 'CH.06', title: '假設語氣',
        diff: 'hot', diffLabel: '學測高頻', stars: 5,
        accent: '#0d7a5f', glow: 'rgba(13,122,95,0.12)',
        tags: ['if 條件句','與現實相反','wish','倒裝假設'],
        sections: ['假設語氣 vs 直述語氣','與現在事實相反','與過去事實相反','與未來相反','wish / if only','倒裝假設（省略 if）','混合假設語氣'],
        desc: '句子的動作或狀態與真實不符時，用假設語氣表達。許多學生的挑戰，但規律掌握後其實清晰。',
        meta: '7 個學習節 · 學測必考',
        estimatedTime: '65 分鐘',
        highlights: [
          '💡 與現在相反：If + S + V-ed, S + would/could + V（be 動詞一律用 were）',
          '🎯 與過去相反：If + S + had + p.p., S + would have + p.p.',
          '⚠️ 倒裝假設省略 if：Were I you... / Had I known... / Should you need...'
        ],
        related: [2, 4],
      },
    ],
  },
  {
    key: 'tier3', label: '第三層 · 子句系統', shortLabel: 'T3',
    color: '#1a5fb4', bg: 'rgba(26,95,180,0.08)', bd: 'rgba(26,95,180,0.38)',
    chapters: [
      {
        id: 7, num: 'CH.07', title: '名詞子句',
        diff: 'hot', diffLabel: '學測高頻', stars: 4,
        accent: '#1a5fb4', glow: 'rgba(26,95,180,0.12)',
        tags: ['that子句','whether/if','疑問詞引導'],
        sections: ['that 引導的名詞子句','whether / if 引導','疑問詞引導名詞子句','名詞子句當主詞','名詞子句當受詞','名詞子句當補語'],
        desc: '名詞子句扮演名詞的角色，可當主詞、受詞或補語。that / whether / 疑問詞各有適用情境。',
        meta: '6 個學習節',
        estimatedTime: '45 分鐘',
        highlights: [
          '💡 that 引導的名詞子句當受詞時，that 常省略：I think (that) he is right.',
          '🎯 whether 和 if 都可引導名詞子句，但 whether 更正式，且可接 or not',
          '⚠️ 疑問詞引導名詞子句，內部語序用直述句語序（非問句語序）'
        ],
        related: [8, 9],
      },
      {
        id: 8, num: 'CH.08', title: '形容詞子句',
        diff: 'hot', diffLabel: '學測高頻', stars: 5,
        accent: '#1a5fb4', glow: 'rgba(26,95,180,0.12)',
        tags: ['關係代名詞','who/which/that','限定/非限定'],
        sections: ['關係代名詞 who / whom','關係代名詞 which','關係代名詞 that','關係代名詞所有格 whose','限定用法 vs 非限定用法','關係子句的省略'],
        desc: '形容詞子句修飾名詞，由關係代名詞（who/which/that）引導。學測閱讀與作文都是核心。',
        meta: '6 個學習節 · 學測必考',
        estimatedTime: '55 分鐘',
        highlights: [
          '💡 限定用法不加逗號，非限定用法加逗號（此時不能用 that）',
          '🎯 介系詞 + 關係代名詞：the city in which I was born = the city where I was born',
          '⚠️ 關係子句主詞 + be 動詞可省略：the man (who is) standing there'
        ],
        related: [7, 9],
      },
      {
        id: 9, num: 'CH.09', title: '副詞子句',
        diff: 'mid', diffLabel: '中等難度', stars: 3,
        accent: '#1a5fb4', glow: 'rgba(26,95,180,0.12)',
        tags: ['when/because/if','時間/原因/條件','讓步子句'],
        sections: ['時間副詞子句','原因副詞子句','條件副詞子句','讓步副詞子句','結果副詞子句','目的副詞子句'],
        desc: '副詞子句補充說明動詞的時間、原因、條件等，讓句子情境更豐富完整。',
        meta: '6 個學習節',
        estimatedTime: '40 分鐘',
        highlights: [
          '💡 時間副詞子句中，用現在式代替未來式：When he arrives（不用 will arrive）',
          '🎯 although/though/even though 表讓步，不能和 but 同時使用',
          '⚠️ so + adj./adv. + that... 和 such + N + that... 都表「如此...以至於」'
        ],
        related: [7, 8],
      },
    ],
  },
  {
    key: 'tier4', label: '第四層 · 準動詞', shortLabel: 'T4',
    color: '#6b2fa0', bg: 'rgba(107,47,160,0.08)', bd: 'rgba(107,47,160,0.38)',
    chapters: [
      {
        id: 10, num: 'CH.10', title: '不定詞',
        diff: 'hot', diffLabel: '學測高頻', stars: 4,
        accent: '#6b2fa0', glow: 'rgba(107,47,160,0.12)',
        tags: ['to V','名詞/形容詞/副詞用法','不定詞片語'],
        sections: ['不定詞當名詞','不定詞當形容詞','不定詞當副詞','使役動詞 + 不定詞','感官動詞 + 不定詞','獨立不定詞慣用語','不定詞的否定形式'],
        desc: '不定詞（to V）可扮演名詞、形容詞、副詞三種角色，是英文最靈活的準動詞形式。',
        meta: '7 個學習節',
        estimatedTime: '55 分鐘',
        highlights: [
          '💡 使役動詞 make/let/have + 受詞 + V（原形），感官動詞 see/hear + 受詞 + V 或 V-ing',
          '🎯 不定詞當副詞可表目的（to V = in order to V）、結果、原因',
          '⚠️ to 不定詞的否定：not to V（not 放在 to 前面）'
        ],
        related: [11, 12],
      },
      {
        id: 11, num: 'CH.11', title: '動名詞',
        diff: 'mid', diffLabel: '中等難度', stars: 4,
        accent: '#6b2fa0', glow: 'rgba(107,47,160,0.12)',
        tags: ['V-ing','只接動名詞的動詞','介系詞 + V-ing'],
        sections: ['動名詞當主詞','動名詞當受詞','只接動名詞的動詞','動名詞 vs 不定詞','介系詞後接動名詞','動名詞的否定與完成式'],
        desc: '動名詞（V-ing）是動詞的名詞化形式。某些動詞只能接動名詞，是考試重要陷阱！',
        meta: '6 個學習節',
        estimatedTime: '45 分鐘',
        highlights: [
          '💡 enjoy/mind/avoid/finish/consider/practice 等動詞後只能接動名詞',
          '🎯 介系詞後面一律接動名詞：be used to doing（習慣做）≠ used to V（過去常做）',
          '⚠️ stop to V（停下來去做）vs stop V-ing（停止做），意思完全不同！'
        ],
        related: [10, 12],
      },
      {
        id: 12, num: 'CH.12', title: '分詞',
        diff: 'hot', diffLabel: '學測高頻', stars: 5,
        accent: '#6b2fa0', glow: 'rgba(107,47,160,0.12)',
        tags: ['現在分詞','過去分詞','分詞構句'],
        sections: ['現在分詞 V-ing 的用法','過去分詞 p.p. 的用法','分詞修飾名詞','分詞構句的形成','分詞構句的否定','獨立分詞構句','懸垂分詞（錯誤用法）'],
        desc: '分詞兼具動詞與形容詞特性，分詞構句可簡化副詞子句，是高分作文的利器。',
        meta: '7 個學習節 · 學測必考',
        estimatedTime: '60 分鐘',
        highlights: [
          '💡 現在分詞（V-ing）修飾「主動/進行」，過去分詞（p.p.）修飾「被動/完成」',
          '🎯 分詞構句：子句主詞與主句主詞相同時，可簡化為分詞構句',
          '⚠️ 懸垂分詞：分詞的邏輯主詞必須與主句主詞一致，否則是語法錯誤'
        ],
        related: [10, 11],
      },
    ],
  },
  {
    key: 'tier5', label: '第五層 · 修辭精修', shortLabel: 'T5',
    color: '#b52634', bg: 'rgba(181,38,52,0.08)', bd: 'rgba(181,38,52,0.38)',
    chapters: [
      {
        id: 13, num: 'CH.13', title: '形容詞與副詞（含比較級）',
        diff: 'mid', diffLabel: '中等難度', stars: 4,
        accent: '#b52634', glow: 'rgba(181,38,52,0.12)',
        tags: ['比較級','最高級','as...as','修飾語位置'],
        sections: ['形容詞的位置與用法','副詞的位置與用法','比較級句型','最高級句型','as...as 原級比較','倍數比較句型','特殊比較句型'],
        desc: '形容詞與副詞的位置學問大，比較級句型更是學測閱讀與作文高頻考點。',
        meta: '7 個學習節',
        estimatedTime: '50 分鐘',
        highlights: [
          '💡 比較級 + and + 比較級 表漸進：more and more important（越來越重要）',
          '🎯 the + 比較級, the + 比較級：The more you read, the more you know.',
          '⚠️ 倍數比較：A is twice as + adj. + as B（A 是 B 的兩倍）'
        ],
        related: [14, 16],
      },
      {
        id: 14, num: 'CH.14', title: '代名詞',
        diff: 'base', diffLabel: '基礎入門', stars: 3,
        accent: '#b52634', glow: 'rgba(181,38,52,0.12)',
        tags: ['it 的用法','反身代名詞','不定代名詞'],
        sections: ['人稱代名詞','it 的多種用法','反身代名詞','指示代名詞','不定代名詞','相互代名詞'],
        desc: 'it 的用法是重點！虛主詞、代替子句、強調句、天氣時間——一次全部搞懂。',
        meta: '6 個學習節',
        estimatedTime: '40 分鐘',
        highlights: [
          '💡 虛主詞 it：It is important to study grammar.（真正主詞是 to study grammar）',
          '🎯 強調句型：It is/was + 強調部分 + that/who...（去掉 It is...that 句子仍成立）',
          '⚠️ one 指不特定單數可數名詞，it 指前面提過的特定事物'
        ],
        related: [13, 15],
      },
      {
        id: 15, num: 'CH.15', title: '介係詞用法',
        diff: 'mid', diffLabel: '中等難度', stars: 3,
        accent: '#b52634', glow: 'rgba(181,38,52,0.12)',
        tags: ['at/in/on','易混淆介係詞','介係詞片語'],
        sections: ['at（時間/地點/狀態）','by（方式/期限）','for（目的/期間）','in（範圍/時間）','on（接觸/時間）','to（方向/結果）','with（伴隨/工具）','其他常用介係詞','易混淆介係詞辨析'],
        desc: '介係詞是英文最難記憶的部分。at/in/on 的時間與地點用法是學測閱讀的關鍵細節。',
        meta: '9 個學習節',
        estimatedTime: '55 分鐘',
        highlights: [
          '💡 時間：at 時間點、in 較長時間（月/年/季節）、on 特定日期/星期',
          '🎯 地點：at 特定地點、in 封閉空間/城市/國家、on 表面/路線/樓層',
          '⚠️ by + 時間 = 截止期限（by Friday = 在週五之前）'
        ],
        related: [13, 14],
      },
      {
        id: 16, num: 'CH.16', title: '否定句與倒裝句',
        diff: 'mid', diffLabel: '中等難度', stars: 4,
        accent: '#b52634', glow: 'rgba(181,38,52,0.12)',
        tags: ['否定倒裝','never/seldom','強調句型'],
        sections: ['否定句的形成','部分否定 vs 全部否定','否定副詞置首倒裝','not until 倒裝','so/neither 倒裝','完全倒裝句','強調句型 It is...that'],
        desc: '否定句與倒裝句是英文表達的強調利器，讓句子更有力道、更具文學感。',
        meta: '7 個學習節',
        estimatedTime: '50 分鐘',
        highlights: [
          '💡 否定副詞（never/seldom/hardly/not only）置首，主句須倒裝',
          '🎯 Not until... 句型：Not until he left did I realize how much I missed him.',
          '⚠️ not all / not every 是部分否定（不是全部），none / no one 才是全部否定'
        ],
        related: [13, 15],
      },
    ],
  },
]

export const REVIEWS = [
  { id: 'r1', num: 'REVIEW 1', title: 'CH1–CH3 綜合複習', diff: 'review', diffLabel: '複習關卡', stars: 3, accent: '#1265a8', glow: 'rgba(18,101,168,0.12)', tags: ['句型','時態','被動語態'], sections: ['動詞形式綜合填空','主動被動轉換','時態判斷練習','句型分析題'], desc: '整合第一層三章重點，透過填空與選擇題鞏固句型、時態、被動語態的掌握。', meta: '4 組題型 · 解鎖第二層', estimatedTime: '30 分鐘', highlights: ['🔁 綜合練習句型、時態、被動語態三大核心','📝 填空 + 選擇題雙軌練習','✅ 完成後解鎖第二層章節'], related: [], isReview: true },
  { id: 'r2', num: 'REVIEW 2', title: 'CH4–CH6 綜合複習', diff: 'review', diffLabel: '複習關卡', stars: 4, accent: '#1265a8', glow: 'rgba(18,101,168,0.12)', tags: ['助動詞','S-V一致','假設語氣'], sections: ['助動詞語氣判斷','主詞動詞一致練習','假設語氣填空','綜合改錯題'], desc: '第二層動詞延伸綜合測驗，特別強化假設語氣的時態運用與一致性規則。', meta: '4 組題型 · 解鎖第三層', estimatedTime: '35 分鐘', highlights: ['🔁 假設語氣是重點，需特別加強','📝 改錯題訓練語感','✅ 完成後解鎖第三層章節'], related: [], isReview: true },
  { id: 'r3', num: 'REVIEW 3', title: 'CH7–CH9 綜合複習', diff: 'review', diffLabel: '複習關卡', stars: 4, accent: '#1265a8', glow: 'rgba(18,101,168,0.12)', tags: ['名詞子句','形容詞子句','副詞子句'], sections: ['三種子句辨別','關係代名詞填空','連接詞選用','子句簡化練習'], desc: '子句系統綜合測驗，訓練快速辨別名詞/形容詞/副詞子句。', meta: '4 組題型 · 解鎖第四層', estimatedTime: '35 分鐘', highlights: ['🔁 三種子句快速辨別訓練','📝 關係代名詞填空高頻考點','✅ 完成後解鎖第四層章節'], related: [], isReview: true },
  { id: 'r4', num: 'REVIEW 4', title: 'CH10–CH12 綜合複習', diff: 'review', diffLabel: '複習關卡', stars: 5, accent: '#1265a8', glow: 'rgba(18,101,168,0.12)', tags: ['不定詞','動名詞','分詞構句'], sections: ['準動詞辨別與選用','動名詞 vs 不定詞','分詞構句轉換','綜合寫作應用'], desc: '準動詞三章的整合測驗，尤其著重動名詞與不定詞的選用。', meta: '4 組題型 · 解鎖第五層', estimatedTime: '40 分鐘', highlights: ['🔁 動名詞 vs 不定詞是最高頻陷阱','📝 分詞構句轉換訓練','✅ 完成後解鎖第五層章節'], related: [], isReview: true },
  { id: 'r5', num: 'REVIEW 5', title: 'CH13–CH16 綜合複習', diff: 'review', diffLabel: '複習關卡', stars: 5, accent: '#1265a8', glow: 'rgba(18,101,168,0.12)', tags: ['比較級','介係詞','代名詞','倒裝句'], sections: ['比較句型綜合練習','介係詞填空','代名詞指代辨析','否定與倒裝句改寫','全課程綜合測驗'], desc: '第五層修辭精修的最終關卡，整合比較級、介係詞、代名詞、否定倒裝。', meta: '5 組題型 · 全課程完成', estimatedTime: '45 分鐘', highlights: ['🔁 全課程整合大考驗','📝 五大題型全面測試','🏆 完成後取得全課程完成認證'], related: [], isReview: true },
]
