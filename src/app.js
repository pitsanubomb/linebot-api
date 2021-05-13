const axios = require(`axios`)
const express = require(`express`)
const bodyParser = require('body-parser')

const app = express()
const port = 9000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer xxxxx`
};

app.post('/',(req,res) => {
    getUserInformationChat(req.body)
    res.sendStatus(200)
})

const getUserInformationChat = async body => {
    console.log(JSON.stringify(body))
    const res = await axios({
        method: 'post',
        url: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        data: JSON.stringify({
            replyToken: body.events[0].replyToken,
            messages: [
                {
                    type: `text`,
                    text: body.events[0].message.text
                }
            ]
        })
    }); 
    return res.data;
}

app.listen(port,() => console.log(`now server is start at ${port}`))
