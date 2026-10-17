---
title: API reference
artwork: api
description: Endpoints, request fields, responses, authentication and validation.
weight: 50
---

Choose the service you are calling:

- **crossfire:** the server's HTTP routes under `/api`.
- **fleetd:** the controller's private HTTP API over a Unix socket, locally or through SSH.

Their catalog paths overlap because they are different services. Do not send a controller operation to the crossfire origin or expose the private socket through a public HTTP server.

Each operation page lists parameters, request and response fields, limits and
validation functions. The functions include checks that cannot be expressed by
a field table, such as dependencies between fields.

These pages are for people writing HTTP clients or agent tools. The client
constructs requests; the service produces responses. People using the chat
interface send ordinary messages, not these JSON objects. TypeScript blocks
show server validation code, not a requirement to write a JavaScript client.

Matrix forwarding, signup, setup assets and public reports use different
response formats. See [other HTTP routes](/docs/api/native-http/).
