import fastify from "fastify";
import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/", (req, reply) => {
  return { message: "Backend is up!" };
});

try {
  server.listen({ port: 3333 });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
