exports.up = function (knex) {
  return knex.schema.createTable("movie_theaters", (table) => {
    table.integer("movie_id").notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade"); //Delete in a cascading order, meaning that if parent is deleted all child info is also deleted
    table.integer("theater_id").notNullable();
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("cascade");
    table.boolean("is_showing");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
