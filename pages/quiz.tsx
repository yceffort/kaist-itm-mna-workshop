import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Essay from "../component/quiz/essay";
import OX from "../component/quiz/ox";
import MultipleEssay from "../component/quiz/multiple-essay";
import { NextPageContext } from "next";
import styled from "styled-components";
import fetch from "isomorphic-fetch";

const dev = process.env.NODE_ENV !== "production";
const host = dev ? "http://localhost:8080" : "production";

const HomeButtonContainer = styled(Row)`
  margin-top: 5px;
`;

function Quiz({
  chapter,
  quiz,
  no
}: {
  chapter: number;
  quiz: any;
  no: number;
}) {
  return (
    <Container>
      <Row>
        <h2>chapter{chapter}</h2>
      </Row>
      {quiz.answer_type === "essay" && (
        <Essay
          question={quiz.question}
          chapter={chapter}
          answer={quiz.answer}
          no={no}
        />
      )}

      {quiz.answer_type === "OX" && (
        <OX
          question={quiz.question}
          chapter={chapter}
          answer={quiz.answer}
          no={no}
        />
      )}

      {quiz.answer_type === "multiple_essay" && (
        <MultipleEssay
          question={quiz.question}
          chapter={chapter}
          answer={quiz.answer}
          hasAnswerOrder={quiz.has_answer_order}
          no={no}
        />
      )}
      <HomeButtonContainer>
        <Col xs={12}>
          <Button
            block
            variant="outline-danger"
            onClick={() => (window.location.href = "/")}
          >
            홈으로
          </Button>
        </Col>
      </HomeButtonContainer>
    </Container>
  );
}

Quiz.getInitialProps = async function({
  query: { chapter, no }
}: NextPageContext) {
  const response = await fetch(
    `${host}/api/chapter${chapter}?limit=100&q=no:=${no}`
  );
  const quiz = await response.json();
  return { chapter, no, quiz: quiz[0] };
};

export default Quiz;
