function renderIndex(req, res) {
  const title = 'Inq\'s Inventory';
  res.render('index', { 
    title
  });
}

export { renderIndex }