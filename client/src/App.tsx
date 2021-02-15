import React,{useState,useEffect} from 'react';
import axios from 'axios';

import './App.css';
import { Header, List } from 'semantic-ui-react';


function App() {
  const [activities, setActivities] = useState([]);


  useEffect(()=>{
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        console.log(res);
        setActivities(res.data);
      })
      .catch(e=>console.error(e));
  },[]);

  const displayActivities = activities.map((act:any)=>(
    <List.Item key={act.id}>
        {act.title}
    </List.Item>
  ));
  return (
    <div className="App">
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {displayActivities}
     </List>
    </div>
  );
}

export default App;
