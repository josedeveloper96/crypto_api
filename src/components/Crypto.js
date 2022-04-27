/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Crypto = () => {
    const [search, setSearch] = useState("")
    const [cryptos, setCryptos] = useState([])

    const endpoint = 'https://api.coingecko.com/api/v3/coins'

    const showData = () => {
        axios.get(endpoint).then((res) => {
            //console.log(res.data)
            setCryptos(res.data)
        })
    }

    useEffect(() => {
        showData()
    }, [])

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = !search ? cryptos : cryptos.filter((val) => val.name.toLowerCase().includes(search.toLocaleLowerCase()))

    return (
        <>
            <input value={search} onChange={searcher} type='text' placeholder='search...' className='form-control' />

            <table className='table table-dark table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Price 24h</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((results) => (
                        <tr key={results.id}>
                            <td>{results.market_data.market_cap_rank}</td>
                            <td><small><img src={results.image.small} />{results.name}</small></td>
                            <td>{results.symbol.toUpperCase()}</td>
                            <td>{results.market_data.current_price.bmd.toFixed(2)}</td>
                            <td>
                                {results.market_data.price_change_percentage_24h < 0 ? (
                                    <span className='badge bg-danger'>{results.market_data.price_change_percentage_24h}</span>
                                ) : (
                                    <span className='badge bg-success'>{results.market_data.price_change_percentage_24h}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Crypto