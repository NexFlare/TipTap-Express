# TipTap Backend

## Overview

This document provides detailed information about the API endpoints of the Express backend. This backend supports operations related to managing questions, submitting answers by viewers, and generating AI-based MCQs.

## Prerequisites

- Node.js: Ensure that you have Node.js version 18 or higher installed on your system. You can check your current Node.js version by running `node -v` in your terminal.
- Google Generative AI API key: The functionality to generate AI-based MCQs requires access to Google's generative AI services. You must obtain an API key from the Google Cloud Platform and set the env variable API_KEY. For more visit [link](https://ai.google.dev/gemini-api/docs/get-started/node)
- Redis: Ensure you have ensure redis installed on your system and working on default port.

## Env file

```markdown
PORT=<PORT TO RUN BACKEND>
API_KEY=<YOUR GOOGLE API KEY>
```

## Endpoints

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/24526830-a133e242-6f7c-4658-818a-b0ae41f939e0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24526830-a133e242-6f7c-4658-818a-b0ae41f939e0%26entityType%3Dcollection%26workspaceId%3Def719a70-365b-4a12-902e-a2b37893a19d)

## Installation

`npm install` \
`npm start`
