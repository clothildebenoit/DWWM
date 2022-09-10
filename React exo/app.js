// const title = React.createElement('h1', {}, 'Bonjour tout le monde')

// ReactDom.render(title, document.querySelector('#app'))

// ReactDOM.render(
//     <h1>Bonjour, tout le monde !</h1>,
//     document.getElementById('app')
//   );

  const e = React.createElement;

// Affiche un bouton « J’aime »
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'J’aime'
);