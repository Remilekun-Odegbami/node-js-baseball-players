const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/baseball/hitsSingleSeason')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All Players
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/baseball/hitsSingleSeason'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/players', {
                title: 'All Baseball Players',
                name: 'Baseball Player List',
                data
            })
        })
})

// single-player 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/baseball/hitsSingleSeason/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-player', {
                    title: `${data.Player}`,
                    name: `${data.Player}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})


module.exports = router