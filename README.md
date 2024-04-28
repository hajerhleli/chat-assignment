# Real-time Chat Integration in Doodle solution

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Overview

The goal is integrating real-time chat functionality into the existing Doodle organizer and participation frontend applications that permit users to communicate instantly. The chat will support text-based, stickers, and emoji messages and offer real-time updates without reloading the page.

## High-Level Architectural Design

1. *Frontend Integration*:
  - *Chat UI Component*:  Existing Doodle Frontends (Organizer & Participant) remains unchageable but will be extended to include the new real-time chat component.

  - *Technologies*:  React JS & Typescript


2. *Backend Services*:
  - *Chat Service*: A standalone microservice handling chat functionality, interfacing with the existing REST-based meeting service for authentication and authorization.
  - *Message Storage*: Utilizes a NoSQL database (e.g., MongoDB) for storing messages due to its flexibility and scalability.
  - *Real-Time Messaging*: WebSocket protocol for real-time bi-directional communication between clients and server.

3. *Integration with Existing Services*:
  - *Authentication Service*: Using the existing Doodle authentication service.
  - *API Gateway*: Route requests to appropriate services (existing meeting service or new chat service).


## Components Diagram
<pre>
  +---------------------+            +-------------------+
  | Organizer Frontend  |            |Participant Frontend|
  +----------+----------+            +----------+---------+
             |                                   |
             |                                   |
             +-----------+           +-----------+
                         |           |
                +--------v-----------v-----+
                |        API Gateway       |
                +------------+--------------+
                             |
               +-------------+--------------+
               |                            |
      +--------v----------+        +--------v---------+
      |  Meeting Service  |        |   Chat Service   |
      +--------+----------+        +--------+---------+
               |                            |
               |                            |
      +--------v----------+        +--------v---------+
      |   SQL Database    |        | NoSQL Database   |
      +-------------------+        +------------------+
</pre>
## Risk Assessment
  1. *Scalability*: Supporting a large number of users and meetings requires a robust Chat Service infrastructure with proper load balancing and message delivery mechanisms.

  2. *Latency*: Maintaining low latency message delivery for real-time chat is crucial and may require optimizations on the server-side and client-side.

  3. *Data integrity and loss*: Potential message loss during high load.

  3. *Security*: User authentication and message authorization need to be implemented to prevent unauthorized access and message manipulation.

## Mitigation
 1. *Scalability*: Use scalable infrastructure like Kubernetes for deploying services and a NoSQL database that scales horizontally.

  2. *Latency*: Maintaining low latency message delivery for real-time chat is crucial and may require optimizations on the server-side and client-side.

  3. *Data integrity and loss*:  Utilize message queuing (like kafka) to buffer incoming messages during spikes.


  3. *Security*:  Implement JWT based authentication for users and proper authorization checks for message access within specific meeting chat rooms. Implement end-to-end encryption for messages and use HTTPS for all communications.

## Real-time chat functionnality

1. Direct messaging
2. Message history and search
3. File and media sharing
4. Push Notifications
5. Emoji, Stickers and reactions
6. Settings message(Edit, delete)

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
