const axios = require('axios')
const qs = require('qs')
const { CMDS_CLIENT_ID, CMDS_CLIENT_SECRET, CMDS_AUTH_ENDPOINT, CMDS_API_BASE_URL } = process.env

async function getToken() {
  const {
    data: { access_token }
  } = await axios({
    url: `${CMDS_AUTH_ENDPOINT}/oauth2/v2.0/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      client_id: CMDS_CLIENT_ID,
      client_secret: CMDS_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: `api://${CMDS_CLIENT_ID}/.default`
    })
  })
  return access_token
}

async function getUserList() {
  const query = `{ employees(pageNum:1 pageSize:10) { edges { department chineseName englishName email accountName globalEmployeeId } totalCount}}`
  const token = await getToken()
  console.log({ token })
  const {
    data: {
      data: {
        employees: { edges }
      }
    }
  } = await axios({
    url: `${CMDS_API_BASE_URL}/employee`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: JSON.stringify({ query })
  })
  return edges
}
module.exports = {
  getUserList
}