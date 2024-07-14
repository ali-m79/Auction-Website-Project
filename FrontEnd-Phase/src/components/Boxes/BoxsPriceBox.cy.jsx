import React from 'react'
import { PriceBox } from './Boxs'
import {mount} from 'cypress/react18'

describe('<PriceBox />', () => {
  it('renders', () => {
    const testPrice={baseBid:"75,000",highestBid:"125,000"};
    mount(<PriceBox price={testPrice}/>)
  })

  it('opens and closes dialogue',()=>{
    const testPrice={baseBid:"75,000",highestBid:"125,000"};
    mount(<PriceBox price={testPrice}/>)
    cy.contains('ثبت پیشنهاد').click();
    cy.get('[role="dialog"]').should('exist'); 
    cy.get('body').click(0, 0);
    cy.get('[role="dialog"]').should('not.exist');
  })

  it('can change the input price',()=>{
    const testPrice={baseBid:"75,000",highestBid:"125,000"};
    mount(<PriceBox price={testPrice}/>)
    cy.contains('ثبت پیشنهاد').click();
    let input='';
    cy.get('[role="dialog"]').should('exist'); 
    cy.get('input').invoke('val').then((val)=>input=val);
    cy.get('button').eq(1).click();
    cy.get('p').eq(3).invoke('text').should('eq',`${input} تومان`);
  })
})