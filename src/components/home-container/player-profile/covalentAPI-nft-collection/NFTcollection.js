import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './NFTcollection.css'
import {
  Container,
  StylesProvider,
  Typography,
  Button,
  ImageListItem,
  Grid,
  Box,
  Card,
} from '@material-ui/core'
import CircularStatic from '../../../commons/CircularProgressWithLabel'
// import img1 from '../../../../../public/img/1.jpg'

function NFTCollection({ account }) {
  const imgs = ['./img/1.jpg', './img/2.png', './img/3.png']

  const { projectId } = useParams()
  const [project, setProject] = useState('')
  const [projectWallet, setProjectWallet] = useState('')

  const [loading, setLoading] = useState(false)
  const [userHistory, setUserHistory] = useState([])
  console.log('clean data covalentAPI', userHistory)
  const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'
  // const userWallet = '0x5Df598c222C4A7e8e4AB9f347dcBd924B6458382'

  const loadMyCollection = async () => {
    const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'
    try {
      const historyResult = await fetch(
        `https://api.covalenthq.com/v1/137/address/${userWallet}/balances_v2/?nft=true&key=${covalentAPI}`,
      )
      const { data } = await historyResult.json()
      console.log(' data covalentAPI', data)

      if (data) {
        setUserHistory(data.items[0].nft_data)
        setLoading(false)
      }
    } catch (error) {
      setLoading(true)
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('random', imgs[Math.floor(Math.random() * imgs.length)])
    setLoading(true)
    if (userWallet) loadMyCollection()

    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${projectId}/metadata.json`)
      data = await data.json()

      data.image = await getImage(data.image)
      const info = data.description.split(',')
      data.description = info[0]
      data.category = info[1]
      data.wallet = info[2]
      setProjectWallet(info[2])
      setProject(data)
    }

    if (projectId) {
      getMetadata()
      getImage()
    }
  }, [])

  return (
    <StylesProvider injectFirst>
      <Container
        className="page-community"
        style={{ minHeight: '70vh', paddingBottom: '1rem' }}
      >
        <h2>NFTs Donated to this player using Covalent API</h2>
        <p className="project-description">
          The Covalent Unified API can be used to pull balances, positions and
          historical granular transaction data from dozens of blockchain
          networks. This data enables hundreds of end-user use-cases like
          wallets, investor dashboards, taxation tools and as-of-yet unknown
          use-cases.
        </p>

        {loading ? (
          <CircularStatic />
        ) : (
          <div>
            {userHistory && userHistory.length ? (
              userHistory.map(
                (
                  project,
                  index,
                  t = imgs[Math.floor(Math.random() * imgs.length)],
                ) => (
                  <Card className="card-padding" key={index}>
                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <img
                          className="nft-img"
                          // src={imgs[Math.floor(Math.random() * imgs.length)]}
                          // src={require('./img/1.jpg')}
                          // src="'./img/1.jpg'"
                          src={`${process.env.PUBLIC_URL}/${
                            imgs[Math.floor(Math.random() * imgs.length)]
                          }`}
                          // src={`${process.env.PUBLIC_URL}/./img/1.jpg`}
                          // src={img3}
                          // src="./img/1.jpg"
                          alt=""
                        />
                      </Grid>

                      <Grid item xs={10}>
                        <div className="container-flex">
                          <h2 className="inner2">
                            {project.external_data.name}
                          </h2>
                        </div>

                        <p className="project-description">
                          {project.external_data.description}
                        </p>
                      </Grid>
                    </Grid>
                  </Card>
                ),
              )
            ) : (
              <h2>No NFTs Yet...</h2>
            )}
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default NFTCollection
