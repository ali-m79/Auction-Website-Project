import React from 'react'
import TimeLeft from './TimeLeft'
import {mount} from 'cypress/react18'

describe('<TimeLeft />', () => {
  it('Updates the time each seccond', () => {
    const finishDate=new Date('2024-07-21T12:30:40Z');
    mount(<TimeLeft finishDateInput={finishDate}/>);
    let initialText = '';

    cy.get('p')
      .eq(1)
      .invoke('text')
      .then((text) => {
        initialText = text;
        cy.wait(1000);
        cy.get('p')
          .eq(1)
          .invoke('text')
          .should('not.eq', initialText); // Assert text content has changed
      });
  })
})