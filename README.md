# A ticket system demoing NextJS + SurrealDB

This app showcases how you can use nextjs in combination with surrealdb.

It's inspired by two other projects that I'm working on:
- https://github.com/theopensource-company/kards-social
- https://github.com/theopensource-company/playrbase

## How to use?

- Install SurrealDB on your system.
- Run a local database and run all table definitions in there that are included in the tables folder.
    - I personally suggest to use Surrealist: https://github.com/StarlaneStudios/Surrealist
- Adjust the connection settings in the hooks/Surreal.tsx file
- Run `pnpm i` in the root of the project to install dependencies.
- Run `pnpm dev`  to start the NextJS development server.
- Access the app at: http://localhost:8000
- Import data

```sh
surreal import -c http://localhost:8000 -u root -p root --ns default --db default tables/user.surql
surreal import -c http://localhost:8000 -u root -p root --ns default --db default tables/ticket.surql
```

## Deploy
```sh
docker build -t ghcr.io/smartnuance/tickets:latest .
export CR_PAT=XXX
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
docker push ghcr.io/smartnuance/tickets:latest
```

## Credits

Based on https://github.com/kearfy/demo-nextjs-surrealdb.
