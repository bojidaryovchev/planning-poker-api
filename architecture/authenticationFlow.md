1. user logs in

2. the backend sends back an access token and a refresh token

- the refresh token is kept in an httpOnly __Host cookie
- the access token is returned in the response body and kept in a web worker
- requests to the backend are sent from the web worker with Authorization Bearer header
- the access token is short-lived with just 15 minutes of lifespan
- the refresh token is long-lived with 1 week of lifespan
- both the access token and the refresh token hold the encrypted userId using @hapi/iron sealing
- the refresh token cookie value is also sealed
- different 4096-bit secrets are used for the encoding and sealing of the tokens

3. at some point the client gets a 401 Unauthorized due to the access token expiration

4. the client sends a request to the backend to obtain a new access token using the refresh token

- if there is no refresh token or it has expired, the backend responds with 401 Unauthorized and the user is logged out (see step 5)
- else, the backend generates a new access token along with a new refresh token and sends them back
- the old refresh token now becomes obsolete so the backend stores it in the database in order to blacklist it
- a cron job makes sure to delete old refresh tokens

5. the user logs out

- the access token is deleted
- the refresh token gets blacklisted
