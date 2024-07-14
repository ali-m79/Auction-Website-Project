import React from 'react'
import PreviewPictures from './PreviewPictures'
import {mount} from 'cypress/react18'

describe('<PreviewPictures/>',()=>{

  it('loads an array of images',()=>{
    const pics=['a.png','b.png','c.png','d.png']
    mount(
      <PreviewPictures pics={pics}/> 
    );
    cy.get('img').eq(0).should('have.attr','src',pics[0]);
    cy.get('img').eq(1).should('have.attr','src',pics[0]);
    cy.get('img').eq(2).should('have.attr','src',pics[1]);
    cy.get('img').eq(3).should('have.attr','src',pics[2]);
    cy.get('img').eq(4).should('have.attr','src',pics[3]);

  });

  it('Changes the current picture when you click on small picture',()=>{
    const pics=['a.png','b.png','c.png','d.png']
    mount(
      <PreviewPictures pics={pics}/> 
    );
    cy.get('img[alt="item pic"]').first().click();
    cy.get('img').eq(0).should('have.attr','src',pics[0]);

  });
})