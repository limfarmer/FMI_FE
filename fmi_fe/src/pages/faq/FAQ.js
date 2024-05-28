import React, { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";

import "../style/FaqStyle.css";

const categories = [
  {
    name: "자주 묻는 질문",
    value: "all",
  },
  {
    name: "사이트",
    value: "category1",
  },
  {
    name: "개인 정보",
    value: "category2",
  },
  {
    name: "팔로우",
    value: "category3",
  },
];

const qnaList = [
  {
    category: "category1",
    question: "Q&A 처리 결과는 어떻게 받을 수 있나요?",
    answer: "안내 메일은 가입 시 직접 기재하신 연락처로 발송됩니다.",
  },
  {
    category: "category2",
    question: "가입은 어떻게 하나요?",
    answer:
      "첫 페이지에서 회원가입을 누르시고 아이디, 비밀번호, 이름, 이메일, 닉네임을 입력해 주세요.",
  },
  {
    category: "category3",
    question: "API 소개",
    answer: "로그인을 해서 오픈 API로 제공되는 정보를 볼 수 있습니다.",
  },
  {
    category: "category1",
    question: "한국 축구팀은 없나요?",
    answer: "죄송합니다. 아직 해외 축구팀 정보만 제공하고 있습니다.",
  },
  {
    category: "category2",
    question: "아이디 찾는 방법",
    answer:
      "로그인 페이지에서 아이디 찾기를 클릭하시고 이메일과 이름을 입력해 주세요.",
  },
  {
    category: "category3",
    question: "팔로우를 취소하면 어떻게 되나요?",
    answer: "해당 팀이 빠지고 팔로우 팀 목록이 업데이트 됩니다.",
  },
];

const FAQ = () => {
  const [category, setCatecory] = useState("all");
  const [cardOnOff, setCardOnOff] = useState(qnaList);
  const [showList, setShowList] = useState(qnaList);

  const getQnACard = (item, index) => {
    return (
      <div className="faq-card" key={index}>
        <div
          className="faq-card-title"
          onClick={() => {
            let tempCard = cardOnOff;
            tempCard[index].show = !tempCard[index].show;
            setCardOnOff([...tempCard]);
          }}
        >
          <span className="question-mark">Q. </span>
          <span>{item.question}</span>
        </div>
        <div
          className={
            qnaList[index].show
              ? "faq-card-answer"
              : "faq-card-answer faq-card-none"
          }
        >
          <span className="answer-mark">A. </span>
          <span className="FAQ-card-answer">{item.answer}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setShowList(
      qnaList.filter((item) => {
        if (category === "all") return true;
        if (category === item.category) return true;
        return false;
      })
    );
  }, [category]);

  return (
    <div>
      <div></div>
      <CategoryFilter
        categories={categories}
        category={category}
        setCatecory={setCatecory}
      />
      <div className="fqa-parent">
        <div className="faq-list">
          {showList.map((item, index) => getQnACard(item, index))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
