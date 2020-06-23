const viewPath = ('superheroes');
const Superhero = require('../models/superhero');

exports.index = async (req, res) => {
  try {
    const superhero = await Superhero
    .find()
    .sort({updatedAt: 'desc'});


  res.render(`${viewPath}/index`, {
    pageTitle: 'Archive',
    superhero: superhero
  });
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list1');
    res.redirect('/');
  }
}

exports.show = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);

    res.render(`${viewPath}/show`, {
      pageTitle: '',
      superhero: superhero
    })
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list2');
    res.redirect('/');
  }
};

exports.new = (req, res) => {
  try {
    res.render(`${viewPath}/new`, {
      pageTitle: 'New Superhero'
    })
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list3');
    res.redirect('/');
  }
};

exports.create = async (req, res) => {
  try {
    const superhero = await Superhero.create(req.body);

    req.flash('success', 'This hero was registered successfully');
    res.redirect(`/superheroes/${superhero.id}`);
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list4');
    res.redirect('/');
  }
};

exports.edit = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);

    res.render(`${viewPath}/edit`, {
      pageTitle: superhero.name,
      formData: superhero
    })
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list5');
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    let superhero = await Superhero.findById(req.body.id);
    if (!superhero) throw new Error('Blog could not be found');
    await Superhero.validate(req.body);
    await Superhero.updateOne(req.body);

    req.flash('success', 'This hero was updated successfully');
    res.redirect(`/superheroes/${req.body.id}`);
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list6');
    res.redirect(`/superheroes/${req.body.id}/edit`);
  }
};