import { Hono } from "hono";
import { serve } from "@hono/node-server";
import pg from "pg";

const postgresql = new pg.Pool({ user: "postgres" });

const app = new Hono();
app.get("/api/hello", async (c) => {
  return c.text("Hello World!");
});
app.get("/01_heroku/api/skoler", async (c) => {
  const result = await postgresql.query(
    "select skolenavn, besoksadresse_besoksadresse_postnummer, from grunnskoler_3697913259634315b061b324a3f2cf59.grunnskole",
  );
  return c.json({
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
      },
    },
    features: result.rows.map(
      ({ geometry: { coordinates }, ...properties }) => ({
        type: "Feature",
        properties,
        geometry: { type: "Point", coordinates },
      }),
    ),
  });
});

serve(app);
