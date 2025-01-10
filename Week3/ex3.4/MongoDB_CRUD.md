### 3.4. Exercise 4 : MongoDB CRUD

You should already have an Atlas account that we will use again for this exercise. Let's first create a new database
that this exercise can use: `databaseWeek3` and the collection `bob_ross_episodes`. You can do this manually in Atlas,
look up how to do that yourself.

Once you have created the database it is time to set up our environment so that our code can connect to this database.
In the past you may have put this connection information (think of API keys) in your PRs, but from now on that should
not happen anymore. The way we usually do this is by creating a `.env` file and adding that to the `.gitignore` file so
that it does not get pushed to git. We have set up the `.gitignore` file and provided you with an `.env.example` file
that gives an example of what you `.env` file should look like. Have a look in it to see how you should create
the `.env` file.

> You will need to figure out a way to get these `.env` variables into the process environment. This is almost always
> done using a library, but it is up to you to figure out which one this is and set it up correctly.

Now that everything is set up, have a look at `index.js` to see what we would like you to do. We have provided
a `seedDatabase` file that cleans up the database and collection to ensure that you are working with the same data every
time.

> The `index.js` file also assumes some things are set up, when you run it you will encounter an error that you will
> need to solve.

In this exercise we are going to work with the Bob Ross episode data, if you haven't heard of Bob Ross he was a painter
that made a legendary TV show called [The Joy of Painting](https://en.wikipedia.org/wiki/The_Joy_of_Painting). In every
episode he created a landscape painting that was easy to follow along to, have a look at
the [official youtube channel](https://www.youtube.com/c/BobRossIncVideos) to watch some! The data in the `data.json`
file is a list of all the episodes, with their title and the elements he painted in that episode. Note that we massage
this data a bit in the `seedDatabase` file so have a look there and in your database on what the structure is in the
end.