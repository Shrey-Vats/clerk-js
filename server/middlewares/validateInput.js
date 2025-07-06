import z from 'zod'

export const Validation = (req, res, next) => {

    const validation = z.object({
      email: z.string().email().required(),
      password: z.string().min(8, "Password must be at least 8 cherecter long").required()
    });

    const result = validation.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            error: result.error.errors[0]?.message,
            success: false
        })
    }

    next()
}