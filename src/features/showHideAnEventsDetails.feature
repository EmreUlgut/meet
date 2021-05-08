Feature: SHOW/HIDE AN EVENT'S DETAILS

    Scenario: An event element is collapsed by default

        Given the user has entered in (or left empty) search constraints
        When the user loads a list of events in that search
        Then the user should see the events in collapsed form (ie; name and city only)

    Scenario: User can expand an event to see its details

        Given the user has loaded a list of upcoming events
        When the user clicks on “See More" for one event in the list
        Then the user should see all details relating to that one event in a larger window/area
    Scenario: User can collapse an event to hide its details
        Given the user has loaded a list of events/opened app
        And the user has already opened up an expanded view of an event
        When the user clicks on “See Less"
        Then the user should go back to a collapsed view of the event in the list of all events from their search