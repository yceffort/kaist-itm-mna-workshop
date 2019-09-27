import React, { useEffect, useState, Fragment, useMemo } from "react";
import fetch from "isomorphic-fetch";
import { Form, Button, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { IChapter } from "../utils/interfaces";

const dev = process.env.NODE_ENV !== "production";
const host = dev
  ? "http://localhost:8080"
  : "https://itm-mna-yceffort.herokuapp.com";

const MainContainer = styled.div`
  width: 400px;
  height: 600px;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  padding: 5px;

  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  > button {
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

function shuffle(array: Array<any>) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function Chapters() {
  const emptyChapter: IChapter[] = [];
  const [chapters, setChapters] = useState(emptyChapter);
  const [chapter, setChapter] = useState(undefined);
  const [random, setRandom] = useState(true);

  const fetchChapters = useMemo(async () => {
    const response = await fetch(`${host}/api/chapters`);
    const result = await response.json();
    setChapters(result);
  }, []);
  let qs: string[] = [];

  const go = (c: number | undefined) => {
    if (chapter != -1) {
      const targetChapter = chapters.find(({ chapter }) => c == chapter);
      for (let i = 0; i < targetChapter!.questions; i++) {
        qs.push(`${chapter}-${i + 1}`);
      }
    } else if (chapter == -1) {
      chapters.forEach(chapter => {
        for (let i = 0; i < chapter.questions; i++) {
          qs.push(`${chapter.chapter}-${i + 1}`);
        }
      });
    }

    if (random) {
      qs = shuffle(qs);
    }
    window.sessionStorage.setItem("quiz", JSON.stringify(qs));
    window.location.href = `/quiz/${qs[0].split("-")[0]}/${
      qs[0].split("-")[1]
    }`;
  };

  useEffect(() => {
    fetchChapters;
    window.sessionStorage.clear();
  }, []);

  return (
    <MainContainer>
      <ListGroup>
        {chapters.map(({ chapter, name, questions }, idx) => {
          return (
            <ListGroup.Item variant="primary">
              <Form.Check
                key={chapter}
                type="radio"
                id="chapter"
                name="chapter"
                value={chapter}
                onChange={(e: any) => setChapter(e.target.value)}
                label={`Chapter ${chapter}. ${name}`}
              />
            </ListGroup.Item>
          );
        })}

        <ListGroup.Item variant="info">
          <Form.Check
            type="radio"
            id="chapter"
            name="chapter"
            value={-1}
            onChange={(e: any) => setChapter(e.target.value)}
            label="모두"
          />
        </ListGroup.Item>

        <ListGroup.Item variant="light">
          <Form.Check
            type="checkbox"
            label="Random"
            checked={random}
            onChange={(e: any) => setRandom(!!e.target.checked)}
          />
        </ListGroup.Item>
      </ListGroup>
      <ButtonContainer>
        <Button
          block
          disabled={!chapter}
          variant="outline-primary"
          onClick={() => go(chapter)}
        >
          Let's go
        </Button>
      </ButtonContainer>
    </MainContainer>
  );
}
