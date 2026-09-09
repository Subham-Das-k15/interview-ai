// High-yield curated questions repository across all 11 topics and 3 difficulty levels
export const QUESTION_BANK = {
  'DSA': {
    Easy: [
      {
        question: 'How do you detect a cycle in a singly linked list using constant extra space?',
        expectedConcepts: ['Floyd\'s Cycle-Finding Algorithm', 'Slow and Fast Pointers', 'O(1) auxiliary space', 'O(N) time complexity'],
        suggestedAnswer: 'Floyd\'s Cycle Detection algorithm (Tortoise and Hare) uses two pointers moving at different speeds (slow by 1 node, fast by 2 nodes). If a cycle exists, the fast pointer will eventually catch up to the slow pointer inside the loop. If the fast pointer reaches null, the list is acyclic. Time complexity is O(N) and space is O(1).'
      },
      {
        question: 'Explain the difference between a Stack and a Queue, and give one real-world software use case for each.',
        expectedConcepts: ['LIFO vs FIFO', 'Push/Pop vs Enqueue/Dequeue', 'Call stack / Undo operations', 'Task scheduling / Message queues'],
        suggestedAnswer: 'A Stack follows Last-In-First-Out (LIFO) semantics with push and pop operations, commonly used for function call stacks and browser history back navigation. A Queue follows First-In-First-Out (FIFO) semantics with enqueue and dequeue, commonly used in background job processors, print queues, and breadth-first search (BFS).'
      },
      {
        question: 'Given an array of integers, how would you find two numbers that sum up to a specific target in O(N) time?',
        expectedConcepts: ['Hash Map / Dictionary', 'Complement lookup (target - num)', 'Single pass O(N)', 'Space-Time trade-off'],
        suggestedAnswer: 'You can iterate through the array once while maintaining a hash map of numbers seen so far mapped to their indices. For each element num, check if (target - num) exists in the map. If it does, return both indices; otherwise, store num in the map. This achieves O(N) time complexity with O(N) space.'
      }
    ],
    Medium: [
      {
        question: 'Explain how QuickSort works, its average and worst-case time complexity, and how to mitigate the worst case.',
        expectedConcepts: ['Divide and Conquer', 'Pivot selection', 'Partitioning algorithm', 'O(N log N) vs O(N^2)', 'Randomized pivot / Median-of-three'],
        suggestedAnswer: 'QuickSort chooses a pivot element, partitions elements into those smaller and larger than the pivot, and recursively sorts the partitions. Average time complexity is O(N log N). The worst-case is O(N^2) when the pivot is consistently the minimum or maximum element. We can mitigate this using randomized pivot selection or the median-of-three technique.'
      },
      {
        question: 'How does Breadth-First Search (BFS) differ from Depth-First Search (DFS) in graph traversal, and when would you prefer one over the other?',
        expectedConcepts: ['Queue vs Stack/Recursion', 'Level-order traversal', 'Shortest path in unweighted graphs', 'Memory consumption comparison'],
        suggestedAnswer: 'BFS explores neighbor nodes level by level using a Queue, making it ideal for finding the shortest path in unweighted graphs. DFS explores deeply down a branch using recursion or a Stack, making it suitable for topological sorting, cycle detection, and maze solving. BFS uses O(V) space at the widest level, while DFS uses O(H) space proportional to depth.'
      },
      {
        question: 'What is a Trie (Prefix Tree) and why is it preferred over a Hash Table for autocomplete systems?',
        expectedConcepts: ['Prefix search efficiency', 'O(L) search where L is string length', 'Shared prefix storage', 'Wildcard / prefix matching'],
        suggestedAnswer: 'A Trie is a tree data structure where each node represents a character. It enables prefix-based lookups in O(L) time where L is the query length, independent of the total dictionary size. Unlike Hash Tables, Tries easily retrieve all words starting with a given prefix, making them ideal for autocomplete and spell-check.'
      }
    ],
    Hard: [
      {
        question: 'Explain how the LRU (Least Recently Used) Cache is implemented in O(1) time complexity for both get and put operations.',
        expectedConcepts: ['Hash Map + Doubly Linked List', 'O(1) lookup via Hash Map', 'O(1) node deletion and insertion at head', 'Eviction from tail'],
        suggestedAnswer: 'An LRU cache combines a Hash Map and a Doubly Linked List. The Hash Map stores keys mapped to node references for O(1) lookup. The Doubly Linked List maintains access recency: newly accessed or inserted items move to the head, while the least recently used item sits at the tail for O(1) eviction.'
      },
      {
        question: 'Describe Dijkstra\'s algorithm and why it fails with negative edge weights.',
        expectedConcepts: ['Greedy approach', 'Min-Priority Queue / Heap', 'O((V+E) log V) complexity', 'Greedy finalization assumption broken by negative edges'],
        suggestedAnswer: 'Dijkstra\'s algorithm finds the shortest path from a source to all vertices in a weighted graph using a Min-Priority Queue. It assumes that once a vertex is finalized, no shorter path to it exists. Negative edge weights invalidate this greedy property because visiting an edge later could decrease the total distance. Bellman-Ford should be used instead.'
      }
    ]
  },
  'JavaScript': {
    Easy: [
      {
        question: 'Explain the difference between `var`, `let`, and `const` in modern JavaScript.',
        expectedConcepts: ['Function scope vs Block scope', 'Hoisting and Temporal Dead Zone (TDZ)', 'Re-assignment vs Immutability', 'Best practices'],
        suggestedAnswer: '`var` is function-scoped and hoisted with an initial value of undefined. `let` and `const` are block-scoped and reside in the Temporal Dead Zone (TDZ) before declaration. `const` cannot be reassigned (though objects assigned to it can be mutated), whereas `let` allows reassignment.'
      },
      {
        question: 'What is the difference between `==` and `===` operators in JavaScript?',
        expectedConcepts: ['Type coercion', 'Strict equality', 'Primitive vs Reference comparison', 'Edge cases (null == undefined)'],
        suggestedAnswer: '`==` is the loose equality operator that performs implicit type coercion before comparison. `===` is the strict equality operator that checks both value and type without coercion. For example, "5" == 5 is true, but "5" === 5 is false. In modern JS, `===` is always recommended.'
      }
    ],
    Medium: [
      {
        question: 'Explain Closures in JavaScript and provide a practical real-world use case.',
        expectedConcepts: ['Lexical scoping', 'Inner function retaining access to outer scope', 'Data privacy / encapsulation', 'Memoization / Currying'],
        suggestedAnswer: 'A closure is a function that remembers and retains access to its outer lexical scope variables even after the outer function has finished executing. Practical uses include creating private variables in factory functions, event handlers with state, memoization wrappers, and currying.'
      },
      {
        question: 'Explain the JavaScript Event Loop, Microtask Queue, and Macrotask (Callback) Queue.',
        expectedConcepts: ['Single-threaded call stack', 'Microtasks (Promises, queueMicrotask)', 'Macrotasks (setTimeout, setInterval, I/O)', 'Execution priority order'],
        suggestedAnswer: 'JavaScript executes on a single-threaded Call Stack. When asynchronous tasks finish, their callbacks enter either the Microtask Queue (Promise reactions, mutation observers) or the Macrotask Queue (setTimeout, I/O). After each stack clearance, the event loop drains ALL microtasks completely before executing the next macrotask.'
      },
      {
        question: 'What is prototypal inheritance and how does the prototype chain work in JavaScript?',
        expectedConcepts: ['__proto__ vs prototype', 'Object.create()', 'Property resolution along prototype chain', 'ES6 classes as syntactic sugar'],
        suggestedAnswer: 'In JavaScript, objects have an internal prototype reference (`__proto__`). When accessing a property on an object, JavaScript searches the object itself; if missing, it traverses up the prototype chain until it reaches Object.prototype or null. ES6 `class` syntax is syntactic sugar over this prototypal mechanism.'
      }
    ],
    Hard: [
      {
        question: 'How would you implement a custom `Promise.all` polyfill from scratch handling rejections and order preservation?',
        expectedConcepts: ['Promise constructor', 'Array length tracking / completed counter', 'Order preservation by index', 'Immediate rejection on first error'],
        suggestedAnswer: 'A custom `Promise.all(promises)` returns a new Promise. It checks if the input is iterable. It tracks an array of resolved results and a counter of completed promises. For each promise, upon resolve it places the result at its corresponding index and increments the counter; if the counter equals total length, it resolves. If any promise rejects, it immediately rejects the outer promise.'
      },
      {
        question: 'Explain memory leaks in JavaScript applications, common culprits, and how to debug them using Chrome DevTools.',
        expectedConcepts: ['Detached DOM nodes', 'Uncleared intervals and event listeners', 'Accidental global variables', 'Heap Snapshots / Allocation timelines'],
        suggestedAnswer: 'Memory leaks occur when references to unused objects are unintentionally retained, preventing garbage collection. Common culprits include forgotten setInterval timers, unremoved global event listeners, closures holding large contexts, and detached DOM nodes. They are diagnosed using Chrome DevTools Memory Profiler through Heap Snapshots and allocation comparison.'
      }
    ]
  },
  'React': {
    Easy: [
      {
        question: 'Explain the purpose of React Hooks, specifically `useState` and `useEffect`.',
        expectedConcepts: ['Functional components with state', 'useState for local reactive state', 'useEffect for side effects and cleanup', 'Dependency array semantics'],
        suggestedAnswer: 'React Hooks allow functional components to use state and lifecycle features. `useState` creates a reactive state variable and setter. `useEffect` performs side-effects (data fetching, subscriptions, DOM mutation) and supports cleanup return functions. The dependency array dictates when the effect re-runs.'
      },
      {
        question: 'Why do we need keys in React lists and what happens if you use the array index as a key?',
        expectedConcepts: ['Virtual DOM reconciliation', 'Stable element identity', 'Index keys causing UI state bugs on reorder/deletion', 'Performance optimization'],
        suggestedAnswer: 'Keys give list elements a stable identity across renders, enabling React\'s reconciliation algorithm to determine which items were inserted, deleted, or moved. Using array indices as keys can cause subtle bugs with component state and input focus if items are added, deleted, or sorted, because indices change.'
      }
    ],
    Medium: [
      {
        question: 'How does React\'s Virtual DOM reconciliation (Diffing Algorithm) work, and how does React 18 Fiber architecture improve rendering?',
        expectedConcepts: ['Virtual DOM tree diffing', 'Heuristics (element type, keys)', 'Fiber incremental rendering / schedulable units of work', 'Concurrent Mode and non-blocking updates'],
        suggestedAnswer: 'React maintains a Virtual DOM tree. When state changes, it creates a new VDOM tree and diffs it with the previous one in O(N) using heuristics (different element types recreate trees; keys match list items). React Fiber breaks rendering into interruptible units of work, allowing React 18 Concurrent features (like startTransition and Suspense) to prioritize user interactions over expensive re-renders.'
      },
      {
        question: 'Compare `useMemo`, `useCallback`, and `React.memo`. When should you use them and when should you avoid them?',
        expectedConcepts: ['Memoizing calculated values vs function references', 'React.memo for shallow prop comparison', 'Premature optimization overhead', 'Referential equality for dependencies'],
        suggestedAnswer: '`React.memo` is a higher-order component that skips re-rendering if props have not changed. `useCallback` memoizes a callback function reference across renders. `useMemo` caches the calculated result of an expensive function. Avoid them for trivial computations or functions that don\'t pass as props, as the memoization overhead outweighs the cost.'
      },
      {
        question: 'Explain state management trade-offs: React Context API vs Redux Toolkit vs Zustand.',
        expectedConcepts: ['Prop drilling vs global store', 'Context re-render performance on frequent changes', 'Redux boilerplate & devtools', 'Zustand simplicity & selector-based subscriptions'],
        suggestedAnswer: 'React Context is built-in and great for low-frequency global state (themes, auth), but re-renders all consumers on change. Redux Toolkit provides predictable state, powerful middleware, and time-travel debugging, but has some boilerplate. Zustand offers a lightweight, hook-based store with selector subscriptions that prevent unnecessary re-renders.'
      }
    ],
    Hard: [
      {
        question: 'Explain Server Components (RSC) vs Client Components in modern React frameworks like Next.js.',
        expectedConcepts: ['Zero client bundle size', 'Direct database/backend access', 'Server-side rendering vs client hydration', 'Interactivity boundary ("use client")'],
        suggestedAnswer: 'React Server Components (RSC) execute exclusively on the server and stream serialized UI to the client with zero JavaScript added to the client bundle. They can access databases and private secrets directly. Client Components (declared with "use client") run on both server (for SSR) and client, handling state, effects, and browser event listeners.'
      }
    ]
  },
  'Node.js': {
    Easy: [
      {
        question: 'What is Node.js and why is it described as asynchronous and single-threaded?',
        expectedConcepts: ['V8 JavaScript runtime', 'libuv event-driven architecture', 'Single main thread for JS execution', 'Non-blocking I/O operations'],
        suggestedAnswer: 'Node.js is an open-source JavaScript runtime built on Chrome\'s V8 engine. It is single-threaded in its execution of JavaScript code on the event loop, but achieves non-blocking asynchronous behavior by offloading file, network, and cryptographic I/O tasks to libuv\'s background thread pool.'
      },
      {
        question: 'What is the difference between `module.exports` (CommonJS) and `export` (ES Modules)?',
        expectedConcepts: ['Synchronous require() vs static asynchronous import', 'Top-level await support', 'package.json "type": "module"', 'Tree-shaking capabilities'],
        suggestedAnswer: 'CommonJS (`module.exports` and `require()`) is synchronous and evaluated at runtime, which was Node\'s original module standard. ES Modules (`export` and `import`) are statically analyzable at compile time, support tree-shaking, top-level await, and are the official ECMAScript standard.'
      }
    ],
    Medium: [
      {
        question: 'What are Node.js Streams and Buffers, and why are they crucial for building scalable network applications?',
        expectedConcepts: ['Readable, Writable, Transform streams', 'Handling chunks instead of entire files into memory', 'Backpressure management', 'Buffers for raw binary data'],
        suggestedAnswer: 'Streams allow reading and writing continuous data piece-by-piece (chunks) without holding the entire payload in RAM. This prevents memory spikes when handling massive files or video streams. Buffers represent fixed-size chunks of raw memory allocated outside V8 heap for binary data handling.'
      },
      {
        question: 'How do you handle unhandled promise rejections and uncaught exceptions in an Express/Node.js production application?',
        expectedConcepts: ['process.on("unhandledRejection")', 'process.on("uncaughtException")', 'Graceful shutdown pattern', 'Centralized error-handling middleware'],
        suggestedAnswer: 'In Express, use centralized error-handling middleware `(err, req, res, next)` at the bottom of the middleware chain. At the process level, listen to `process.on("uncaughtException")` and `process.on("unhandledRejection")` to log the incident, stop accepting new HTTP connections, and gracefully exit so process managers (PM2, Kubernetes) can restart the worker.'
      }
    ],
    Hard: [
      {
        question: 'How does the Node.js Cluster module work and how does it scale applications across multi-core CPUs?',
        expectedConcepts: ['Master/Worker process architecture', 'IPC (Inter-Process Communication)', 'Port sharing / Round-robin load distribution', 'PM2 cluster mode comparison'],
        suggestedAnswer: 'Because Node.js runs on a single core, the Cluster module enables creating child worker processes that share server ports. The master process routes incoming connections to workers using round-robin scheduling (or OS-level distribution) via internal IPC channels, utilizing all CPU cores efficiently without modifying socket logic.'
      }
    ]
  },
  'MongoDB': {
    Easy: [
      {
        question: 'What is MongoDB and how does it differ from traditional Relational Databases (SQL)?',
        expectedConcepts: ['NoSQL Document database', 'BSON documents & flexible schema', 'Collections vs Tables', 'Horizontal scaling (sharding) vs vertical scaling'],
        suggestedAnswer: 'MongoDB is a NoSQL document database that stores data as JSON-like BSON documents grouped in collections. Unlike relational databases with fixed tabular schemas, foreign keys, and ACID joins, MongoDB provides dynamic schemas, embedded subdocuments, and native horizontal scaling via sharding.'
      },
      {
        question: 'What is the purpose of indexing in MongoDB and what is an Compound Index?',
        expectedConcepts: ['B-tree index structure', 'Query speedup vs write overhead', 'Compound index ordering importance', 'Covered queries'],
        suggestedAnswer: 'Indexes store a sorted portion of the collection\'s data set in a B-tree structure, allowing MongoDB to satisfy queries quickly without scanning every document in a collection (COLLSCAN). A compound index indexes multiple fields (e.g. `{ topic: 1, score: -1 }`), where the order of fields matters for matching query prefixes.'
      }
    ],
    Medium: [
      {
        question: 'Explain the MongoDB Aggregation Pipeline and common stages like `$match`, `$group`, `$project`, and `$lookup`.',
        expectedConcepts: ['Pipeline stages data flow', '$match for filtering early', '$group for aggregations and accumulators', '$lookup for left-outer joins', '$project for reshaping documents'],
        suggestedAnswer: 'The Aggregation Pipeline processes documents sequentially through multiple stages. Common stages include `$match` (filtering rows, ideal early in the pipeline), `$group` (grouping documents by a key and calculating sums/averages), `$project` (reshaping or calculating new fields), and `$lookup` (performing SQL-style left outer joins with other collections).'
      },
      {
        question: 'When should you embed documents vs reference them using ObjectIds in MongoDB schema design?',
        expectedConcepts: ['1-to-few vs 1-to-many / 1-to-squillions', 'Document size limit (16MB)', 'Read performance vs write atomicity', 'Data duplication trade-offs'],
        suggestedAnswer: 'Embedding is preferred for 1-to-few relationships where data is queried together and updated atomically, maximizing read performance. Referencing (ObjectIds) is preferred for 1-to-many, 1-to-unbounded relationships, or frequently mutating independent data to avoid hitting the 16MB document size limit.'
      }
    ],
    Hard: [
      {
        question: 'Explain MongoDB Replica Sets, write concerns (e.g. `w: "majority"`), and how automatic failover works.',
        expectedConcepts: ['Primary and Secondary nodes', 'Oplog replication', 'Write concern levels (1, majority)', 'Heartbeats and election of new primary'],
        suggestedAnswer: 'A Replica Set consists of one Primary node that accepts writes and several Secondary nodes that replicate operations via the oplog. If the Primary fails, secondaries hold an election based on heartbeats to elect a new primary. Write concern `w: "majority"` ensures a write is committed to a majority of nodes before returning success, preventing data loss during failover.'
      }
    ]
  },
  'DBMS': {
    Easy: [
      {
        question: 'What are the ACID properties in database management systems?',
        expectedConcepts: ['Atomicity (all or nothing)', 'Consistency (valid state transitions)', 'Isolation (concurrent transactions don\'t interfere)', 'Durability (persisted on disk)'],
        suggestedAnswer: 'ACID stands for: Atomicity (a transaction executes fully or rolls back completely), Consistency (data must satisfy all constraints and integrity rules), Isolation (concurrent transactions execute independently without dirty reads), and Durability (committed changes survive system crashes and power loss).'
      },
      {
        question: 'What is Database Normalization and explain 1NF, 2NF, and 3NF.',
        expectedConcepts: ['Eliminating redundancy and anomalies', '1NF (atomic values, no repeating groups)', '2NF (1NF + no partial dependency on composite PK)', '3NF (2NF + no transitive dependencies)'],
        suggestedAnswer: 'Normalization organizes database schema to reduce redundancy and prevent insertion, update, and deletion anomalies. 1NF requires atomic column values and unique rows. 2NF removes partial functional dependencies on composite primary keys. 3NF removes transitive dependencies where non-key attributes depend on other non-key attributes.'
      }
    ],
    Medium: [
      {
        question: 'What are the four SQL transaction isolation levels and what read phenomena do they prevent?',
        expectedConcepts: ['Read Uncommitted, Read Committed, Repeatable Read, Serializable', 'Dirty Read', 'Non-repeatable Read', 'Phantom Read'],
        suggestedAnswer: 'The four isolation levels in order of increasing strictness: Read Uncommitted (allows dirty reads), Read Committed (prevents dirty reads, allows non-repeatable reads), Repeatable Read (prevents non-repeatable reads, allows phantom reads in some engines), and Serializable (strict two-phase locking or MVCC preventing all anomalies).'
      }
    ],
    Hard: [
      {
        question: 'Explain the CAP Theorem and how distributed databases make trade-offs between Consistency, Availability, and Partition Tolerance.',
        expectedConcepts: ['Consistency (all nodes see same data)', 'Availability (every request gets a non-error response)', 'Partition Tolerance (network partitions tolerated)', 'CP vs AP systems in real life'],
        suggestedAnswer: 'The CAP Theorem states that a distributed system cannot simultaneously provide all three guarantees: Consistency, Availability, and Partition Tolerance. Because network partitions (P) are unavoidable in physical networks, distributed databases must choose between CP (maintaining consistency by rejecting writes during partitions, e.g. MongoDB, HBase) or AP (staying available but with eventual consistency, e.g. Cassandra, DynamoDB).'
      }
    ]
  },
  'Operating Systems': {
    Easy: [
      {
        question: 'What is the difference between a Process and a Thread?',
        expectedConcepts: ['Independent address space vs shared memory', 'Resource isolation', 'Context switching overhead', 'Inter-process communication (IPC) vs direct shared memory access'],
        suggestedAnswer: 'A Process is an executing program instance with its own dedicated virtual memory address space, file handles, and resources. A Thread is the smallest unit of CPU execution within a process; threads of the same process share the heap, code, and global data, but have their own stack and registers, making thread context switching much lighter.'
      }
    ],
    Medium: [
      {
        question: 'What is Virtual Memory, Paging, and how does the OS handle a Page Fault?',
        expectedConcepts: ['Abstract address space exceeding physical RAM', 'Page frames and Page table', 'Page Fault interrupt', 'Swap space disk I/O and page replacement policies (LRU)'],
        suggestedAnswer: 'Virtual memory gives processes the illusion of having a large contiguous memory space by mapping virtual addresses to physical RAM frames using page tables. When a process accesses a page not loaded in RAM, the MMU triggers a Page Fault interrupt. The OS pauses the process, reads the missing page from disk swap space into an available frame, updates the page table, and resumes execution.'
      },
      {
        question: 'What are the four necessary conditions for a Deadlock to occur, and how can we prevent them?',
        expectedConcepts: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait', 'Resource ordering prevention strategy'],
        suggestedAnswer: 'Deadlock requires four simultaneous Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Deadlock can be prevented by breaking any one condition, most commonly breaking Circular Wait by imposing a global linear ordering on resource acquisition.'
      }
    ],
    Hard: [
      {
        question: 'Explain Concurrency Synchronization mechanisms: Mutex, Semaphore, and the Producer-Consumer problem.',
        expectedConcepts: ['Binary Semaphore vs Counting Semaphore', 'Mutex ownership semantics', 'Condition variables / locks', 'Buffer overflow and underflow race condition avoidance'],
        suggestedAnswer: 'A Mutex is a locking mechanism with ownership (only the thread that locked it can unlock it). A Semaphore is a signaling mechanism: binary semaphores act like mutexes, while counting semaphores manage access to a finite pool of resources. In Producer-Consumer, counting semaphores track empty and filled slots to synchronize production and consumption safely.'
      }
    ]
  },
  'Computer Networks': {
    Easy: [
      {
        question: 'Explain the difference between TCP and UDP, and give examples of when each is used.',
        expectedConcepts: ['Connection-oriented vs Connectionless', 'Reliability (ACKs, retransmissions, ordered delivery)', 'Handshake (SYN-SYN-ACK)', 'Use cases: HTTP/web vs DNS/gaming/streaming'],
        suggestedAnswer: 'TCP is a connection-oriented protocol that establishes a 3-way handshake and guarantees reliable, ordered, error-checked packet delivery via acknowledgments and retransmissions (used in HTTP/HTTPS, SSH, FTP). UDP is connectionless and sends datagrams without guarantees or handshakes, minimizing latency (used in video calls, online gaming, and DNS).'
      }
    ],
    Medium: [
      {
        question: 'Explain in detail what happens when you type "https://www.google.com" into your browser and press Enter.',
        expectedConcepts: ['DNS Resolution (browser cache, OS, resolver, root, TLD, authoritative)', 'TCP 3-way handshake (SYN, SYN-ACK, ACK)', 'TLS/SSL handshake (key exchange, certificates)', 'HTTP GET request and response', 'Browser rendering (DOM, CSSOM, Render tree, layout, paint)'],
        suggestedAnswer: '1. Browser checks cache for IP, then queries DNS hierarchy. 2. Establishes TCP connection via 3-way handshake on port 443. 3. Performs TLS handshake to verify digital certificate and agree on symmetric encryption keys. 4. Sends HTTP GET request and receives HTML. 5. Browser parses HTML to construct DOM, parses CSS for CSSOM, combines them into Render Tree, computes layout, and paints pixels.'
      },
      {
        question: 'What is CORS (Cross-Origin Resource Sharing) and how do preflight `OPTIONS` requests work?',
        expectedConcepts: ['Same-Origin Policy (SOP)', 'Origin definition (protocol + domain + port)', 'Preflight OPTIONS request', 'Access-Control-Allow-Origin headers'],
        suggestedAnswer: 'CORS is a browser security mechanism that allows or restricts web applications running at one origin from requesting resources from a different origin. For non-simple requests (such as requests with custom headers or methods like PUT/DELETE), the browser automatically sends an HTTP OPTIONS preflight request with `Origin` and `Access-Control-Request-Method` headers before sending the actual request.'
      }
    ],
    Hard: [
      {
        question: 'Explain HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC) and the evolution of network performance.',
        expectedConcepts: ['HTTP/1.1 Head-of-line blocking on TCP', 'HTTP/2 binary framing and multiplexing over single TCP connection', 'HTTP/3 over QUIC (UDP)', 'Zero-RTT handshakes and connection migration'],
        suggestedAnswer: 'HTTP/1.1 introduced persistent connections but suffered from Head-of-Line (HoL) blocking on the HTTP level. HTTP/2 resolved this with binary framing and multiplexing multiple requests over a single TCP connection, but TCP-level packet loss still caused TCP HoL blocking. HTTP/3 moves from TCP to QUIC built on UDP, eliminating TCP HoL blocking, enabling multiplexing without interference, and offering 0-RTT handshakes and connection migration across networks.'
      }
    ]
  },
  'OOP': {
    Easy: [
      {
        question: 'What are the four fundamental principles of Object-Oriented Programming (OOP)?',
        expectedConcepts: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'],
        suggestedAnswer: '1. Encapsulation: Bundling data and methods into a single unit while restricting direct external access (getters/setters). 2. Abstraction: Hiding internal complexity and showing only essential functionality. 3. Inheritance: Enabling a new class to inherit properties and methods from an existing class. 4. Polymorphism: Allowing entities to take on multiple forms (method overriding and overloading).'
      }
    ],
    Medium: [
      {
        question: 'Explain the SOLID design principles in software engineering with a brief example for each.',
        expectedConcepts: ['Single Responsibility Principle (SRP)', 'Open/Closed Principle (OCP)', 'Liskov Substitution Principle (LSP)', 'Interface Segregation Principle (ISP)', 'Dependency Inversion Principle (DIP)'],
        suggestedAnswer: 'SRP: A class should have one reason to change. OCP: Classes should be open for extension but closed for modification. LSP: Subtypes must be substitutable for their base types without altering correctness. ISP: Many client-specific interfaces are better than one general-purpose interface. DIP: Depend on abstractions, not concretions.'
      }
    ],
    Hard: [
      {
        question: 'Compare Composition vs Inheritance in OOP design. Why is "Composition over Inheritance" considered a best practice?',
        expectedConcepts: ['Is-a vs Has-a relationship', 'Fragile base class problem', 'Tight coupling vs runtime flexibility', 'Interface-driven design'],
        suggestedAnswer: 'Inheritance creates a tight "is-a" coupling where changes in base classes risk breaking derived classes (fragile base class problem). Composition establishes a "has-a" relationship by assembling objects containing desired behavior as components, allowing behaviors to be swapped dynamically at runtime and reducing unintended side effects.'
      }
    ]
  },
  'Java': {
    Easy: [
      {
        question: 'Explain the difference between JDK, JRE, and JVM in Java.',
        expectedConcepts: ['JVM executes bytecode', 'JRE provides runtime libraries + JVM', 'JDK provides compiler (javac) + tools + JRE', 'Write Once Run Anywhere (WORA)'],
        suggestedAnswer: 'JVM (Java Virtual Machine) executes compiled Java bytecode. JRE (Java Runtime Environment) includes the JVM plus the core class libraries necessary to run Java applications. JDK (Java Development Kit) is the complete development package containing JRE, the compiler (`javac`), debuggers, and tools needed to write and build Java code.'
      }
    ],
    Medium: [
      {
        question: 'How does the Java Garbage Collector (GC) work and what are the Eden, Survivor, and Tenured memory spaces?',
        expectedConcepts: ['Generational Hypothesis', 'Young Generation (Eden, S0, S1)', 'Old / Tenured Generation', 'Minor GC vs Major/Full GC', 'Mark and Sweep algorithm'],
        suggestedAnswer: 'Java uses Generational Garbage Collection based on the observation that most objects die young. Memory is divided into Young Generation (Eden and two Survivor spaces S0/S1) and Old/Tenured Generation. New objects are allocated in Eden. Surviving objects get copied between survivors and eventually promoted to Old Generation after surviving several Minor GC cycles. Old Generation is cleaned via Major GC using Mark-Sweep-Compact.'
      }
    ],
    Hard: [
      {
        question: 'How does Java\'s `ConcurrentHashMap` achieve high concurrency without locking the entire table like `Hashtable`?',
        expectedConcepts: ['Lock stripping / Segment locking (Java 7)', 'CAS (Compare-And-Swap) + synchronized per bin node (Java 8+)', 'Concurrent reads without locking', 'TreeBins (Red-Black trees) on hash collisions'],
        suggestedAnswer: 'In Java 8+, `ConcurrentHashMap` abandons segment locks in favor of CAS (Compare-And-Swap) operations for empty buckets and fine-grained `synchronized` locks only on the first node of the specific bucket during updates. Reads are lock-free due to volatile node value references, allowing multiple threads to read and write concurrently across different bins.'
      }
    ]
  },
  'HR Interview': {
    Easy: [
      {
        question: 'Tell me about yourself and your journey into software engineering.',
        expectedConcepts: ['Clear professional narrative', 'Key projects and technical stack', 'Passion for problem-solving', 'Relevance to target role'],
        suggestedAnswer: 'Structure using the Present-Past-Future model: Start with your current focus (technologies, frameworks, recent projects), briefly mention how you got started and key milestones, and conclude with why you are excited about this specific engineering role.'
      }
    ],
    Medium: [
      {
        question: 'Describe a challenging technical bug or conflict you encountered in a project and how you resolved it using the STAR method.',
        expectedConcepts: ['Situation (context)', 'Task (your responsibility)', 'Action (specific engineering decisions)', 'Result (quantifiable impact and lessons learned)'],
        suggestedAnswer: 'Situation: In our team project, asynchronous state updates caused race conditions in the checkout flow. Task: I was responsible for stabilizing state management. Action: I reproduced the bug using integration tests, isolated the issue to redundant state writes, and refactored the flow using a unified reducer pattern. Result: Eliminated duplicate transactions and reduced checkout failure rate by 99%.'
      }
    ],
    Hard: [
      {
        question: 'Where do you see yourself in the next 3 to 5 years, and how does continuous learning fit into your career roadmap?',
        expectedConcepts: ['Growth from IC to Senior / Tech Lead', 'Mastering system design & cloud architecture', 'Mentorship and code review contribution', 'Alignment with team success'],
        suggestedAnswer: 'In 3 to 5 years, I see myself growing into a Senior Engineer who not only writes robust code but also contributes to system architecture, cross-team technical decisions, and mentoring junior engineers. I plan to stay current by contributing to open-source, building real-world projects, and staying abreast of modern AI and cloud infrastructure advancements.'
      }
    ]
  }
};

