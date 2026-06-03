import { z } from "zod";

export const generalInfoSchema = z.object({
    tourType: z.any().refine(
        (val) => val !== null,
        {
            message: "Tour Type is required"
        }
    ),

    travelMode: z.any().refine(
        (val) => val !== null,
        {
            message: "Travel Mode is required"
        }
    ),

    tourCategory: z.any().refine(
        (val) => val !== null,
        {
            message: "Tour Category is required"
        }
    ),

    tourName: z.any().refine(
        (val) => val !== null,
        {
            message: "Tour Name is required"
        }
    ),

    noOfDays: z.number({
        message: "No. of Days is required"
    }),

    noOfNights: z.number({
        message: "No. of Nights is required"
    })
});