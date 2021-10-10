import React, { useEffect, useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'
import Navigation from './components/Navigation'
import { MdKeyboardArrowDown, MdArrowDownward } from 'react-icons/md'
import Eth from './Eth.svg'
import Dai from './Dai.svg'
import Moralis from 'moralis'
import { ethers } from 'ethers'
import TokensModal from './components/TokensModal'

Moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID)
Moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL
const initialUser = Moralis.User.current()

function App() {
  const [balance, setBalance] = useState(0)
  const [balanceInWei, setBalanceInWei] = useState(0)
  const [show, setShow] = useState(false)
  const [tokens, setTokens] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [user, setUser] = useState(initialUser)
  const [currentSide, setCurrentSide] = useState('')
  // const [currentTrade, setCurrentTrade] = useState({})
  const [trade, setTrade] = useState({})
  const [tokenSelected, setTokenSelected] = useState([])
  const [address, setAddress] = useState()
  console.log(trade.from)
  // console.log(currentSide)
  // console.log(currentTrade)

  const init = async () => {
    await Moralis.initPlugins()
    await Moralis.enable()
    const b = await Moralis.Web3API.account.getNativeBalance()
    setBalance(b.balance)
    const bWei = parseFloat((b.balance / 1000000000000000000).toFixed(4))
    setBalanceInWei(bWei)
    setisLoading(true)
    const result = await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: 'eth',
    })
    setTokens(result)
    setisLoading(false)
  }

  const handleClose = () => {
    setShow(false)
  }

  const showTrade = (trd) => {
    setTrade(trd)
  }

  const handleShow = (side) => {
    setShow(true)
    setCurrentSide(side)
  }

  const handleLogin = async () => {
    const loggedIn = await Moralis.authenticate()
    setUser(loggedIn)
  }

  const handleLogout = async () => {
    Moralis.User.logOut()
    setUser(null)
  }

  // To find a specific object in an array of objects
  // const selectToken = async (address) => {
  //   handleClose()
  //   const a = Object.values(tokens).find((obj) => {
  //     setTokenSelected(obj[address])
  //   })
  //   setCurrentTrade({ ...currentTrade, [currentSide]: tokenSelected })
  // }

  // const selectToken = async (address) => {
  //   handleClose()
  //   const a = Object.values(tokens).find((obj) => {
  //     setTokenSelected(obj[address])
  //   })
  //   setCurrentTrade({ ...currentTrade, [currentSide]: tokenSelected })
  // }

  const renderClickedToken = () => {}

  const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      let start = text.substring(0, startChars)
      let end = text.substring(text.length - endChars, text.length)
      return start + '...' + end
    }
    return text
  }
  useEffect(() => {
    init()
  }, [])
  if (isLoading) {
    return (
      <Container fluid>
        <Navigation
          user={user}
          login={handleLogin}
          logOut={handleLogout}
          truncate={truncate}
          balance={balanceInWei}
        ></Navigation>
        <Container className='mt-5'>
          <h6 className='text-center'>Loading...</h6>
        </Container>
      </Container>
    )
  }

  return (
    <Container fluid>
      <Navigation
        user={user}
        login={handleLogin}
        logOut={handleLogout}
        truncate={truncate}
        balance={balanceInWei}
      ></Navigation>
      <Container className='mt-5'>
        <div className='row justify-content-center'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'>
            <div className='swapContainer'>
              <div className='swapContainerHeader'>
                <h6>Swap</h6>
              </div>
              <div className='swapContainerBody'>
                <div className='swapFrom'>
                  <div className='spwfHeader d-flex justify-content-between'>
                    <h6>From</h6>
                    <h6>Balance: 0.0039</h6>
                  </div>
                  <div className='swpBox'>
                    <div className=''>
                      <div className='row'>
                        <div className='col-12 col-sm-12 col-md-3'>
                          <div
                            className='swpSelectBox'
                            id='from_token_select'
                            onClick={() => handleShow('from')}
                          >
                            <div className='swpBoxImage'>
                              <img
                                src={trade.from ? trade.from.logoURI : Eth}
                                alt={trade.from ? trade.from.name : 'Ethereum'}
                                srcset={trade.from ? trade.from.logoURI : Eth}
                              />
                            </div>
                            <div className='d-flex align-items-center'>
                              <div className='swpBoxText'>
                                {trade.from ? trade.from.symbol : 'ETH'}
                              </div>
                              <MdKeyboardArrowDown />
                            </div>
                          </div>
                        </div>
                        <div className='col-12 col-sm-12 col-md-9'>
                          <input type='text' className='form-control swapInput' autoFocus />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='swpfFooter mt-2 d-flex justify-content-between'>
                    <h6>{trade.from ? trade.from.name : 'Ethereum'}</h6>
                    <h6>
                      ~ $<span>3,420</span>
                    </h6>
                  </div>
                </div>
                <div className='swpChangeIcon'>
                  <MdArrowDownward />
                </div>
                <div className='swapTo'>
                  <div className='spwfHeader d-flex justify-content-between'>
                    <h6>To Estimated</h6>
                    <h6>Balance: 0.00</h6>
                  </div>
                  <div className='swpBox'>
                    <div className=''>
                      <div className='row'>
                        <div className='col-12 col-sm-12 col-md-3'>
                          <div className='swpSelectBox' onClick={() => handleShow('to')}>
                            <div className='swpBoxImage'>
                              <img
                                src={trade.to ? trade.to.logoURI : Dai}
                                alt={trade.to ? trade.to.symbol : 'Dai'}
                                srcset={trade.to ? trade.to.logoURI : Dai}
                              />
                            </div>
                            <div className='d-flex align-items-center'>
                              <div className='swpBoxText'>{trade.to ? trade.to.symbol : 'Dai'}</div>
                              <MdKeyboardArrowDown />
                            </div>
                          </div>
                        </div>
                        <div className='col-12 col-sm-12 col-md-9'>
                          <input type='text' className='form-control swapInput' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='swapPriceContainer mt-4'>
                    <div className='gasFeeContainer'>
                      Gas Fee: $<span>50.21</span>
                    </div>
                    <div className='swapPrice'>
                      <div>
                        <h6>1inch</h6>
                      </div>
                      <div className=''>
                        <h6 className='mb-0'>3,591</h6>
                      </div>
                    </div>
                    <div className='swapTxCost d-flex justify-content-between'>
                      <div>Tx cost 0.0021</div>
                      <div>
                        ~$<span>3,591</span>
                      </div>
                    </div>
                  </div>
                  <div className='swapPriceContainer mt-2'>
                    <div className='swapPrice'>
                      <div>
                        <h6>SushiSwap</h6>
                      </div>
                      <div className=''>
                        <h6 className='mb-0'>3,591</h6>
                      </div>
                    </div>
                    <div className='swapTxCost d-flex justify-content-between'>
                      <div>Tx cost 0.0022</div>
                      <div>
                        ~$<span>3,591</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant='primary' className='swapButton' size='lg'>
                Swap token
              </Button>
            </div>
          </div>
        </div>
        <TokensModal
          show={show}
          handleClose={handleClose}
          tokens={tokens}
          currentSide={currentSide}
          showTrade={showTrade}
          // selectToken={selectToken}
        ></TokensModal>
      </Container>
    </Container>
  )
}

export default App
