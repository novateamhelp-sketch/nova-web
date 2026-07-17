# Resumen: Service areas — NJ, NY y PA (sin counties)

## Estado final

Quedan **tres** service areas statewide (sin listas de counties):

| Estado | URL | Título de sección |
|--------|-----|-------------------|
| New Jersey | `/service-areas/new-jersey` | New Jersey Service Area |
| New York | `/service-areas/new-york` | New York Service Area |
| Pennsylvania | `/service-areas/pennsylvania` | Pennsylvania Service Area |

**Connecticut** se reemplazó por Pennsylvania (redirect 301).

**Counties eliminados** (ya no se listan ni se indexan):

- NY: Kings, Queens, Bronx, Richmond, New York (Manhattan)
- NJ: Union, Middlesex, Monmouth
- CT: Fairfield, Hartford, New Haven, New London

Si un área no tiene counties, el heading usa `{Estado} Service Area` en lugar de `{Estado} Counties`.

---

## Fase 1 — Connecticut → Pennsylvania

- Config, SEO, textos, sitemap y redirect CT → PA
- Migración API: connecticut → pennsylvania

---

## Fase 2 — Quitar counties (no los estados)

**Intención:** dejar NJ y NY como Pennsylvania (páginas de estado sin counties).

| Cambio | Detalle |
|--------|---------|
| Config / seed / migrate | NJ, NY, PA con `counties: []` |
| Menú | Tres enlaces: New Jersey, New York, Pennsylvania |
| Sitemap | Solo URLs de estado (sin counties) |
| Redirects counties | `/new-jersey/*` → `/new-jersey`, `/new-york/*` → `/new-york` |
| SEO / copy | Tri-state NJ, NY & PA |

---

## Redirecciones Netlify (`public/_redirects`)

```
/service-areas/connecticut /service-areas/pennsylvania 301
/service-areas/new-jersey/* /service-areas/new-jersey 301
/service-areas/new-york/* /service-areas/new-york 301
/* /index.html 200
```

---

## Sitemap (service areas)

- `/service-areas`
- `/service-areas/new-jersey`
- `/service-areas/new-york`
- `/service-areas/pennsylvania`

Sin URLs de counties.

---

## MongoDB

Al arrancar `nova-api`, la migración asegura NJ, NY y PA (sin counties) y elimina connecticut si aún existía.

---

## Nota

La dirección “Somerset County, New Jersey” en footer/contacto es ubicación de negocio, no una lista de counties del menú.
