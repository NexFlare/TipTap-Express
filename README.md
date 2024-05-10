# TipTap Backend

## Overview

This document provides detailed information about the API endpoints of the Express backend. This backend supports operations related to managing questions, submitting answers by viewers, and generating AI-based MCQs.

## Prerequisites

1. **Node.js**
   - Ensure that you have Node.js `version 18` or higher installed on your system. You can check your current Node.js version by running `node -v` in your terminal.
2. **Google Generative AI API key**
   - The functionality to generate AI-based MCQs requires access to Google's generative AI services. You must obtain an API key from the Google Cloud Platform and set the env variable API_KEY. For more visit [link](https://ai.google.dev/gemini-api/docs/get-started/node)
3. **Redis**
   - Ensure you have ensure redis installed on your system and working on default port.

## Env file

```markdown
PORT=<PORT TO RUN BACKEND>
API_KEY=<YOUR GOOGLE API KEY>
```

## Features

1. **Leveraged Google Generative AI to Create MCQs**

   - This API utilizes Google's powerful generative AI to craft questions and answers dynamically based on the input content. This feature supports a wide range of subjects and topics, providing a versatile tool for educational content generation.

2. **Test-Driven Architecture**

   - Developed using a test-driven approach, the API includes comprehensive test suites that ensure reliability and robustness. The code is backed by integration tests, which is crucial for continuous integration and deployment workflows.

3. **Robust Code with Extensive Error Handling**
   - The codebase is designed to handle various edge cases and potential errors, ensuring high reliability and stability of the API. Exception handling is strategically implemented to manage unexpected behaviors or errors during API operations.

## Endpoints

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/24526830-a133e242-6f7c-4658-818a-b0ae41f939e0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24526830-a133e242-6f7c-4658-818a-b0ae41f939e0%26entityType%3Dcollection%26workspaceId%3Def719a70-365b-4a12-902e-a2b37893a19d)

## Installation

`npm install` : Install all the dependencies \
`npm start` : Start the server

## Tests

To run the test use command `npm test`
