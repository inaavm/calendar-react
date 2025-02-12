import BookListForm from './components/BookListForm';
// import BookSchedule from './components/EventListForm';
import"./App.css";



function App() {
  return (
    <div className="App">
        <div class="shape-1"></div>
        <div class="shape-2"></div>
        <div class="currentdate">
        <p>
      
          <span className="weekday">
            {new Date().toLocaleDateString(undefined, { weekday: "long" })}
          </span>
          {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <div class="wavy-circle"></div>
        </div>

      <br></br>
      <br></br>
    {/* <h1> Your calendar</h1> */}
     <BookListForm/>
    </div>
  );
}

export default App;


 

 
