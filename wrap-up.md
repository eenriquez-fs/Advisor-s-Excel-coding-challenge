## Questions
(sent via email :D)

### Please provide instructions on how to run your project in a bulleted list below.
- API (hapiJS framework)
  *p.s.:i have moved the port of postgresql to 5433 instead of 5432 in case of collisions. so if ever you wanted to access the db make sure to use the port 5433 which is also defined in the docker-compose file*

  - make sure you are in the api directory
  - execute `nvm use ` this will make sure that the nodejs version to use is compatible with what is used in this project
    - if not using nvm, you can just check the .nvmrc file and use or install that nodejs version manuall. Optionally you can install nvm using this reference: https://github.com/nvm-sh/nvm
  - execute `yarn install` this will install the packages
  - after installing, we can now run our migration via `npx knex migrate:latest` this will create the additional tables in this project which is the account_withdrawals table
  - running the seed: the docker compose up had some errors when loading the sample data, execute the command `npx knex seed:run` so it will install the sample data which is the same as what is found on the init-db.sql
  - (we are now ready to run the app): to start the api, execute `yarn start-dev` it will start the dev server at localhost:3900
  - this api provides proper documentation, you can visit the swagger doc via localhost:3900/documentation

- UI (nextJS framework)
  - make sure you are in the ui directory
  - execute `nvm use ` this will make sure that the nodejs version to use is compatible with what is used in this project
    - if not using nvm, you can just check the .nvmrc file and use or install that nodejs version manuall. Optionally you can install nvm using this reference: https://github.com/nvm-sh/nvm
  - install the dependencies via `yarn install`
  - make sure the .env file points to localhost:3900 `API_ENDPOINT=http://localhost:3900`
  - start the dev server using `yarn dev`

  if you encounter any challenges pls do let me know via my email   `eenriquez@fullscale.ph`


### Were there any pieces of this project that you were not able to complete that you'd like to mention?
- nope, all features requested are implemented. there are some technical debts though but overall, all the features were implemented

### If you were to continue building this out, what would you like to add next?
- unit tests
- amount should have been named as balance in the account table
- HOC/providers for properly storing the account number used on all actions
- print transaction logs
- add a more secure way for ui to communicate with the api,

### If you have any other comments or info you'd like the reviewers to know, please add them below.
- I was suppose to use a state management library but thought that would be an overkill so I utilized the searchParams instead on the UI.
-- I added the seed since the docker file fails to load the initial values
- all the logic are in the api, ui just provides the info the api needed to process the data
- I should have done more but I think I am out of time, so I guess I can refactor later or learn from what I haven't implemented here ;)