/// <reference types="cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the homepage successfully", () => {
    cy.get("h1").should("contain", "Discover Developer Events");
  });

  it("should display the navbar with correct links", () => {
    cy.get("header").should("be.visible");
    cy.get("header nav").within(() => {
      cy.get('a[href="/"]').should("exist");
      cy.get('a[href="/events"]').should("exist");
      cy.get('a[href="/events/create"]').should("exist");
    });
  });

  it("should have an Explore Events button", () => {
    cy.get("#explore-btn")
      .should("be.visible")
      .and("contain", "Explore Events");
  });

  it("should scroll to events section when Explore button is clicked", () => {
    cy.get("#explore-btn").click();
    cy.url().should("include", "#events");
  });

  it("should display the upcoming events section", () => {
    cy.get("#events").should("exist");
    cy.get("h3").should("contain", "Upcoming Events");
  });

  it("should have a View All Events link", () => {
    cy.get('a[href="/events"]').should("exist");
  });
});
