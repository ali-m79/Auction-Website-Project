import React from 'react'
import Two_categories from './two_categories'
import { mount,  } from 'cypress/react'

describe('<Two_categories />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Two_categories />)
    cy.get(':nth-child(1) > #_second_cont_1unhr_1 > #_text_cont_1unhr_1 > a > button').should("have.text", "دیدن محصولات")
    cy.get(':nth-child(2) > #_second_cont_1unhr_1 > #_text_cont_1unhr_1 > a > button').should("have.text", "دیدن محصولات")
    cy.get(':nth-child(1) > #_second_cont_1unhr_1 > #_image_cont_1unhr_1 > img').should("have.attr", "src", "/__cypress/src/src/images/PS4_home_ad.jpg")
    cy.get(':nth-child(2) > #_second_cont_1unhr_1 > #_image_cont_1unhr_1 > img').should("have.attr", "src", "/__cypress/src/src/images/mobile_home_ad.jpg")
  })
})