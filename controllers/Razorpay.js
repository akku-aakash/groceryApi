const Razorpay = require('razorpay');
const shortid = require('shortid');

var razorpay = new Razorpay({
    key_id: 'rzp_test_uvifYhgFxSWOdD',
    key_secret: '2KKWoxZC9X53SPPNxj4KhL1z'
})

exports.generatePay = (req, res) => {
    const payyy = req.body.amount * 100
    const daata = {
        amount: payyy,  //amount == rs95
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture: 1
    }

    razorpay.orders.create(daata, async (err, ress) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        return res.json(ress);
    })

}

// exports.capturePay = (req, res) => {

//     const secret = '12345678'

//     console.log(req.body)

//     const crypto = require('crypto')

//     const shasum = crypto.createHmac('sha256', secret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest('hex')

//     console.log(digest, req.headers['x-razorpay-signature'])

//     if (digest === req.headers['x-razorpay-signature']) {
//         console.log('request is legit')
//         // process it
//         require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
//     } else {
//         // pass it
//     }
//     res.json({ status: 'ok' })
// }
