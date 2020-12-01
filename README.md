# Groupomania

## Installation

Installer un serveur Mysql/MariaDB et Redis.

Cloner le dépot et lancer la commande :

```
npm install
```

## Fichier de configuration

Fichier dev:
Renommer .env.development.example en .env.development

Fichier production:
Renommer .env.production.example en .env.production

### Environment variables

| Variable         | Type       | Default value   |
| ---------------- | ---------- | --------------- |
| **APP_NAME**     | _required_ | groupomania_api |
| **PORT**         | _required_ | 3000            |
| **HOST**         | _required_ | 127.0.0.1       |
| **TOKEN**        | _required_ | null            |
| **CORS_URL**     | _required_ | null            |
| **DB_PORT**      | _required_ | null            |
| **DB_HOST**      | _required_ | null            |
| **DB_NAME**      | _required_ | groupomania     |
| **DB_USER**      | _required_ | groupomania     |
| **DB_PASS**      | _required_ | password        |
| **DB_PREFIX**    | _required_ | gpm             |
| **REDIS_HOST**   | _required_ | 127.0.0.1       |
| **REDIS_PORT**   | _required_ | 6379            |
| **REDIS_DB**     | _optional_ | 0               |
| **REDIS_PASS**   | _optional_ | null            |
| **REDIS_PREFIX** | _optional_ | gpm             |
| **CACHE_TTL**    | _required_ | 120             |

### Mode développement

```
npm run dev
```

### Compiler l'API

```
npm run build
```

### Mode production

```
npm run start
```

### Tuer le process daemon pm2

```
pm2 kill
```
