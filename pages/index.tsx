import React from 'react'
import fetch from 'isomorphic-fetch'
import Chapters from '../component/chapters'
import { NextPageContext } from 'next'

const dev = process.env.NODE_ENV !== 'production'
const host = dev
  ? 'http://localhost:8080'
  : 'https://itm-mna-yceffort.herokuapp.com'

export default function Index({ chapters }: { chapters: any[] }) {
  return chapters && <Chapters chapters={chapters} />
}

Index.getInitialProps = async function({ query, req }: NextPageContext) {
  const response = await fetch(`${host}/api/chapters`)
  const result = await response.json()
  return { chapters: result }
}
