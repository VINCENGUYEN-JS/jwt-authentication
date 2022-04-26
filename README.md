# JWT authentication

Rules [Client-errors]

400 : The generic 400 just means a bad request was made, could be from missing required fields or invalid values for fields that were provided.

401 : It lacks valid authentication credentials for the requested resource [Missing-token] (Unauthorized)

403 : Wrong token (The server understands the request but refuses to authorize it)

404 : indicates that the requested resource was not found, could be a resource was requested by ID but that resource doesn't exist or that the request path itself is not correct and so the server just responded with a 404.

The usual order of these on the server side is 404, 401, 403 and then 400. The reason being that first the server has to find the route/resource requested. Then, the server has to verify the requestor is authorized. Finally, the request itself is validated. This can change around a bit depending on the operation, of course.


## Rules for Refresh Token

If your accessToken is expired , send refreshToken -> server

Server will go through a few checks 

* If the refreshToken exists 

* If the refreshToken exists in DB

* Use JWT.verify refreshToken to detect if its a token sent by server

* If everything is Ok , server will send a pair of accessToken + refreshToken to client

* Save refreshToken to DB
