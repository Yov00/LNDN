import React,{ChangeEvent, useState} from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity }  from '../../../app/models/activity';

interface Props{
    activity: Activity | undefined;
    closeForm: ()=>void;
    createOrEdit:(activity: Activity) =>void;
    submitting:boolean;
}
export default function ActivityForm({activity: selectedActivity,closeForm,createOrEdit,submitting}:Props){
    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }
    const [activity,setActivity] = useState(initialState);

    function handleSubmit(){
        createOrEdit(activity);
    }

    function handleOnChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setActivity({...activity,[e.target.name]:e.target.value})
    }
    
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title"  value={activity?.title} name="title"  onChange={e=>handleOnChange(e)}/>
                <Form.TextArea placeholder="Description" value={activity?.description} name="description" onChange={e=>handleOnChange(e)} />
                <Form.Input placeholder="Category"   value={activity?.category} name="category" onChange={e=>handleOnChange(e)} />
                <Form.Input type="date" placeholder="Date"  value={activity?.date} name="date" onChange={e=>handleOnChange(e)}/>
                <Form.Input placeholder="City" value={activity?.city} name="city" onChange={e=>handleOnChange(e)}/>
                <Form.Input placeholder="Venue" value={activity?.venue} name="venue" onChange={e=>handleOnChange(e)}/>
                <Button loading={submitting} floated="right" positive type="submit" content="Submit"/>
                <Button onClick={closeForm} floated="right"  type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}