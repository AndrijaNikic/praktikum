# Instrukcije za pokretanje projekta za pregledanje

Ispratite instrukcije za pokretanje projekta

## Preuzimanje projekta

```bash
git clone https://github.com/AndrijaNikic/praktikum.git
cd praktikum

```

## Instalacija projekta

```sh
npm install --silent
```

## Podizvanje baze 

SQL dump baze podataka se nalazi na lokaciji .DATABASE/praktikum.sql

Podici na lokalni MySQL/MariaDB server dump ove baze.

## Konfiguracija baze

Definicija konfiguracionih parametara je u: /config/database.configuration.ts

Primer izgleda konfiguracione datoteke:
```typescript
export const DatabaseConfiguration = {
    hostname: 'localhost',
    username: 'aplikacija',
    password: 'aplikacija',
    database: 'praktikum'
};
```
## Pokretanje aplikacije
```sh
npm run start:dev
```

U internet pregledacu otvoriti: http://localhost:3000/

## Za testiranje

Instalirajte Postman i importujte kolekciju iz .POSTMAN/Veb servis aplikacije.postman_collection.json
