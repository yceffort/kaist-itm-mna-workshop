import React, { useState } from "react";
import { Col, Row, InputGroup, FormControl, Button } from "react-bootstrap";
import { compareString } from "../../utils/util";
import Answer from "./answer";

export default function Essay({
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
  const [studentAnswer, setStudentAnswer] = useState("");
  const [result, setResult] = useState(false);
  const [submit, setSubmit] = useState(false);

  const submitAnswer = () => {
    if (!submit) {
      setResult(compareString(answer, studentAnswer));
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
        <Col xs={9}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Answer</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onKeyDown={(e: any) => e.keyCode === 13 && submitAnswer()}
              onChange={(e: any) => setStudentAnswer(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={3}>
          <Button disabled={submit} onClick={submitAnswer}>
            제출
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
