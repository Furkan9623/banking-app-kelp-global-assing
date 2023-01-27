const { response } = require('express')
const express = require('express')

const cors = require('cors')
const app = express()
app.use(cors())

const port = 3100

const {  CREATE, DEPOSIT, WITHDRAW, BALANCE } = require('./db')

app.post('/create', express.json(), (req, res) => {
    CREATE( req.body , (msg) => {
        res.json({ 'sts' : 'success', msg })
    })
})

app.put('/withdraw', express.json(), (req, res) => {
    WITHDRAW(req.body, msg => {
        res.json({ 'sts' : 'success', msg })
    })
})

app.put( '/deposit', express.json() ,(req, res) => {
    DEPOSIT(req.body, msg => {
        res.json({ 'sts' : 'success', msg })
    })
} )

app.get('/balance/:acId', ( req, res ) => {
    console.log(req.params)
    const acId = req.params.acId
    BALANCE(acId, bal => {
        res.json({ bal })
    })
})

app.listen(port, () => {
    console.log(`Banking App app listening on port ${port}`)
})