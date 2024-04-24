import Fastify from "fastify";
import route from "./routes/";

const server = Fastify({
  logger: true,
});

server.register(route);

try {
  server.listen({ port: 3333 });
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
