

const readline = require('readline')
const { CREATE, DEPOSIT, WITHDRAW, BALANCE} = require('./db')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(' Welcome To Banking App ')
console.log('\n 1. Create new account')
console.log('\n 2. Deposit Money')
console.log('\n 3. Withdraw Money')
console.log('\n 4. Check Balance')
console.log('\n 6. Exit')

const ip = (msg) => new Promise((resolve, reject) => {
    rl.question(`\n 👉 ${msg} : `, (ch) => {
        resolve(ch)
    })
})

const start = async () => {
    while (true) {
        const choice = await ip('Enter Your Choice')

        if (choice == 1) {
            console.log(`\n  Create Account`)
            const acId = parseInt(await ip('Enter Account Id'))
            const acNm = await ip('Enter Account Name')
            const balance = 0
            CREATE({ acId, acNm, balance })
        }
        else if (choice == 2) {
            console.log(`\n  Deposit Money`)

            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))

            DEPOSIT({ acId, amount })
        }
        else if (choice == 3) {
            console.log(`\n  Withdraw Money`)

            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))

            WITHDRAW({ acId, amount })
        }
        else if (choice == 4) {
            console.log(`\n  Check Balance`)
            const acId = parseInt(await ip('Enter Account Id'))
            BALANCE(acId)
        }
        
        else {
            console.log(`Bye Bye`)
            process.exit()
        }
    }
}

start()



