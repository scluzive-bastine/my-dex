import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Navigation from './components/Navigation'
import { MdKeyboardArrowDown, MdArrowDownward } from 'react-icons/md'
import Eth from './Eth.svg'
import Dai from './Dai.svg'

function App() {
  return (
    <Container fluid>
      <Navigation></Navigation>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  )
}

export default App
