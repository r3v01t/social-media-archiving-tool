export type JSONRPCError = {
  data: Record<string, string>;
  message: string;
  reason: string;
};
