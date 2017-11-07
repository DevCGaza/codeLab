import React, { Component } from 'react';
import {ApolloProvider} from 'react-apollo'
import Client from './lib/initApollo'
import StudentsList from './components/studentsList'
import CreateStudentForm from './components/createStudent'

class App extends Component {
  render() {
    return (
      <div className="App">
          <ApolloProvider client={Client}>
            <div>
                <StudentsList/>
                <CreateStudentForm/>
            </div>
          </ApolloProvider>
      </div>
    );
  }
}

export default App;
