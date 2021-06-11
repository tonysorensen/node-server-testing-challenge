
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('blackholes')
  .truncate().then(function () {
      // Inserts seed entries
      return knex('blackholes').insert([
        {name: 'Messier 87'},
        {name: 'Sagittarius A'},
        {name: 'NGC 1277'}
      ]);
    });
};
