import React from 'react'
import Slide_show from './slide_show'
import {mount} from "cypress/react"

describe('<Slide_show />', () => {
  it('renders', () => {

    mount(<Slide_show />)
    cy.get(".laptop_cont").should("have.attr", "href", "/categories/laptop")
    cy.get(".phone_cont").should("have.attr", "href", "/categories/phone")
    cy.get(".console_cont").should("have.attr", "href", "/categories/console")
    cy.get(".laptop_cont > img").should("have.attr", "src", "/__cypress/src/src/images/slide_show_laptop.jpg")
    cy.get(".phone_cont > img").should("have.attr", "src", "/__cypress/src/src/images/slide_show_mobile.jpg")
    cy.get(".console_cont > img").should("have.attr", "src", "/__cypress/src/src/images/slide_show_console.jpg")
    cy.get(".console_cont").should("have.class", "active")
  })
})