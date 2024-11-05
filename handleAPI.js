function handleAPI(route, response) {
  if (route == 'list') response.end(`
    <body>
      <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
        <li>d - 42</li>
      </ul>
    </body>
  `)
}

module.exports = handleAPI
