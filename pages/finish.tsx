import { useEffect, useState } from "react";
import { ListGroup, ButtonToolbar, Button } from "react-bootstrap";

export default function Finish() {
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);

  useEffect(() => {
    let right = JSON.parse(window.sessionStorage.getItem("right") || "[]");
    let wrong = JSON.parse(window.sessionStorage.getItem("wrong") || "[]");

    setRight(right.length);
    setWrong(wrong.length);
  });

  const goReTest = () => {
    let wrong = JSON.parse(window.sessionStorage.getItem("wrong") || "[]");

    window.sessionStorage.setItem("quiz", JSON.stringify(wrong));
    window.location.href = `/quiz/${wrong[0].split("-")[0]}/${
      wrong[0].split("-")[1]
    }`;
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <ListGroup>
        <ListGroup.Item>결과</ListGroup.Item>
        <ListGroup.Item variant="primary">{right}개 맞았습니다.</ListGroup.Item>
        <ListGroup.Item variant="danger">{wrong}개 틀렸습니다.</ListGroup.Item>
      </ListGroup>
      <ButtonToolbar>
        <Button variant="primary" size="lg" active onClick={goReTest}>
          틀린문제만 다시풀기
        </Button>
        <Button variant="secondary" size="lg" active onClick={goHome}>
          처음으로
        </Button>
      </ButtonToolbar>
    </>
  );
}
