import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import Event from '../Event';
import { mount, shallow } from 'enzyme';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
const event = mockData[0]; // Mock event prop

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {

        let AppWrapper;
        given('the user has entered in (or left empty) search constraints', () => {

        });

        when('the user loads a list of events in that search', () => {
            AppWrapper = mount(<App />)
        });

        then('the user should see the events in collapsed form (ie; name and city only)', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.EventList')).toHaveLength(1);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {

        let AppWrapper;
        given('the user has loaded a list of upcoming events', async () => {
            AppWrapper = await mount(<App />);
            await AppWrapper.update();
            expect(AppWrapper.find(Event)).toHaveLength(mockData.length);
        });

        when('the user clicks on “See More" for one event in the list', () => {
            AppWrapper.update();
            AppWrapper.find('.event .btn-details').at(1).simulate('click');
        });

        then('the user should see all details relating to that one event in a larger window/area', () => {
            AppWrapper = shallow(<Event event={event} />);
            AppWrapper.find('.btn-details').simulate('click');
            expect(AppWrapper.state('isExpanded')).toBe(true);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, and, then }) => {

        let AppWrapper;
        given('the user has loaded a list of events/opened app', async () => {
            AppWrapper = await mount(<App />);
            await AppWrapper.update();
            expect(AppWrapper.find(Event)).toHaveLength(mockData.length);
            AppWrapper.find('.event .btn-details').at(0).simulate('click');
            expect(AppWrapper.find('.event .summary')).toHaveLength(2);
        });

        and('the user has already opened up an expanded view of an event', () => {
            AppWrapper.update();
            AppWrapper.find('.btn-details').at(0).simulate('click');
            expect(AppWrapper.find('.isExpanded')).toHaveLength(0);

        });

        when('the user clicks on “See Less"', () => {
            AppWrapper.find('.event .btn-details').at(1).simulate('click');
        });

        then('the user should go back to a collapsed view of the event in the list of all events from their search', () => {
            AppWrapper = shallow(<Event event={event} />)
            expect(AppWrapper.state('isExpanded')).toBe(false);
        });
    });
});