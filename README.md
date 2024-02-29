For this project, I decided to utilize the RESTful endpoint provided by the Rick & Morty API instead of GraphQL.
This decision was based on several factors that I considered during the planning phase of the project.

1. Familiarity and Ease of Use:
REST APIs follow a more familiar and widely adopted architectural style, making it easier for developers to understand and work with.
Given the relatively simple data requirements of my application, I felt that a RESTful approach would provide a straightforward and efficient solution without the added complexity of GraphQL.

2. Suitability of Data Structure:
The structure of the data provided by the Rick & Morty API aligns well with the request-response model of REST. Each endpoint corresponds to a specific resource (e.g., characters, locations, episodes), allowing me to fetch the required data with simple HTTP requests.
While GraphQL offers more flexibility in querying nested data and specifying exactly what fields to retrieve, I determined that the predefined structure of the REST API endpoints sufficiently met my project's needs.

3. Performance Considerations:
For my application's use case, where I primarily retrieve information about locations, residents, and episodes, the performance benefits of GraphQL's query optimization may not have been significant.
By using REST, I was able to leverage caching mechanisms and optimize individual API requests to minimize latency and improve overall performance.

4. Development Stack Compatibility:
Given my preference for TypeScript, Next.js, and tailwindcss for full-stack projects, I chose a technology stack that aligns well with REST API consumption.
While GraphQL can be integrated with these technologies, I opted for a simpler and more streamlined development process by sticking with REST.
In summary, my decision to use the RESTful endpoint of the Rick & Morty API was based on considerations of familiarity, data structure suitability, performance, and compatibility with my chosen development stack. 
While GraphQL offers advantages in certain scenarios, I believe that REST provided a pragmatic solution for the requirements of my project.