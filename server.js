const http = require("node:http");

const books = [
  {
    id: 1,
    name: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    id: 2,
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    id: 3,
    name: "The Silmarillion",
    author: "J.R.R. Tolkien",
  },
];

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.url === "/" && request.method === "GET") {
    response.statusCode = 200; //OK
    response.end(
      JSON.stringify({
        message: "Index page",
      })
    );
  } else if (request.url === "/about" && request.method === "GET") {
    response.statusCode = 200; //OK
    response.end(
      JSON.stringify({
        message: "About page",
      })
    );
  } else if (request.url === "/books") {
    switch (request.method) {
      case "GET":
        response.statusCode = 200; //OK
        response.end(JSON.stringify({ books }));
        break;
      case "POST":
        response.statusCode = 201; //Created
        const book = {
          id: 4,
          name: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
        };
        books.push(book);
        response.end(
          JSON.stringify({
            message: "Book created",
            book: book,
          })
        );
        break;
      default:
        response.statusCode = 405; //Method Not Allowed
        response.end(
          JSON.stringify({
            message: "Method not allowed",
          })
        );
        break;
    }
  } else {
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: "Route not found",
      })
    );
  }
});

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
