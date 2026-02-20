function renderIndex(req, res) {
  const title = 'Inq\'s Inventory';
  res.render('index', { 
    title
  });
}

function renderAddForm(req, res) {
  const title = "Add Items Form"
  res.render('add-item-form', {
    title
  })
}

export { renderIndex, renderAddForm }