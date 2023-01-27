const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'furkan',
    password: 'furkan',
    database: 'bankdb',
    post: 5432
})

client.connect(err => {
    if (err) {
        console.log(` err Connected `)
        return
    }
    console.log(`\n  Connected `)
})

const CREATE = ({ acId, acNm, balance }, onCreate = undefined) => {
    client.query(`insert into account values ($1, $2, $3)`, [acId, acNm, balance], (err, res) => {
        if (err) console.log(`\n  Problem In Creating the Customer`)
        else {
            console.log(`\n  New Customer Created Successfully`)
            if(onCreate) onCreate(` New Customer Created Successfully`)
        }
    })
}

const WITHDRAW = ({ acId, amount }, onWithdraw = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n  Problem In Withdrawing`)
        } else {
            const balance = parseFloat(res.rows[0].balance)

            const newBalance = balance - parseFloat(amount)

            client.query(`update account set balance = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) console.log(`\n  Problem In Withdrawing`)
                else {
                    console.log(`\n  Amount ${amount} Withdrawal Successfully`)
                    if(onWithdraw) onWithdraw(` Amount ${amount} Withdraw Successfully`)
                }
            })
        }
    })
}

const DEPOSIT = ({ acId, amount }, onDeposit = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n  Problem In Deposit`)
        }
        else {
            const balance = parseFloat(res.rows[0].balance)
            const newBalance = balance + parseFloat(amount)

            client.query(`update account set balance = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) console.log(`\n  Problem In Depositing`)
                else  {
                    console.log(`\n  Amount ${amount} Deposited Successfully`)

                    if(onDeposit) onDeposit(` Amount ${amount} Deposited Successfully`)
                }
            })
        }
    })
}

const BALANCE  = (acId, onBalance = undefined) => {
    console.log(acId)
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n  Problem In Fetching the balance`)
            console.log(err)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n 💰 Your Account Balance Is : ${balance}`)
            if(onBalance) onBalance(balance)
        }
    })
}

module.exports = {
    CREATE, DEPOSIT, WITHDRAW, BALANCE
}





