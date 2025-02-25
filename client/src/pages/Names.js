import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  SimpleGrid,
  Center,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
// Note: Chakra UI applies a border-width: 0; to the <body>, so none of the input boxes are visible

import { useNavigate } from 'react-router-dom';
import 'core-js/es/promise';
import 'core-js/es/set';
import 'core-js/es/map';

import * as Yup from 'yup';
import '../App.css';

function Names() {
  const navigate = useNavigate();

  const hasSessionStorage = !!sessionStorage.getItem('initialValues');
  const initialVal = (fieldName) => {
    if (hasSessionStorage) {
      return JSON.parse(sessionStorage.getItem('initialValues'))[fieldName];
    }
    return '';
  };

  const validationSchema = Yup.object({
    t1p1Name: Yup.string().required('Required'),
    t2p1Name: Yup.string().required('Required'),
    t1p2Name: Yup.string().required('Required'),
    t2p2Name: Yup.string().required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      team1Name: initialVal('team1Name') ? initialVal('team1Name') : 'Team 1',
      team2Name: initialVal('team2Name') ? initialVal('team2Name') : 'Team 2',
      t1p1Name: initialVal('t1p1Name'),
      t2p1Name: initialVal('t2p1Name'),
      t1p2Name: initialVal('t1p2Name'),
      t2p2Name: initialVal('t2p2Name'),
    },
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
      sessionStorage.setItem('initialValues', JSON.stringify(values));
      navigate('/spades-calculator', { state: values });
    },
  });

  const setDefaultTeamNames = () => {
    if (formik.values.team1Name === '') {
      formik.setFieldValue('team1Name', 'Team 1');
    }
    if (formik.values.team2Name === '') {
      formik.setFieldValue('team2Name', 'Team 2');
    }
  };

  useEffect(() => {
    if (hasSessionStorage) {
      sessionStorage.setItem('initialValues', JSON.stringify(formik.values));
    }
    setDefaultTeamNames();
  }, [formik.values]);

  return (
    <div className='App'>
      <div className='App-inner'>
        <div className='team-board'>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <SimpleGrid columns={2}>
                <div className='namesBox'>
                  <Editable
                    defaultValue={formik.values.team1Name}
                    mt={2}
                    fontSize='lg'
                    fontWeight='bold'
                    placeholder={formik.values.team1Name}
                  >
                    <Center>
                      <EditablePreview />
                      <EditableInput
                        type='text'
                        value={formik.values.team1Name}
                        onChange={formik.handleChange}
                        id='team1Name'
                        name='team1Name'
                      />
                    </Center>
                  </Editable>
                </div>
                <div className='namesContainer'>
                  <Editable
                    defaultValue={formik.values.team2Name}
                    mt={2}
                    fontSize='lg'
                    fontWeight='bold'
                    placeholder={formik.values.team2Name}
                  >
                    <Center>
                      <EditablePreview />
                      <EditableInput
                        value={formik.values.team2Name}
                        onChange={formik.handleChange}
                        id='team2Name'
                        name='team2Name'
                      />
                    </Center>
                  </Editable>
                </div>
                <div className='namesContainer'>
                  <FormControl
                    isInvalid={
                      formik.errors.t1p1Name && formik.touched.t1p1Name
                    }
                  >
                    <FormLabel
                      style={{ paddingLeft: '5px' }}
                      htmlFor='t1p1Name'
                    >
                      Player 1 Name
                    </FormLabel>
                    <Input
                      px={1}
                      placeholder={`Who's dealing first?`}
                      type='text'
                      value={formik.values.t1p1Name}
                      onChange={formik.handleChange}
                      id='t1p1Name'
                      name='t1p1Name'
                    />
                    {formik.errors.t1p1Name && formik.touched.t1p1Name ? (
                      <FormErrorMessage>
                        {formik.errors.t1p1Name}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </div>

                <div className='namesContainer'>
                  <FormControl
                    isInvalid={
                      formik.errors.t2p1Name && formik.touched.t2p1Name
                    }
                  >
                    <FormLabel
                      style={{ paddingLeft: '5px' }}
                      htmlFor='t2p1Name'
                    >
                      Player 1 Name
                    </FormLabel>
                    <Input
                      px={1}
                      placeholder={`Who's left of dealer?`}
                      value={formik.values.t2p1Name}
                      onChange={formik.handleChange}
                      id='t2p1Name'
                      name='t2p1Name'
                    />
                    {formik.errors.t2p1Name && formik.touched.t2p1Name ? (
                      <FormErrorMessage>
                        {formik.errors.t2p1Name}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </div>
                <div className='namesContainer'>
                  <FormControl
                    isInvalid={
                      formik.errors.t1p2Name && formik.touched.t1p2Name
                    }
                  >
                    <FormLabel
                      style={{ paddingLeft: '5px' }}
                      htmlFor='t1p2Name'
                    >
                      Player 2 Name
                    </FormLabel>
                    <Input
                      px={1}
                      value={formik.values.t1p2Name}
                      onChange={formik.handleChange}
                      id='t1p2Name'
                      name='t1p2Name'
                    />
                    {formik.errors.t1p2Name && formik.touched.t1p2Name ? (
                      <FormErrorMessage>
                        {formik.errors.t1p2Name}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </div>

                <div className='namesContainer'>
                  <FormControl
                    isInvalid={
                      formik.errors.t2p2Name && formik.touched.t2p2Name
                    }
                  >
                    <FormLabel
                      style={{ paddingLeft: '5px' }}
                      htmlFor='t2p2Name'
                    >
                      Player 2 Name
                    </FormLabel>
                    <Input
                      px={1}
                      value={formik.values.t2p2Name}
                      onChange={formik.handleChange}
                      id='t2p2Name'
                      name='t2p2Name'
                    />
                    {formik.errors.t2p2Name && formik.touched.t2p2Name ? (
                      <FormErrorMessage>
                        {formik.errors.t2p2Name}
                      </FormErrorMessage>
                    ) : null}
                  </FormControl>
                </div>
              </SimpleGrid>
              <Center>
                <Button
                  size='md'
                  height='40px'
                  width='200px'
                  border='2px'
                  borderColor='green.500'
                  type='submit'
                >
                  Start
                </Button>
              </Center>
            </form>

            {/* 
          - initialize rounds to empty array
          - when round starts (when 'start' is clicked), then we push an object to our rounds array 
          {t1p1Bet, t1p2Bet, t2p1Bet, t2p2Bet, t1p1Actual, t1p2Actual, t2p1Actual, t2p2Actual, t1Bags, t2Bags, t1Score, t2Score}
          all initialized to falsey defaults
          - when an object is in our array (when arr.length is not falsey), then we render our first round, which is a form
          - When someone fills out all fields of the child component <Round>, form fields update to input values, and math is calculated, and another empty object is pushed to our rounds array
                - will need to pass handler from parent to child and the handler should update parent state
          */}
          </div>
        </div>
        {/* 
      if roundInSession === true, display current editable round

      if roundHasJustFinished === true, push most recent game to completedRounds array

      for each completed round, list game round stats in reverse order
    */}
      </div>
    </div>
  );
}

export default Names;
