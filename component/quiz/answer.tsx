import { Card, Col } from "react-bootstrap";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const CustomCard = styled(Card)`
  margin: 15px auto;
`;

export default function Answer({
  chapter,
  no,
  result,
  answer
}: {
  chapter: number;
  no: number;
  result: boolean;
  answer: any;
}) {
  const [disableButton, setDisableButton] = useState(false);
  const goNext = () => {
    setDisableButton(true);
    let item = `${chapter}-${no}`;
    let quiz = JSON.parse(window.sessionStorage.getItem("quiz") || "[]");
    let right = JSON.parse(window.sessionStorage.getItem("right") || "[]");
    let wrong = JSON.parse(window.sessionStorage.getItem("wrong") || "[]");

    if (result) {
      right.push(item);
      right = [...new Set(right)];
      window.sessionStorage.setItem("right", JSON.stringify(right));
    } else {
      wrong.push(item);
      wrong = [...new Set(wrong)];
      window.sessionStorage.setItem("wrong", JSON.stringify(wrong));
    }

    quiz = quiz.filter((i: string) => i !== item);

    window.sessionStorage.setItem("quiz", JSON.stringify(quiz));
    if (quiz.length > 0) {
      window.location.href = `/quiz/${quiz[0].split("-")[0]}/${
        quiz[0].split("-")[1]
      }`;
    } else {
      window.location.href = `/finish`;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      goNext();
    }, 1000 * 2);
  });

  return (
    <>
      <Col xs={12}>
        <CustomCard
          bg={result ? "primary" : "danger"}
          text="white"
          style={{ width: "18rem" }}
        >
          <Card.Header>{result ? "정답" : "오답"}</Card.Header>
          {answer && (
            <Card.Body>
              {typeof answer === "string" && <Card.Text>{answer}</Card.Text>}
              {typeof answer === "object" &&
                Array.isArray(answer) &&
                answer.map((a: string, index: number) => {
                  return <Card.Text key={index}>{a}</Card.Text>;
                })}
            </Card.Body>
          )}
        </CustomCard>
        <Button
          block
          disabled={disableButton}
          variant="outline-info"
          onClick={goNext}
        >
          다음으로
        </Button>
      </Col>
    </>
  );
}
