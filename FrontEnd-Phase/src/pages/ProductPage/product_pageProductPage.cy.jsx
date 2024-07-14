import React from 'react'
import ProductPage from './product_page'
import {mount} from 'cypress/react18'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../AuthService';

describe('<ProductPage />', () => {

  it('renders loading state initially', () => {
    mount(
      <AuthProvider>
        <Router>
          <ProductPage />
        </Router>
      </AuthProvider>  
    );
    cy.contains('Loading').should('exist');
  });

  it('fetches data and renders correctly', () => {
    cy.intercept('/ProductPageTest.json', { fixture: 'ProductPageTest.json' }).as('getData');
    mount(
      <AuthProvider>
        <Router>
          <ProductPage />
        </Router>
      </AuthProvider> 
    );
    cy.wait('@getData').then(() => {
      cy.contains('مشخصات کالا').should('exist');
      cy.contains('Loading').should('not.exist'); 
    });
  });

  it('changes tabs correctly', () => {
    cy.intercept('/ProductPageTest.json', { fixture: 'ProductPageTest.json' }).as('getData');
    mount(
      <AuthProvider>
        <Router>
          <ProductPage />
        </Router>
      </AuthProvider>  
    );
    cy.wait('@getData').then(() => {
      cy.contains('نظرات', { timeout: 10000 }).should('be.visible').click();
      cy.contains('ارسال نظر', { timeout: 10000 }).should('exist');
      cy.contains('مشخصات کالا').should('not.exist');
    });
  });

  it('opens and closes dialog', () => {
    cy.intercept('/ProductPageTest.json', { fixture: 'ProductPageTest.json' }).as('getData');
    mount(
      <AuthProvider>
        <Router>
          <ProductPage />
        </Router>
      </AuthProvider>  
  );
    cy.wait('@getData').then(() => {
      cy.contains('گزارش تخلف').click(); 
      cy.get('[role="dialog"]').should('exist'); 
      cy.get('body').click(0, 0);
      cy.get('[role="dialog"]').should('not.exist');
    });
  });
})

