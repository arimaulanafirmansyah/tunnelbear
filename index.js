// Copyright Jangan Di Ganti KONTOL
// TUNNELBEAR ACCOUNT CREATOR V1 ( 03-04-2025 )
// AMFCODE
// KETAUAN GANTI COPYRIGHT & RECODE POST DI TEMPAT!

const readlinesync = require('readline-sync');
const axios = require('axios')
const noderandom = require('node-random-name')
const colors = require('@colors/colors')

async function getEmail() {
    const first = noderandom({first: true})
    const username = `${first}2231`.toLocaleLowerCase()
    const email = `${username}@amfcode.my.id`
    const response = await axios.get(`https://hhnetflix.my.id/api/email/${email}/amfcode`)
    if(response.status == '200') {
        return response.data
    } else {
        return null
    }
}

async function getMessage(email) {
    const response = await axios.get(`https://hhnetflix.my.id/api/messages/${email}/amfcode`)
    if(response.status == '200') {
      return response.data
    } else {
      return null
    }
}

async function validateMail(email) {
    const response = await axios.post(
        'https://prod-api-core.tunnelbear.com/core/web/validateEmail',
        new URLSearchParams({
          'email': email
        }),
        {
          headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'origin': 'https://www.tunnelbear.com',
            'priority': 'u=1, i',
            'referer': 'https://www.tunnelbear.com/',
            'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'tb-csrf-token': '56457b7e108c659b3e5ba2bce884f45a784673d7',
            'tunnelbear-app-id': 'com.tunnelbear.web',
            'tunnelbear-app-version': '1.0.0',
            'tunnelbear-platform': 'Chrome',
            'tunnelbear-platform-version': '134',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            'cookie': '_ga_B7YKGDK379=GS1.1.1743616239.1.0.1743616239.0.0.0; _ga=GA1.1.1769312993.1743616239; _uetsid=fcf4f4500fea11f0ad0365c359b9f05c; _uetvid=fcf528100fea11f09da999e16a2e5167; PLAY_SESSION=e7cdcd3afd051b17e73b97ac5f488e298b4d96ec-___AT=56457b7e108c659b3e5ba2bce884f45a784673d7&tbcsrf=56457b7e108c659b3e5ba2bce884f45a784673d7&___TS=1744221205635'
          }
        }
      );
      if(response.status == '200') {
        return response.data
      } else {
        return null
      }
}

async function registMail(email) {
  const response = await axios.post(
    'https://prod-api-core.tunnelbear.com/core/web/createAccount',
    new URLSearchParams({
      'email': email,
      'password': 'Maulana2004',
      'json': '1',
      'v': 'web-1.0',
      'referralKey': '',
      'tbaa_utm_source': 'website'
    }),
    {
      headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'origin': 'https://www.tunnelbear.com',
        'priority': 'u=1, i',
        'referer': 'https://www.tunnelbear.com/',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'tb-csrf-token': '56457b7e108c659b3e5ba2bce884f45a784673d7',
        'tunnelbear-app-id': 'com.tunnelbear.web',
        'tunnelbear-app-version': '1.0.0',
        'tunnelbear-platform': 'Chrome',
        'tunnelbear-platform-version': '134',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'cookie': '_ga_B7YKGDK379=GS1.1.1743616239.1.0.1743616239.0.0.0; _ga=GA1.1.1769312993.1743616239; _uetsid=fcf4f4500fea11f0ad0365c359b9f05c; _uetvid=fcf528100fea11f09da999e16a2e5167; PLAY_SESSION=e8978ae4994b268e998473f36c3cb5e3fe9e6658-___AT=56457b7e108c659b3e5ba2bce884f45a784673d7&tbcsrf=56457b7e108c659b3e5ba2bce884f45a784673d7&___TS=1744221227005'
      }
    }
  );
   if(response.status == '200') {
    return response.data
   } else {
    return null
   }
}


async function verifyEmail(link) {
    try {
        const response = await axios.get(link, { maxRedirects: 0 });
        return "Valid";
    } catch (error) {
        if (error.response && error.response.status === 303) {
            const redirectUrl = error.response.headers.location;
            try {
                await axios.get(redirectUrl);
                return "Valid";
            } catch {
                return "Error";
            }
        } else {
            return "Error";
        }
    }
}


(async () => {
    const email = await getEmail()
    if(email) {
      console.log(`[+] Processing Email : ${email}`)
        const validMail = await validateMail(email)
        if(validMail.is_valid == true) {
          const regist = await registMail(email)
          if(regist.status == 'OK') {
          while (true) {
            const cekMessage = await getMessage(email);
        
            if (!cekMessage || cekMessage.length === 0 || !cekMessage[0].content) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
        
            const content = cekMessage[0].content;
            const regex = /https:\/\/api\.tunnelbear\.com\/core\/verifyEmail\?key=[a-f0-9-]+/i;
            const link = content.match(regex);
        
            if (link) {
              console.log(colors.green(`    Successfully Registered!`))
              console.log(colors.green('    Verif Mail Manual Jink Males\n    Akses : hhnetflix.my.id'))
                fs.appendFileSync('result.txt', `${email}|Maulana2004\n`)
                break;
            } else {
                
            }
        
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
          
          } else {
            console.log(colors.red(`[!] ${email} Failed Registered!`))
          }
        } else {
          console.log(colors.red(`[!] ${email} Already Registered!`))
        }
    } else {
        console.log(colors.red(`[!] Failed Get Email!`))
    }
})()