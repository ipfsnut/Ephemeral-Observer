import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createEvent, updateEvent, fetchEventById } from '../eventSlice';

const EventForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentEvent = useSelector(state => state.events.currentEvent);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentEvent) {
      setTitle(currentEvent.title);
      setDescription(currentEvent.description);
    }
  }, [currentEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateEvent({ id, eventData: { title, description } }));
    } else {
      dispatch(createEvent({ title, description }));
    }
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
        required
      />
      <button type="submit">{id ? 'Update' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;
