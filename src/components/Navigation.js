import React, { useState } from 'react'
import { Navbar, Dropdown, Nav, Container } from 'react-bootstrap'
import Metamask from '../Metamask.svg'
import { FiSettings } from 'react-icons/fi'
import { BsFillMoonStarsFill, BsToggleOn, BsToggleOff, BsPower } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { IoLanguageSharp } from 'react-icons/io5'

const Navigation = ({ user, login, logOut, truncate, balance }) => {
  const [show, setShow] = useState(false)
  // console.log(isNaN(balance))

  return (
    <Navbar expand='lg'>
      <Container>
        <Navbar.Brand href='#home' className='text-white'>
          MyDeX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <div className='connectedWalletInfo'>
              <div className='d-flex'>
                <div className='connectedWallet'>
                  <div className='walletImage'>
                    <img src={Metamask} />
                  </div>
                  <span className='ms-2 me-1'>{user ? balance : 0} </span> <span>ETH</span>
                </div>
              </div>
              {!user && (
                <div className='walletAddress' id='walletBtn' onClick={login}>
                  Connect Wallet
                </div>
              )}
              {user && (
                <div className='walletAddress'>
                  {truncate(user.attributes.accounts[0], 5, 4, 12)}
                </div>
              )}
            </div>
            <Dropdown id='webSettingsDropdwon' drop='down'>
              <Dropdown.Toggle id='dropdown-basic' className='nav-link'>
                <FiSettings></FiSettings>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className='container'>
                  <h5>Global Settings</h5>
                  <div className='row'>
                    <div className='col-md-6 pe-lg-1 mt-2'>
                      <div className='webSettingsContainer'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <BsFillMoonStarsFill />
                          <BsToggleOn className='wbsToggleIcon' />
                        </div>

                        <h5 className='mt-3'>Dark mode</h5>
                        <p className='mb-0'>Theme for the web</p>
                      </div>
                    </div>
                    <div className='col-md-6 ps-lg-1 mt-2'>
                      <div className='webSettingsContainer'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <IoLanguageSharp />
                          <MdKeyboardArrowRight className='wbsSelectLanguage' />
                        </div>

                        <h5 className='mt-3'>English</h5>
                        <p className='mb-0'>Select language</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <BsPower onClick={logOut} id='walletBtn'></BsPower>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
