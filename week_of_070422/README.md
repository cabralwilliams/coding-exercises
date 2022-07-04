# Handlebars Demo

## About
This is just a demonstration about how handlebars template files can be used to render applications in an MVC framework.  I would recommend copying the files and checking out the relationship between the api routes and the rendered pages to see how these files work.

## Instructions
1. Make sure that you create the .env file that has the proper properties associated with the database that is being created.
2. Create the database by running the `source db/db.sql` command from the MySQL shell while in the `week_of_070422` folder.
3. Seed the database by running the command `npm run seed` once out of the MySQL shell and from the `week_of_070422` folder.
4. Currently, there is no ability to create additional entries in the database beyond adding them to the `seeds.js` file.