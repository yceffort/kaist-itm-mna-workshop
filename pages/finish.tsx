import { useEffect, useState, Fragment } from 'react'
import { ListGroup, ButtonToolbar, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { NextPageContext } from 'next'

const dev = process.env.NODE_ENV !== 'production'
const host = dev
  ? 'http://localhost:8080'
  : 'https://itm-mna-yceffort.herokuapp.com'

const BodyContainer = styled.div`
  margin: 10px 10px 10px 10px;
`

function shuffle(array: Array<any>) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export default function Finish() {
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [wrongProblem, setWrongProblem] = useState([] as any[])

  useEffect(() => {
    const getResult = async () => {
      let right = JSON.parse(window.sessionStorage.getItem('right') || '[]')
      let wrong = JSON.parse(window.sessionStorage.getItem('wrong') || '[]')

      setRight(right.length)
      setWrong(wrong.length)

      let wrongProblems = []

      for (let i of wrong) {
        let chapter = i.split('-')[0]
        let no = i.split('-')[1]

        const response = await fetch(
          `${host}/api/chapter${chapter}?limit=100&q=no:=${no}`,
        )
        const result = await response.json()
        let q = result[0]
        q.chapter = chapter
        wrongProblems.push(q)
      }

      setWrongProblem(wrongProblems)
    }

    getResult()
  }, [])

  const goReTest = () => {
    let wrong = JSON.parse(window.sessionStorage.getItem('wrong') || '[]')

    if (window.sessionStorage.getItem('random')) {
      wrong = shuffle(wrong)
    }

    window.sessionStorage.clear()
    window.sessionStorage.setItem('quiz', JSON.stringify(wrong))
    window.location.href = `/quiz/${wrong[0].split('-')[0]}/${
      wrong[0].split('-')[1]
    }`
  }

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <BodyContainer>
      <ListGroup>
        <ListGroup.Item>결과</ListGroup.Item>
        <ListGroup.Item variant="primary">{right}개 맞았습니다.</ListGroup.Item>
        <ListGroup.Item variant="danger">{wrong}개 틀렸습니다.</ListGroup.Item>
      </ListGroup>
      <ButtonToolbar>
        <Button
          variant="primary"
          size="lg"
          active
          onClick={goReTest}
          disabled={wrong === 0}
        >
          틀린문제만 다시풀기
        </Button>
        <Button variant="secondary" size="lg" active onClick={goHome}>
          처음으로
        </Button>
      </ButtonToolbar>

      {wrongProblem.map(
        ({ chapter, no, question, answer, answer_type }, index) => {
          return (
            <Fragment key={index}>
              <h5>
                {chapter}-{no}.{question}
              </h5>
              {answer_type === 'multiple_essay' ? (
                <pre>{answer.toString()}</pre>
              ) : (
                <pre>{answer}</pre>
              )}
            </Fragment>
          )
        },
      )}
    </BodyContainer>
  )
}
