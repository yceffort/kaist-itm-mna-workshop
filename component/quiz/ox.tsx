import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Answer from "./answer";
export default function OX({
  question,
  answer,
  no,
  chapter
}: {
  question: string;
  answer: any;
  no: number;
  chapter: number;
}) {
  const [result, setResult] = useState(false);
  const [submit, setSubmit] = useState(false);

  const submitAnswer = (studentAnswer: boolean) => {
    if (!submit) {
      setResult((answer === "O") === studentAnswer);

      setSubmit(true);
    }
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <h5 style={{ whiteSpace: "pre-wrap" }}>
            {no}. {question}
          </h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            size="lg"
            block
            disabled={submit}
            onClick={() => submitAnswer(true)}
          >
            O
          </Button>
          <Button
            variant="danger"
            size="lg"
            block
            disabled={submit}
            onClick={() => submitAnswer(false)}
          >
            X
          </Button>
        </Col>
      </Row>
      <Row>
        {submit && (
          <Answer chapter={chapter} no={no} result={result} answer={answer} />
        )}
      </Row>
    </>
  );
}
