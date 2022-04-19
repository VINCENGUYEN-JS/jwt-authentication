# JWT authentication

Rules 

401 : It lacks valid authentication credentials for the requested resource [Missing-token] (Unauthorized)

403 : Wrong token (The server understands the request but refuses to authorize it)


## Rules for Refresh Token

If your accessToken is expired , send refreshToken -> server

Server will go through a few checks 

* If the refreshToken exists 

* If the refreshToken exists in DB

* Use JWT.verify refreshToken to detect if its a token sent by server

* If everything is Ok , server will send a pair of accessToken + refreshToken to client

* Save refreshToken to DB
