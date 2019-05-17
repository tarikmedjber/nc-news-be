exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable
      .increments("article_id")
      .primary()
      .notNullable();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable
      .string("topic")
      .references("topics.slug")
      .notNullable();
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable();
    articlesTable
      .dateTime("created_at", { precision: 6 })
      .defaultTo(knex.fn.now(6))
      .notNullable();
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
