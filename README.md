# opor 🍲

Lookup assigned and unassigned ("_open_") network ports.

`opor` is a small web app that lets you query the IANA service-name/port-number
registry: type a port number and instantly see whether the port is assigned to a
service or still unassigned / open for use.

## Environment variables

- `DATABASE_URL`

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) with React 19
- [Tailwind CSS](https://tailwindcss.com) v4
- [Drizzle ORM](https://orm.drizzle.team) with PostgreSQL
- [shadcn/ui](https://ui.shadcn.com) components
- [Bun](https://bun.sh) as the package manager
