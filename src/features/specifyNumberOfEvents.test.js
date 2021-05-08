import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import Event from '../Event';
import NumberOfEvents from '../NumberOfEvents';
import { mount } from 'enzyme';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 24 is the default number', ({ given, when, then }) => {

        let AppWrapper;
        given('the main page is open and the user hasn’t specified a number in the “Number of Events” field', () => {

        });

        when('the user scrolls through the app', () => {
            AppWrapper = mount(<App />);
        });

        then(/^the user should see (\d+) events displayed on the main page$/, (arg0) => {
            AppWrapper.update();
            expect(AppWrapper.find(Event)).toHaveLength(mockData.length);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {

        let AppWrapper;
        given('the main page is open', () => {
            AppWrapper = mount(<App />);
        });

        when('the user types in a specific number of events in the “Number of Events” field', () => {
            const eventObject = { target: { value: '1' } };
            AppWrapper.find('.number').simulate('change', eventObject);
        });

        then('the user should see that specific number of events displayed on the main page', () => {
            AppWrapper.update();
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe('1');
        });
    });
});