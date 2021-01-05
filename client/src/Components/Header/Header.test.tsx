import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

// Set up Enzyme
configure({adapter: new Adapter()});

    let wrapper;

beforeEach(() => {
    wrapper = shallow(<Header />);
})

describe('<Header />', () => {
    it('Should render if !isLoading', () => {
        wrapper.setProps({isLoading: false})
        expect(wrapper.contains('Build your own networks')).toBeTruthy();
    });
});
