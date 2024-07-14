import React from 'react'
import Sorter_drawer from './sorter_drawer'
import {mount} from "cypress/react"
describe('<Sorter_drawer />', () => {
  it('renders', () => {

    mount(<Sorter_drawer sorts_list={[
      {
        id: 1,
        title: "همه",
      },
      {
        id: 2,
        title: "ارزانترین",
      },
      {
        id: 3,
        title: "گرانترین",
      },
      {
        id: 4,
        title: "کمترین زمان باقی مانده",
      },
    ]}
      sorts={["black", "black", "black", "black"]}
      set_sorts={""}
      sort_low_price={""}
      sort_high_price={"sort_high_price"}
      sort_all={"sort_all"}
      sort_remained_time={""}/>)
      
      cy.get('#_drawer_button_1kjd8_1').click();
      cy.get('#_drawer_main_cont_1kjd8_1').should('be.visible');
    });
    
})