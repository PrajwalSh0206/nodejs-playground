# Streams

Streams are objects that allow you to read data from a source or write data to a destination in a continuous, efficient, and memory-friendly manner. Instead of reading or writing the entire data at once, streams process it in chunks.

## Types of Streams

1. Readable Streams
- Used to read data from a source (e.g., fs.createReadStream to read files).
- Example: HTTP requests, file reading.

2. Writable Streams

- Used to write data to a destination (e.g., fs.createWriteStream to write files).
- Example: HTTP responses, file writing.

3. Duplex Streams

- Streams that can be both readable and writable (e.g., a TCP socket).

4. Transform Streams

- Duplex streams that can modify or transform data as it is read and written (e.g., compression).