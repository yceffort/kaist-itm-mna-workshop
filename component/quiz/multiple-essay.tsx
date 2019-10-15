import { Button, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { removeAllBlank } from "../../utils/util";
import Answer from "./answer";

export default function MultipleEssay({
  question,
  answer,
  no,
  chapter,
  hasAnswerOrder
}: {
  question: string;
  answer?: string[];
  no: number;
  chapter: number;
  hasAnswerOrder: boolean;
}) {
  const [studentAnswer, setStudentAnswer] = useState(new Array(answer!.length));
  const [result, setResult] = useState(false);
  const [submit, setSubmit] = useState(false);

  const setStudentAnswerByInput = (index: number, value: string) => {
    let currentAnswer = studentAnswer;
    currentAnswer[index] = value;
    return setStudentAnswer(currentAnswer);
  };

  const submitAnswer = () => {
    function arraysIdentical(a: any, b: any) {
      var i = a.length;
      if (i != b.length) return false;
      while (i--) {
        if ((a[i] || "").toLowerCase() !== (b[i] || "").toLowerCase())
          return false;
      }
      return true;
    }
    function s(x: any, y: any) {
      var pre = ["string", "number", "bool"];
      if (typeof x !== typeof y)
        return pre.indexOf(typeof y) - pre.indexOf(typeof x);

      if (x === y) return 0;
      else return x > y ? 1 : -1;
    }
    let result = false;

    if (!hasAnswerOrder) {
      const sortStudentAnswer = studentAnswer.sort(s);
      const sortAnswer = answer!.sort(s);

      result = arraysIdentical(
        sortStudentAnswer.map((s: string) => removeAllBlank(s)),
        sortAnswer
      );
    } else {
      result = arraysIdentical(
        studentAnswer.map((s: string) => removeAllBlank(s)),
        answer
      );
    }

    setSubmit(true);
    setResult(result);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <h5 style={{whiteSpace: "pre-wrap"}}>
            {no}. {question}
          </h5>
        </Col>
      </Row>

      {new Array(answer!.length).fill(0).map((value, index) => {
        return (
          <Row key={index}>
            <Col xs={12}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {index + 1}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  //   onKeyDown={(e: any) => e.keyCode === 13 && submitAnswer()}
                  onChange={(e: any) =>
                    setStudentAnswerByInput(index, e.target.value)
                  }
                  onKeyDown={(e: any) => e.keyCode === 13 && submitAnswer()}
                />
              </InputGroup>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col xs={12}>
          <Button disabled={submit} onClick={submitAnswer} block>
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
