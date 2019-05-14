exports.up = function(knex, Promise) {
  console.log("creating the comments table...");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    //so the comments table has access to article id,
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .dateTime("created_at", { precision: 6 })
      .defaultTo(knex.fn.now(6));
    commentsTable.text("body").notNullable();
  });
};
//the others worked with references
// why cant we just change author to the created_by

exports.down = function(knex, Promise) {
  console.log("removing comments tables...");
  return knex.schema.dropTable("comments");
};
