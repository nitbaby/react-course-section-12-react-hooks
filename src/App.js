import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';

const items = [
  {
    item: "What is React?",
    content: "React is a front end javascript framework"
  },{
    item: "Why React?",
    content: "React is a popular library"
  },{
    item: "How do use React?",
    content: "Components"
  }
];
function App() {
  return (
    <div className="">
      <h1>Widgets App</h1>
      <br/>
      {/* <Accordion items={items}/> */}
      <Search/>
    </div>
  );
}

export default App;
