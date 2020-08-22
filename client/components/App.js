import React from 'react';
import { Header } from '../components';

const App = (props) => {
  return (
    <div className="container">
      <Header />
      {props.children}
    </div>
  );
};

export default App;
