import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Header, Icon, Image, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import axios from 'axios';


class App extends Component {
  state = {
    values:[]
  }



  componentDidMount(){

    axios.get('http://localhost:5000/api')
      .then((response)=>{
        let data = response.data;
        this.setState({
          values: data
        })
      })
      .catch(err=>{
        console.log(err)
      })
      
     
  }


  render(){
    const values = this.state.values;
    const displayValues = values.length > 0 ?  values.map(({id,name})=>(
      <List.Item key={id}>
        {name}
      </List.Item>
    )) : (<li>Loading...</li>);

    return (
    <div className="App">
      <Header as='h2'>
        <Icon name='users'  />
        <Header.Content>Reactivities</Header.Content>
        </Header>
       
        <List>
          {displayValues}
          </List>
      </div>
    );
  }
}

export default App;
