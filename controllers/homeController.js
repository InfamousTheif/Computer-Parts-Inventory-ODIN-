function renderIndex(req, res) {
  const title = 'Inventory';
  res.render('index', { 
    title
  });
}

export { renderIndex }