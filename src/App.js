import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import Navigation from './components/Navigation'
import { MdKeyboardArrowDown, MdArrowDownward } from 'react-icons/md'
import Eth from './Eth.svg'
import Dai from './Dai.svg'
import Moralis from 'moralis'
import { ethers } from 'ethers'

Moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID)
Moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL
const initialUser = Moralis.User.current()

function App() {
  const [balance, setBalance] = useState(0)
  const [balanceInWei, setBalanceInWei] = useState(0)
  const init = async () => {
    await Moralis.initPlugins()
    await Moralis.enable()
    setBalance(await Moralis.Web3API.account.getNativeBalance())
    // const transactions = await Moralis.Web3API.account.getTransactions()
    const bWei = parseFloat(ethers.utils.formatEther(balance.balance)).toPrecision(4)
    setBalanceInWei(bWei)
  }
  useEffect(() => {
    init()
  }, [])

  const [user, setUser] = useState(initialUser)

  const handleLogin = async () => {
    const loggedIn = await Moralis.authenticate()
    setUser(loggedIn)
  }
  const handleLogout = async () => {
    Moralis.User.logOut()
    setUser(null)
  }

  const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      let start = text.substring(0, startChars)
      let end = text.substring(text.length - endChars, text.length)
      return start + '...' + end
    }
    return text
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
                          <div className='swpSelectBox'>
                            <div className='swpBoxImage'>
                              <img src={Eth} alt='' srcset='' />
                            </div>
                            <div className='d-flex align-items-center'>
                              <div className='swpBoxText'>Eth</div>
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
                    <h6>Ethereum</h6>
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
                          <div className='swpSelectBox'>
                            <div className='swpBoxImage'>
                              <img src={Dai} alt='' srcset='' />
                            </div>
                            <div className='d-flex align-items-center'>
                              <div className='swpBoxText'>Eth</div>
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
      </Container>
    </Container>
  )
}

export default App
