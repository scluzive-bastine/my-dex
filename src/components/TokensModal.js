import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Eth from '../Eth.svg'

const TokensModal = ({ show, handleClose, tokens }) => {
  const newTokens = Object.entries(tokens)
  const tk = newTokens[0][1]
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = Object.entries(tk).filter((token) =>
    token[1].name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <Modal show={show} onHide={handleClose} className='tokenModal'>
      <Modal.Header closeButton>
        <Modal.Title>Select Token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='searchToken'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            onChange={handleSearch}
          />
        </div>
        <hr />
        <div className='tokenContainer'>
          {filteredCoins.map((token) => {
            return (
              <div className='tokens' key={token[1].address}>
                <div className='tokenImage'>
                  <img src={token[1].logoURI} srcSet={token[1].logoURI} alt={token[1].name} />
                </div>
                <div className='tokenName'>
                  <h6 className='mb-0'>{token[1].name}</h6>
                  <small>{token[1].symbol}</small>
                </div>
              </div>
            )
          })}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default TokensModal
