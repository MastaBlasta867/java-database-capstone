# Numbered Flow of Data and Control
1. A user interacts with the system by accessing a Thymeleaf page (such as the Admin or Doctor dashboard) or by calling a REST endpoint from a client application.

2. The request is routed to the appropriate controller—either an MVC controller for HTML views or a REST controller for JSON-based API calls.

3. The controller validates the request and forwards the operation to the service layer, which contains the application’s business logic.

4. The service layer processes the request, applies rules, and determines which database operations are required.

5. The service layer calls the appropriate repository: JPA repositories for MySQL operations or MongoDB repositories for document-based prescription data.

6. Retrieved data is mapped into Java model classes—JPA entities for relational data or MongoDB document models for flexible JSON-like structures.

7. The controller returns the final response: either passing model data to a Thymeleaf template for HTML rendering or serializing the data into JSON for REST API clients.
