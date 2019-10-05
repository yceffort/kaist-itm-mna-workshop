import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Answer from "./answer";
export default function OneTwo({
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
      setResult((answer === "1") === studentAnswer);
      setSubmit(true);
    }
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <h5>
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
            1
          </Button>
          <Button
            variant="danger"
            size="lg"
            block
            disabled={submit}
            onClick={() => submitAnswer(false)}
          >
            2
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
