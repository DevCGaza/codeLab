import {graphql,gql} from 'react-apollo'
import React from 'react'
class StudentsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {students:['sami','jehad']}
    }
    handelRefetch(){
        // this.props.data.refetch()
    }
    componentDidMount(){
        // this.props.data.startPolling(1000)
    }
    prepareItems(){
        if(this.props.data.loading){
            return(<h1>Loading</h1>)
        }
        if(this.props.data.error){
            return(<h1>sorry an error occurred</h1>)
        }
        return this.props.data.allStudents.map(student=>{
            return(<ul key={student.id}>{student.name}</ul>)
        })
    }
    render(){
    const items = this.prepareItems()
        return(
            <div>
                <li>
                    {items}
                </li>
                <button onClick={this.handelRefetch.bind(this)}>re-fetch</button>
            </div>

        )
    }
}
const query = gql`
query allStudents{
 allStudents{
    name
    id
    number
  }
}
`;
export default graphql(query)(StudentsList)
