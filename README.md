# Node.js Architecture
- Initially, all requests coming from the client will be lined up in the event queue.
- Then, the event loop picks up these requests from the event queue following the FIFO principle, and its job is to remove these requests from the event queue.
- When the event loop picks up a request from the event queue, it can be of two types: non-blocking (async) or blocking (sync) requests.
- If the request is non-blocking, the event loop processes it and returns the result to the user.
- If the request is blocking, it is sent to a thread pool.
- The thread pool consists of threads responsible for fulfilling these blocking requests.
- Threads (workers) are assigned to handle these blocking requests if they are available in the thread pool.
- After the worker completes its task, it returns to the thread pool and returns the result.

# Important Points
- By default, Node.js allocates only 4 threads in the thread pool.
- If more than 4 users have written blocking code, the remaining users will experience increased waiting times, potentially leading to scalability issues.
- A good practice is to follow non-blocking coding practices to avoid these issues.
- A common strategy for maximizing performance is to set the maximum number of threads in the thread pool equal to the number of CPU cores available.

## Example Setup
```javascript
const fs = require("fs");

// Comment this line after executing it
fs.writeFile("./example.txt", "hello from nodejs", (error) => { 
    console.log(error);
});
```

## Blocking
```javascript
console.log("1");

// blocking...
let content = fs.readFileSync("./example.txt", "utf-8");
console.log(content);

console.log("2");

```
### output
- 1
- hello from nodejs
- 2

## Non-blocking
```javascript
console.log("1");
  
// non-blocking..
fs.readFile("./example.txt", "utf-8", (error, result) => {
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
});

console.log("2");
```
### output
- 1
- 2
- hello from nodejs