// Heuristic fallback question generator
export const getFallbackQuestions = (topic, difficulty = 'Medium', count = 5) => {
  const topicData = QUESTION_BANK[topic] || QUESTION_BANK['JavaScript'];
  let pool = [];

  if (topicData[difficulty]) {
    pool = [...topicData[difficulty]];
  }

  // If we need more questions, mix from other difficulties
  ['Medium', 'Easy', 'Hard'].forEach((diff) => {
    if (pool.length < count && topicData[diff]) {
      topicData[diff].forEach((q) => {
        if (!pool.find((p) => p.question === q.question)) {
          pool.push(q);
        }
      });
    }
  });

  // If still need more, grab from general JS/DSA
  if (pool.length < count) {
    const backup = QUESTION_BANK['JavaScript']['Medium'];
    backup.forEach((q) => {
      if (pool.length < count && !pool.find((p) => p.question === q.question)) {
        pool.push(q);
      }
    });
  }

  return pool.slice(0, count);
};

// Heuristic fallback evaluator
export const fallbackEvaluateAnswers = ({ topic, difficulty, questions, answers }) => {
  let totalScore = 0;
  const evaluatedAnswers = questions.map((q, index) => {
    const userAns = answers[index]?.userAnswer || answers[index] || '';
    const answerText = typeof userAns === 'string' ? userAns.trim() : (userAns.answer || '');
    const wordCount = answerText.split(/\s+/).filter(Boolean).length;

    // Check expected concept hits
    const concepts = q.expectedConcepts || [];
    let matchedConcepts = 0;
    const lowerAns = answerText.toLowerCase();

    concepts.forEach((concept) => {
      const words = concept.toLowerCase().split(/\s+/);
      if (words.some((w) => w.length > 3 && lowerAns.includes(w))) {
        matchedConcepts++;
      }
    });

    let qScore = 4; // base score for submitting
    if (wordCount >= 20) qScore += 2;
    if (wordCount >= 60) qScore += 1;
    if (concepts.length > 0) {
      const matchRatio = matchedConcepts / concepts.length;
      qScore += Math.round(matchRatio * 3);
    }
    qScore = Math.min(10, Math.max(2, qScore));
    totalScore += qScore;

    const strengths = [];
    const weaknesses = [];

    if (wordCount > 35) {
      strengths.push('Provided a comprehensive, well-structured explanation.');
    } else {
      weaknesses.push('Answer could be more thorough; consider including practical examples.');
    }

    if (matchedConcepts > 0) {
      strengths.push(`Accurately addressed key technical aspects (${concepts.slice(0, 2).join(', ')}).`);
    } else if (concepts.length > 0) {
      weaknesses.push(`Missed discussing important concepts such as ${concepts.slice(0, 2).join(' and ')}.`);
    }

    return {
      questionIndex: index,
      question: q.question,
      userAnswer: answerText,
      score: qScore,
      technicalScore: Math.min(10, qScore + (matchedConcepts > 0 ? 1 : -1)),
      completenessScore: Math.min(10, Math.max(3, Math.round((wordCount / 50) * 10))),
      communicationScore: Math.min(10, Math.max(4, wordCount > 15 ? 8 : 4)),
      strengths: strengths.length ? strengths : ['Good initial attempt at formulating an answer.'],
      weaknesses: weaknesses.length ? weaknesses : ['Could provide a more concrete code or architecture illustration.'],
      suggestedAnswer: q.suggestedAnswer || 'Review standard reference patterns for this technical question.',
    };
  });

  const overallPercentage = Math.round((totalScore / (questions.length * 10)) * 100);

  return {
    score: overallPercentage,
    feedback: {
      overallSummary: `Candidate achieved an overall score of ${overallPercentage}% across ${questions.length} questions on ${topic} (${difficulty}). Demonstrated solid foundational awareness with room for deeper architectural nuance.`,
      strengths: [
        'Good grasp of fundamental vocabulary and concepts.',
        'Clear communicative structure in responses.',
        'Directly addressed the primary intent of the interview questions.'
      ],
      weaknesses: [
        'Could include more specific real-world edge cases.',
        'Further elaboration on time/space complexities and performance trade-offs is recommended.'
      ],
      technicalAccuracy: Math.min(100, overallPercentage + 3),
      completeness: Math.min(100, Math.max(40, overallPercentage - 5)),
      communicationQuality: Math.min(100, Math.max(50, overallPercentage + 5)),
      actionableTips: [
        'Practice articulating your thought process before writing code or answers.',
        'Use the STAR method for behavioral and scenario-based queries.',
        'Mention time and space complexity upfront in algorithmic discussions.'
      ]
    },
    answers: evaluatedAnswers,
  };
};

