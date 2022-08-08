import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import React, { useEffect, useState } from "react";
import ChartComponent from "../components/chart";

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!data) {
      fetch(`https://raw.githubusercontent.com/gabjauf/benchmarks/master/results/stats.json`).then(
        function (res) {
          return res.json()
        }).then(function (data) {
          // store Data in State Data Variable
          setData(data.hello_world)
        }).catch(
          function (err) {
            console.log(err, ' error')
          }
        )
    }
  });
  return (
    <>
      <Layout>
        <Head>
          <title>Benchmarks for different languages</title>
        </Head>
        <Container>
          <Intro />
          <ChartComponent data={data}></ChartComponent>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
