import React from 'react'
import {gql,graphql} from 'react-apollo'
class CreateStudentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:"",number:0}
    }
    handelSubmit(){
        this.props.mutate({
            variables:{number:parseInt(this.state.number, 10),name:this.state.name}
        }).then(data=>{
            console.log('done')
        }).catch(err=>{
            console.log("sorry an error occurred")
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <input placeholder={"name"} type="text" onChange={e=>this.setState({name:e.target.value})}/>
                <input type="number" onChange={e=>this.setState({number:e.target.value})} placeholder={"number"}/>
                <button onClick={this.handelSubmit.bind(this)}> save</button>

            </div>
        )
    }
}
const mutation = gql`
    mutation createStudent($name:String!,$number:Int!){
  createStudent(name:$name,number:$number){
   name
    id
    number
  }
}
`;
export default graphql(mutation)(CreateStudentForm)