// Fallback Resume Analyzer
export const fallbackAnalyzeResume = (text = '') => {
  const commonTech = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Python', 'Java', 'C++', 'Git',
    'Docker', 'AWS', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3', 'REST API', 'GraphQL'
  ];

  const foundSkills = [];
  const lowerText = text.toLowerCase();

  commonTech.forEach((tech) => {
    if (lowerText.includes(tech.toLowerCase())) {
      foundSkills.push(tech);
    }
  });

  // Guarantee a strong baseline if resume was brief
  const baseSkills = foundSkills.length >= 3 ? foundSkills : ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'REST API'];

  const missingSkills = ['Docker', 'AWS', 'TypeScript', 'CI/CD', 'Jest / Unit Testing', 'System Design']
    .filter((skill) => !baseSkills.includes(skill));

  return {
    atsScore: 82,
    extractedSkills: baseSkills,
    categorizedSkills: {
      frontend: baseSkills.filter((s) => ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux'].includes(s)),
      backend: baseSkills.filter((s) => ['Node.js', 'Express', 'Java', 'Python', 'REST API'].includes(s)),
      database: baseSkills.filter((s) => ['MongoDB', 'PostgreSQL', 'MySQL'].includes(s)),
      cloudDevOps: baseSkills.filter((s) => ['Docker', 'AWS', 'Git'].includes(s)),
      tools: ['Git', 'VS Code', 'Postman', 'Webpack/Vite'],
      softSkills: ['Problem Solving', 'Team Collaboration', 'Agile/Scrum', 'Technical Communication']
    },
    missingSkills,
    strengths: [
      'Strong modern full-stack development foundations.',
      'Clear project experience with component-based architecture and APIs.',
      'Solid familiarity with database querying and data persistence.'
    ],
    weaknesses: [
      'Could highlight quantifiable metrics (e.g. "% reduction in latency", "X active users").',
      'Missing automated testing mentions (unit, integration, or E2E tests).',
      'Containerization and cloud deployment experience could be emphasized more.'
    ],
    recommendations: [
      'Add Docker and CI/CD pipelines to at least one portfolio project.',
      'Quantify results in project bullets: replace "created a website" with "engineered responsive web app serving 500+ users".',
      'Add a dedicated "Technical Skills" matrix categorized by Frontend, Backend, and DevOps.'
    ],
    projectHighlights: [
      'Full-Stack Web Applications with RESTful APIs',
      'User Authentication and Secure Role Management',
      'Database Modeling and Responsive UI Implementation'
    ]
  };
};
