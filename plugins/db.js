import Db from "@/lib/db";

export default async (ctx, inject) => {
  const db = new Db();

  inject("db", db);
  ctx.$db = db;

  // set theme
  ctx.$vuetify.theme.dark = ctx.store.getters[`app/dark_theme`]
};
