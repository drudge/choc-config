# gister

[![Build Status](https://secure.travis-ci.org/goatslacker/gister.png)](http://travis-ci.org/goatslacker/gister)

node.js module for gist.github.com -- edit, create, and retrieve gists.

## The Basics

`gister` is a way to create, edit and retrieve gists programatically.

### Install npm

Inside your project's directory

    npm install gister

### require it

    var Gister = require('gister');

### Create the object

    var gist = new Gister({
      username: "octocat",
      password: "secret"
    });

    // You can call .auth() method to retrieve an OAuth token and store that instead of
    // the user's name and password

### Events

gister will emit events back at you.

Each event takes a callback as its second parameter.

    error       // Errors received from response
    gist        // The gist you're retrieving via .get()
    edited      // GH Response for edited gists
    created     // Response for created gists
    token       // OAuth token returned
    starred     // GH Response for starred gists
    unstarred   // Response when unstarring a gist
    is_starred  // Boolean. Checks if a gist is starred or not
    deleted     // Response for deleted gists
    forked      // Response for forked gists

### Creating a gist

    gist.create({ "my_file.txt": "Hello World" });

### Editing a gist

    gist.edit({ "flip.js": "function flip(f, a, b) { return f(b, a) }");

### Retrieiving a gist

    gist.get(101210, "name of my gist");    // name of your gist is optional. If added only that 'file' will be retrieved.
