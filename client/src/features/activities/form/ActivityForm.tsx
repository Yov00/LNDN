import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import React,{ChangeEvent, useState,useEffect} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from "uuid";


export default observer(function ActivityForm(){
    const history = useHistory();
    const {activityStore} = useStore();
    const {loadingInitial,loading,createActivity,updateActivity,loadActivity} = activityStore;
    const {id } = useParams<{id:string}>();

    const [activity,setActivity] = useState({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(() => {
      if(id){
        loadActivity(id).then(activity => setActivity(activity!));
      }
    }, [id,loadActivity])
    
    function handleSubmit(){
      if(activity.id.length === 0){
        let newActivty = {
          ...activity,
          id: uuid()
        };
        createActivity(newActivty).then(()=> history.push(`/activities/${newActivty.id}`))
      }else{
        updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`))
      }
    }

    function handleOnChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setActivity({...activity,[e.target.name]:e.target.value})
    }
    
    if(loadingInitial) return <LoadingComponent content="Loading activity..." />
    
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title"  value={activity?.title} name="title"  onChange={e=>handleOnChange(e)}/>
                <Form.TextArea placeholder="Description" value={activity?.description} name="description" onChange={e=>handleOnChange(e)} />
                <Form.Input placeholder="Category"   value={activity?.category} name="category" onChange={e=>handleOnChange(e)} />
                <Form.Input type="date" placeholder="Date"  value={activity?.date} name="date" onChange={e=>handleOnChange(e)}/>
                <Form.Input placeholder="City" value={activity?.city} name="city" onChange={e=>handleOnChange(e)}/>
                <Form.Input placeholder="Venue" value={activity?.venue} name="venue" onChange={e=>handleOnChange(e)}/>
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button as={Link} to='/activities' floated="right"  type="button" content="Cancel" />
            </Form>
        </Segment>
    )
});