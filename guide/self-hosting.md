# Self-Hosting

These are general instructions to self host the bot.

**Clone the repository with git**

`git clone https://github.com/lightning-bot/Lightning.git`

---

## Docker

- **Install docker & docker compose**
    - [Docker](https://docs.docker.com/install/)
    - [Docker Compose](https://docs.docker.com/compose/install/) (If you are on macOS or Windows, compose already comes with Docker. You shouldn't need to install it again.)

- **Configure the bot**
    - Copy `example-config.toml` and rename the copy to `config.toml`

- **Run the bot**
    - `docker-compose up`

If you want application commands, make sure to run `<prefix>jsk sync` in your Discord server!


### Some helpful commands

- `docker-compose down` stops the containers
- `docker-compose up -d` to run the containers in "detached" mode. This will free up the current terminal session.
- `docker-compose --help` gives you help

---

## Locally

- **Install Python 3.8+**

- **Install poetry**

    Follow the instructions at https://python-poetry.org/docs/ to install poetry on your system.

- **Install the dependencies**
    - `poetry install --no-dev`

- **Create the database in PostgreSQL**

You will need PostgreSQL installed. Type the following in the `psql` tool
```sql
CREATE ROLE lightningbot WITH LOGIN PASSWORD 'somepasswordtoset';
CREATE DATABASE lightning OWNER lightningbot;
```

- **Configure the bot & setup the database tables**
    - Configure the `example-config.toml` file and rename it to `config.toml`
    - Run `poetry run lightning db upgrade` to initialize the database.

- **Activate the venv and run the bot**
    - Run `poetry run lightning`.
    Alternatively, you can do `poetry run python3 -m lightning`

The bot makes use of a folder called `config` which contains files that are used within the bot.

### Database Migrations

Run `poetry run lightning db upgrade` to run migrations!

If you want to view what migrations are applied and aren't, run `poetry run lightning db log`
