import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper, event;
  beforeAll(() => {
    event = mockData[0]; // Mock event prop
    EventWrapper = shallow(<Event event={event} />);
  });

  // Component props
  test('should render with correct event prop', () => {
    expect(EventWrapper.instance().props.event).toEqual(event);
  });

  test('should render event summary', () => {
    expect(EventWrapper.find('.summary').text()).toBe(event.summary);
  });

  test('should render event location', () => {
    expect(EventWrapper.find('.location').text()).toBe(event.location);
  });

  test('should render details button', () => {
    expect(EventWrapper.find('.btn-details')).toHaveLength(1);
  });

  // Component state
  test('should render event component state correctly', () => {
    expect(EventWrapper.state('isExpanded')).toBe(false);
  });

  test('clicking "show-details" button should expand event component', () => {
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.state('isExpanded')).toBe(true);
  });

  test('expanded event should render event description correctly', () => {
    expect(EventWrapper.find('.description').text()).toBe(event.description);
  });

  test('expanded event should collapse when details button is clicked', () => {
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.state('isExpanded')).toBe(false);
  });

  test('expanded event component should no longer be present after collapsing event', () => {
    expect(EventWrapper.find('.Expanded-Event')).toHaveLength(0);
  });
});