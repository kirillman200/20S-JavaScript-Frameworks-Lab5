const viewPath = ('superheroes');
const Superhero = require('../models/superhero');

exports.index = async (req, res) => {
  try {
    const superhero = await Superhero
    .find()
    .sort({updatedAt: 'desc'});


  res.render(`${viewPath}/index`, {
    pageTitle: 'Known Registered Heroes',
    superhero: superhero
  });
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list');
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
    req.flash('danger', 'There was an issue fetching the superheroes list');
    res.redirect('/');
  }
};

exports.new = (req, res) => {

    res.render(`${viewPath}/new`, {
      pageTitle: 'New Superhero'
    
  });
}; 

exports.create = async (req, res) => {
  try {
    const superhero = await Superhero.create(req.body);

    req.flash('success', 'This hero was registered successfully');
    res.redirect(`/superheroes/${superhero.id}`);
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list');
    res.redirect('/');
  }
};

exports.edit = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);

    res.render(`${viewPath}/edit`, {
      pageTitle: superhero.name, 
      formData: superhero
    });
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list');
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    let superhero = await Superhero.findById(req.body.id);
    if (!superhero) throw new Error('Superhero could not be found');
   
    await Superhero.validate(req.body);
    await Superhero.findByIdAndUpdate({_id:req.body.id}, req.body);
    

    req.flash('success', 'This hero was updated successfully');
    res.redirect(`/superheroes/${req.body.id}`);
  } catch (error) {
    req.flash('danger', 'There was an issue fetching the superheroes list6');
    res.redirect(`/superheroes/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Superhero.deleteOne({_id: req.body.id});
    req.flash('success', 'The superhero was deleted successfully');
    res.redirect(`/superheroes`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this superhero: ${error}`);
    res.redirect(`/superheroes`);
  }
};