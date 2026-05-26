import z from "zod";

const cutyIdSchema = z.object({
  cutyId: z.string().uuid(),
});

export default cutyIdSchema;
