const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/SuperheroesController');

module.exports = router => {
  router.get('/superheroes', index);
  router.get('/superheroes/new', _new);
  router.post('/superheroes', create);
  router.post('/superheroes/update', update);
  router.post('/superheroes/delete', _delete);
  router.get('/superheroes/:id/edit', edit);
  router.get('/superheroes/:id', show);
};