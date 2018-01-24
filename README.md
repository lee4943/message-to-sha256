# Message-to-SHA256 Microservice
## General Information
* Creates a Node.js-based dockerized web service on port 5000, served over HTTPS, with two endpoints
  * ```/messages``` takes a message (a string) as a POST and returns the SHA256 hash digest
of that message (in hexadecimal format)
  * ```/messages/<hash>``` is a GET request that returns the original message
    * A request to a
non-existent ```<hash>``` returns a 404 error
* Service will be restarted if it crashes
* Logs will be captured and rotated

## How to run
* Tested using:
  * node, version 8.9.4
  * docker, version 17.12.0-ce
  * docker-compose, version 1.18.0
* Ensure directory structure is as follows:
    ```
    message-to-sha256
    |  docker-compose.yml
    |  app/
    ```
* Perform the following:
  * ```cd message-to-sha256```
  * ```docker-compose up -d```

### How would your implementation scale if this were a high throughput service, and how could you improve that?

  Due to Node.js's single-threaded nature, normally, this microservice could easily be scaled out to help facilitate a high-throughput service by simply forking additional Node.js processes to be run in parallel to handle additional requests.  However, in this naive implementation, due to the use of a unique in-memory data store (i.e. a JavaScript object) by each process for storing message/hash pairs, this microservice will have difficulties scaling.  If deployed in a standard load-balanced environment, each Node.js process to which a request is sent has the potential to hold a unique set of message/hash pairs in memory, which could easily render the application unstable.  This scalability issue could potentially be resolved by refactoring the application to make use of an in-memory, key-value data store, such as Redis or Memcached, or to make use of a NoSQL database, such as MongoDB, as an alternative to the existing message/hash storage solution.