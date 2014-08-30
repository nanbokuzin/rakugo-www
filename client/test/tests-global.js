suite('Global tests', function() {
  test('page has valid title', function() {
    assert(document.title && document.title.match(/\S/));
  });
});
