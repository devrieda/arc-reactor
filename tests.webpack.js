function requireAll(context) {
  context.keys().forEach(context);
}

requireAll(require.context('./tests', true, /-test\.js$/));
