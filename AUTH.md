## AUTH
1. auth.model.ts: Account interface (Just define data)
2. auth.service.ts: 
   
   - register()
   - login()

    => User array (don't need Database)
3. auth.controller.ts:

    - register API
    - login API
4. auth.route.ts:

    - POST/api/auth/register
    - POST/api/auth/login
5. connect to app.ts:
    POST /register

        {
            "email": "admin@gmail.com",
            "password": "123",
            "role": "OWNER"
        }