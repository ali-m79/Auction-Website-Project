import React from 'react'
import One_ad from './one_ad'
import { mount } from 'cypress/react'

describe('<One_ad />', () => {
  it('renders', () => {

    mount(<One_ad />)
    cy.get('button').should("have.text", "دیدن محصولات")
    cy.get('img').should("have.attr", "src", "/__cypress/src/src/images/laptop_ad.jpg")
  })
})