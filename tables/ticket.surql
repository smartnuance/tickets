-- We need to add the demo content before the field definitions, otherwise we cannot assign the precreated authors

CREATE ticket:surreal CONTENT {
    title: "SurrealDB is awesome!",
    author: user:cld0r7j69000108mg39w4fs4d,
    body: "Are you getting tired of serverless? Well, the next big thing is around the corner. Get buckled up!

SurrealDB allows to you write backendless applications, as I like to call it.",
    created: time::now(),
    updated: time::now(),
    archived: false
};

CREATE ticket:db CONTENT {
    title: "Learn about Multi-Model-Databases",
    author: user:cld0r7j69000108mg39w4fs4d,
    body: "Register for the SITIC Online-Sharing and discuss with other architects!",
    created: time::now(),
    updated: time::now(),
    archived: false,
};

CREATE ticket:auth CONTENT {
    title: "Introducing: authentication!",
    author: user:cld0r5z5q000008mg803v0dhe,
    body: "You can now create an account and signin to create & manage tickets!
    
We use some cool js & react-query magic here to make it work flawlessly. Check it out!",
    created: time::now(),
    updated: time::now(),
    archived: false,
};

-----------------------------
----- Table definitions -----
-----------------------------

DEFINE TABLE ticket SCHEMAFULL
    PERMISSIONS 
        FOR select FULL
        FOR create WHERE $scope = 'user'
        FOR update, delete WHERE $scope = 'user';

DEFINE FIELD title   ON TABLE ticket TYPE string ASSERT $value != NONE;
DEFINE FIELD body    ON TABLE ticket TYPE string ASSERT $value != NONE;
DEFINE FIELD author  ON TABLE ticket VALUE $before OR $auth.id;
DEFINE FIELD created ON TABLE ticket VALUE $before OR time::now();
DEFINE FIELD updated ON TABLE ticket VALUE time::now();
DEFINE FIELD archived ON TABLE ticket type bool; 

RELATE user:cld0r7j69000108mg39w4fs4d->reviews->ticket:auth;
RELATE user:cld0r7j69000108mg39w4fs4d->reviews->ticket:db;
RELATE user:cld0r5z5q000008mg803v0dhe->reviews->ticket:surreal;

DEFINE TABLE reviews PERMISSIONS FULL;

-- Epics
DEFINE TABLE includes PERMISSIONS FULL;
RELATE ticket:surreal->includes->ticket:auth SET order = 0;
RELATE ticket:surreal->includes->ticket:db SET order = 1;
